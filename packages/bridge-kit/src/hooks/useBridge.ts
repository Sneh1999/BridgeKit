import optimismSdk, {
  SignerLike,
  SignerOrProviderLike,
  toProvider,
} from "@eth-optimism/sdk";
import { providers } from "ethers";
import { MAINNET_CHAINS } from "../lib/chains";
import {
  AxelarAssetTransfer,
  AxelarQueryAPI,
  CHAINS,
  Environment,
} from "@axelar-network/axelarjs-sdk";

type UseBridgeOpts = {
  fromChain: string;
  toChain: string;
};

type UseBridgeResult = {
  bridgeETH: (
    amount: number,
    sourceSigner: SignerLike,
    recipient?: string
  ) => Promise<string>;
  bridgeERC20: (
    token: string,
    amount: number,
    sourceSigner: SignerLike
  ) => Promise<string>;
};

export function useBridge(opts: UseBridgeOpts): UseBridgeResult {
  return {
    bridgeETH: async (
      amount: number,
      sourceSigner: SignerLike,
      recipient?: string
    ) => {
      return bridgeToken(
        opts.fromChain,
        opts.toChain,
        amount,
        recipient,
        "test_asset"
      );
    },
    bridgeERC20: async (a: string, b: number, c: SignerLike) => {
      console.log(a, b, c);
      return "";
    },
  };
}

async function bridgeToken(
  fromChain: string,
  toChain: string,
  amount: number,
  recipient: string | undefined,
  asset: string
): Promise<string> {
  if (isAnyMainnet(fromChain)) {
    // return depositETH
    if (true) {
      return bridgeNativeMainnet(fromChain, toChain, amount, recipient, asset);
    }

    return bridgeERC20Mainnet(fromChain, toChain, amount, recipient, asset);
  }

  return "";
}

async function bridgeERC20Mainnet(
  fromChain: string,
  toChain: string,
  amount: number,
  recipient: string | undefined,
  asset: string
): Promise<string> {
  const sdk = new AxelarAssetTransfer({ environment: Environment.MAINNET });
  const axelarQuery = new AxelarQueryAPI({
    environment: Environment.MAINNET,
  });

  const fee = await axelarQuery.getTransferFee(
    fromChain,
    toChain,
    "ETH",
    Number(amount)
  );

  const depositAddress = await sdk.getDepositAddress(
    fromChain,
    toChain,
    recipient,
    asset,
    {
      shouldUnwrapIntoNative: false,
    }
  );

  return depositAddress;
}

async function bridgeNativeMainnet(
  fromChainNetwork: string,
  toChainNetwork: string,
  amount: number,
  recipient: string | undefined,
  asset: string
) {
  const sdk = new AxelarAssetTransfer({ environment: Environment.MAINNET });
  const axelarQuery = new AxelarQueryAPI({
    environment: Environment.MAINNET,
  });

  const fee = await axelarQuery.getTransferFee(
    fromChainNetwork,
    toChainNetwork,
    asset,
    amount
  );

  const depositAddress = await sdk.getDepositAddress(
    fromChainNetwork,
    toChainNetwork,
    recipient,
    asset,
    {
      shouldUnwrapIntoNative: true,
    }
  );

  return depositAddress;
}

function isAnyMainnet(chain: string) {
  if (MAINNET_CHAINS.find((c) => c === chain)) {
    return true;
  }

  return false;
}
