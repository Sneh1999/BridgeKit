import { CHAINS } from "@axelar-network/axelarjs-sdk";
import { providers } from "ethers";

export const EthereumMainnet = CHAINS.MAINNET.ETHEREUM;

export const EthereumGoerli = CHAINS.TESTNET.ETHEREUM;

export const OptimismMainnet = CHAINS.MAINNET.OPTIMISM;

export const OptimismGoerli = CHAINS.TESTNET.OPTIMISM;

export const BaseMainnet = "base";

export const BaseGoerli = "base";

export const MAINNET_CHAINS = [EthereumMainnet, OptimismMainnet, BaseMainnet];
export const TESTNET_CHAINS = [EthereumGoerli, OptimismGoerli, BaseGoerli];
