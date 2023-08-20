import {
  AxelarAssetTransfer,
  AxelarQueryAPI,
  Environment,
} from "@axelar-network/axelarjs-sdk";
import { PublicClient, WalletClient, getContract, isAddress } from "viem";
import { erc20ABI, usePublicClient, useWalletClient } from "wagmi";
import {
  ASSET_DENOMS,
  AssetName,
  CHAIN_NAME_TO_AXL_CHAIN_ID,
  CHAIN_NAME_TO_EVM_CHAIN_ID,
  CHAIN_NAME_TO_GATEWAY_ADDRESS,
  ChainName,
  MAINNET_CHAINS,
  TESTNET_CHAINS,
} from "../lib/chains";
import { AXELAR_GATEWAY_ABI } from "../lib/gatewayAbi";
import {
  SendTokenStatus,
  getCrossChainTxnStatus,
} from "../lib/getCrossChainTxnStatus";

type UseBridgeOpts = {
  fromChain: ChainName;
  toChain: ChainName;
  amount: bigint;
  recipient?: string;
  asset: AssetName;
};

type UseBridgeResult = {
  bridgeToken: () => Promise<string>;
  getTransactionStatus: (
    txHash: string,
    network: "testnet" | "mainnet"
  ) => Promise<SendTokenStatus>;
};

export function useBridge(opts: UseBridgeOpts): UseBridgeResult {
  const { data: walletClient } = useWalletClient();
  const { data: publicClient } = usePublicClient({
    chainId: CHAIN_NAME_TO_EVM_CHAIN_ID[opts.fromChain],
  });

  const isMainnet = isAnyMainnet(opts.fromChain) && isAnyMainnet(opts.toChain);
  const assetTransferSDK = new AxelarAssetTransfer({
    environment: isMainnet ? Environment.MAINNET : Environment.TESTNET,
  });

  const querySDK = new AxelarQueryAPI({
    environment: isMainnet ? Environment.MAINNET : Environment.TESTNET,
  });

  return {
    bridgeToken: async () => {
      return bridgeToken(
        opts.fromChain,
        opts.toChain,
        opts.amount,
        opts.recipient,
        opts.asset,
        walletClient,
        publicClient,
        assetTransferSDK,
        querySDK
      );
    },

    getTransactionStatus: async (
      txHash: string,
      network: "testnet" | "mainnet"
    ) => {
      return getCrossChainTxnStatus(txHash, network);
    },
  };
}

async function bridgeToken(
  fromChain: ChainName,
  toChain: ChainName,
  amount: bigint,
  recipient: string | undefined,
  asset: AssetName,
  walletClient: WalletClient,
  publicClient: PublicClient,
  assetTransferSdk: AxelarAssetTransfer,
  querySdk: AxelarQueryAPI
): Promise<string> {
  if (
    (isAnyMainnet(fromChain) && isAnyTestnet(toChain)) ||
    (isAnyMainnet(toChain) && isAnyTestnet(fromChain))
  ) {
    throw new Error("Transfer not supported");
  }

  const axlFromChain = CHAIN_NAME_TO_AXL_CHAIN_ID[fromChain];
  const axlToChain = CHAIN_NAME_TO_AXL_CHAIN_ID[toChain];

  if (recipient && !isAddress(recipient)) {
    throw new Error("Invalid recipient address");
  }

  const [address] = await walletClient.getAddresses();

  const assetDenomFrom = ASSET_DENOMS[asset][fromChain];
  const assetDenomTo = ASSET_DENOMS[asset][toChain];

  if (!assetDenomFrom || !assetDenomTo) {
    throw new Error(
      `Asset ${asset} not supported on ${fromChain} or ${toChain}`
    );
  }

  const fees = await querySdk.getTransferFee(
    axlFromChain,
    axlToChain,
    assetDenomFrom,
    Number(amount.toString())
  );
  const totalAmount = amount + BigInt(fees.fee.amount);

  if (isNativeTokenTransfer(asset, fromChain)) {
    const depositAddress =
      await assetTransferSdk.getDepositAddressForNativeWrap(
        axlFromChain,
        axlToChain,
        recipient ?? address
      );

    if (!depositAddress) throw new Error(`Could not get deposit address`);

    const hash = await walletClient.sendTransaction({
      account: address,
      to: depositAddress,
      value: totalAmount,
      chain: null,
    });

    return hash;
  } else {
    const tokenSymbolForDenom = await querySdk.getSymbolFromDenom(
      assetDenomFrom,
      axlFromChain.toLowerCase()
    );

    if (!tokenSymbolForDenom)
      throw new Error(`Could not get token symbol for denom ${assetDenomFrom}`);

    const depositAddress =
      await assetTransferSdk.getOfflineDepositAddressForERC20Transfer(
        axlFromChain,
        axlToChain,
        recipient ?? address,
        "evm",
        tokenSymbolForDenom
      );

    if (!depositAddress) throw new Error(`Could not get deposit address`);

    const gatewayContract = getContract({
      address: CHAIN_NAME_TO_GATEWAY_ADDRESS[fromChain],
      abi: AXELAR_GATEWAY_ABI,
      publicClient,
    });

    const erc20TokenAddress = await gatewayContract.read.tokenAddresses([
      assetDenomFrom,
    ]);

    if (!erc20TokenAddress)
      throw new Error(`Could not get erc20 token address`);
    if (!isAddress(erc20TokenAddress as string))
      throw new Error(`Invalid erc20 address`);

    const erc20Contract = getContract({
      address: erc20TokenAddress,
      abi: erc20ABI,
      walletClient,
    });

    const hash = await erc20Contract.write.transfer([
      depositAddress,
      totalAmount.toString(),
    ]);

    return hash;
  }
}

function isAnyMainnet(chain: ChainName) {
  if (chain.includes("goerli")) return false;
  return true;
}

function isAnyTestnet(chain: ChainName) {
  if (chain.includes("goerli")) return true;
  return false;
}

function isNativeTokenTransfer(assetName: AssetName, fromChain: ChainName) {
  if (assetName !== "ETH") return false;

  const chainsWithNativeEth = [
    "ethereum",
    "optimism",
    "base",
    "arbitrum",
    "linea",
    "goerli",
    "optimism-goerli",
    "base-goerli",
    "arbitrum-goerli",
    "linea-goerli",
  ];
  if (chainsWithNativeEth.includes(fromChain)) return true;

  return false;
}
