import { RouteData, Squid, StatusResponse } from "@0xsquid/sdk";
import { useMemo } from "react";
import { WalletClient, isAddress } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import {
  AssetName,
  CHAIN_NAME_TO_EVM_CHAIN_ID,
  CHAIN_TOKENS,
  ChainName,
} from "../lib/chains";
import { walletClientToSigner } from "./useEthersSigner";
import {
  SQUID_INTEGRATOR_ID,
  SQUID_MAINNET_BASE_URL,
  SQUID_TESTNET_BASE_URL,
} from "./constants";

type UseBridgeOpts = {
  fromChain: ChainName;
  toChain: ChainName;
  fromAsset: AssetName;
  toAsset: AssetName;
  fromAmount: bigint;
  recipient?: string;
};

type UseBridgeResult = {
  bridgeToken: () => Promise<BridgeResponse>;
  getRoute: () => Promise<RouteData>;
  getTransactionStatus: (
    txHash: string,
    requestId: string
  ) => Promise<StatusResponse>;
};

type BridgeResponse = {
  txHash: string;
  requestId: string | undefined;
};

export function useBridge(opts: UseBridgeOpts): UseBridgeResult {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const isMainnet = isAnyMainnet(opts.fromChain) && isAnyMainnet(opts.toChain);

  const squid = useMemo(() => {
    return new Squid({
      baseUrl: isMainnet ? SQUID_MAINNET_BASE_URL : SQUID_TESTNET_BASE_URL,
      integratorId: SQUID_INTEGRATOR_ID,
    });
  }, [isMainnet]);

  return {
    bridgeToken: async () => {
      return bridgeToken(
        opts.fromChain,
        opts.toChain,
        opts.fromAsset,
        opts.toAsset,
        opts.fromAmount,
        opts.recipient,
        address,
        walletClient,
        squid
      );
    },

    getRoute: async () => {
      if (!squid.initialized) {
        await squid.init();
      }

      const squidParams = await getSquidParams(
        opts.fromChain,
        opts.toChain,
        opts.fromAsset,
        opts.toAsset,
        opts.fromAmount,
        opts.recipient,
        address
      );

      const { route } = await squid.getRoute({
        ...squidParams,
        quoteOnly: true,
      });

      return route;
    },

    getTransactionStatus: async (txHash: string, requestId: string) => {
      if (!squid.initialized) {
        await squid.init();
      }

      return squid.getStatus({
        transactionId: txHash,
        requestId,
        integratorId: SQUID_INTEGRATOR_ID,
      });
    },
  };
}

async function bridgeToken(
  fromChain: ChainName,
  toChain: ChainName,
  fromAsset: AssetName,
  toAsset: AssetName,
  fromAmount: bigint,
  recipient: string | undefined,
  address: string,
  walletClient: WalletClient,
  squid: Squid
): Promise<BridgeResponse> {
  if (!squid.initialized) {
    await squid.init();
  }

  const squidParams = await getSquidParams(
    fromChain,
    toChain,
    fromAsset,
    toAsset,
    fromAmount,
    recipient,
    address
  );
  const { route, requestId, integratorId } = await squid.getRoute(squidParams);

  const signer = walletClientToSigner(walletClient);
  const txn = await squid.executeRoute({
    signer,
    route,
  });
  await txn.wait();
  return {
    txHash: txn.hash,
    requestId,
  };
}

function isAnyMainnet(chain: ChainName) {
  if (chain.includes("goerli")) return false;
  return true;
}

function isAnyTestnet(chain: ChainName) {
  if (chain.includes("goerli")) return true;
  return false;
}

async function getSquidParams(
  fromChain: ChainName,
  toChain: ChainName,
  fromAsset: AssetName,
  toAsset: AssetName,
  fromAmount: bigint,
  recipient: string | undefined,
  address: string
) {
  if (
    (isAnyMainnet(fromChain) && isAnyTestnet(toChain)) ||
    (isAnyMainnet(toChain) && isAnyTestnet(fromChain))
  ) {
    throw new Error("Cannot bridge between mainnet and testnet");
  }

  if (recipient && !isAddress(recipient)) {
    throw new Error("Invalid recipient address");
  }

  const assetFromData = CHAIN_TOKENS[fromChain][fromAsset];
  const assetToData = CHAIN_TOKENS[toChain][toAsset];

  if (!assetFromData)
    throw new Error(`Asset ${fromAsset} not supported from ${fromChain}`);

  if (!assetToData)
    throw new Error(`Asset ${toAsset} not supported from ${toChain}`);

  const squidParams = {
    fromChain: CHAIN_NAME_TO_EVM_CHAIN_ID[fromChain],
    fromToken: assetFromData.address,
    toChain: CHAIN_NAME_TO_EVM_CHAIN_ID[toChain],
    toToken: assetToData.address,
    fromAmount: fromAmount.toString(),
    toAddress: recipient ?? address,
    slippage: 1.0,
    enableForecall: true,
  };

  return squidParams;
}
