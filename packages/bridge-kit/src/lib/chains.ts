import { CHAINS } from "@axelar-network/axelarjs-sdk";

export const EthereumMainnet = CHAINS.MAINNET.ETHEREUM;
export const EthereumGoerli = CHAINS.TESTNET.ETHEREUM;
export const OptimismMainnet = CHAINS.MAINNET.OPTIMISM;
export const OptimismGoerli = CHAINS.TESTNET.OPTIMISM;
export const BaseMainnet = CHAINS.TESTNET.BASE;
export const BaseGoerli = CHAINS.TESTNET.BASE;
export const ArbitrumMainnet = CHAINS.MAINNET.ARBITRUM;
export const ArbitrumTestnet = CHAINS.TESTNET.ARBITRUM;
export const LineaMainnet = "linea";
export const LineaTestnet = "linea";

export const MAINNET_CHAINS = [
  EthereumMainnet,
  OptimismMainnet,
  BaseMainnet,
  ArbitrumMainnet,
  LineaMainnet,
];
export const TESTNET_CHAINS = [
  EthereumGoerli,
  OptimismGoerli,
  BaseGoerli,
  ArbitrumTestnet,
  LineaTestnet,
];

export type MainnetChainName =
  | "ethereum"
  | "optimism"
  | "base"
  | "arbitrum"
  | "linea";
export type TestnetChainName =
  | "goerli"
  | "optimism-goerli"
  | "base-goerli"
  | "arbitrum-goerli"
  | "linea-goerli";

export type ChainName = MainnetChainName | TestnetChainName;
export type AssetName = "AXL" | "ETH" | "USDC" | "DAI";

export const ASSET_DENOMS: Record<
  AssetName,
  Partial<Record<ChainName, string>>
> = {
  AXL: {
    ethereum: "uaxl",
    optimism: "uaxl",
    base: "uaxl",
    arbitrum: "uaxl",
    goerli: "uaxl",
    "optimism-goerli": "uaxl",
    "base-goerli": "uaxl",
    "arbitrum-goerli": "uaxl",
    linea: "uaxl",
    "linea-goerli": "uaxl",
  },
  ETH: {
    ethereum: "eth",
    optimism: "eth",
    base: "eth",
    arbitrum: "eth",
    goerli: "eth",
    linea: "eth",
    "linea-goerli": "eth",
  },
  USDC: {
    ethereum: "uusdc",
    optimism: "uusdc",
    base: "uusdc",
    arbitrum: "uusdc",
    linea: "uusdc",
    goerli: "uausdc",
    "optimism-goerli": "uausdc",
    "base-goerli": "uausdc",
    "arbitrum-goerli": "uausdc",
    "linea-goerli": "uausdc",
  },
  DAI: {
    ethereum: "dai-wei",
    optimism: "dai-wei",
    base: "dai-wei",
    arbitrum: "dai-wei",
    linea: "dai-wei",
  },
};

export const CHAIN_NAME_TO_AXL_CHAIN_ID: Record<ChainName, string> = {
  ethereum: EthereumMainnet,
  goerli: EthereumGoerli,
  optimism: OptimismMainnet,
  "optimism-goerli": OptimismGoerli,
  base: BaseMainnet,
  "base-goerli": BaseGoerli,
  arbitrum: ArbitrumMainnet,
  "arbitrum-goerli": ArbitrumTestnet,
  linea: LineaMainnet,
  "linea-goerli": LineaTestnet,
};

export const CHAIN_NAME_TO_EVM_CHAIN_ID: Record<ChainName, number> = {
  ethereum: 1,
  goerli: 5,
  optimism: 10,
  "optimism-goerli": 420,
  base: 8453,
  "base-goerli": 84531,
  arbitrum: 42161,
  "arbitrum-goerli": 421613,
  linea: 59144,
  "linea-goerli": 59140,
};

export const CHAIN_NAME_TO_GATEWAY_ADDRESS: Record<ChainName, string> = {
  ethereum: "0x4F4495243837681061C4743b74B3eEdf548D56A5",
  goerli: "0xe432150cce91c13a887f7D836923d5597adD8E31",
  optimism: "0xe432150cce91c13a887f7D836923d5597adD8E31",
  "optimism-goerli": "0xe432150cce91c13a887f7D836923d5597adD8E31",
  base: "0xe432150cce91c13a887f7D836923d5597adD8E31",
  "base-goerli": "0xe432150cce91c13a887f7D836923d5597adD8E31",
  arbitrum: "0xe432150cce91c13a887f7D836923d5597adD8E31",
  "arbitrum-goerli": "0xe432150cce91c13a887f7D836923d5597adD8E31",
  linea: "0xe432150cce91c13a887f7D836923d5597adD8E31",
  "linea-goerli": "0xe432150cce91c13a887f7D836923d5597adD8E31",
};
