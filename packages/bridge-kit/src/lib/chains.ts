import { ChainData, TokenData } from "@0xsquid/sdk";

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
export type AssetName = "ARB" | "ETH" | "USDC" | "DAI";

type MinimalChainData = {
  name: string;
  chainIconURI: string;
};

export const CHAIN_DATA: Record<ChainName, MinimalChainData> = {
  ethereum: {
    name: "Ethereum",
    chainIconURI:
      "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
  },
  base: {
    name: "Base",
    chainIconURI:
      "https://raw.githubusercontent.com/axelarnetwork/axelar-satellite/main/public/assets/chains/base.logo.svg",
  },
  optimism: {
    name: "Optimism",
    chainIconURI:
      "https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png",
  },
  arbitrum: {
    name: "Arbitrum",
    chainIconURI:
      "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/chains/arbitrum.svg",
  },
  linea: {
    name: "Linea",
    chainIconURI:
      "https://raw.githubusercontent.com/axelarnetwork/axelar-satellite/main/public/assets/chains/linea.logo.svg",
  },
  goerli: {
    name: "Ethereum Goerli",
    chainIconURI:
      "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
  },
  "base-goerli": {
    name: "Base Goerli",
    chainIconURI:
      "https://raw.githubusercontent.com/axelarnetwork/axelar-satellite/main/public/assets/chains/base.logo.svg",
  },
  "optimism-goerli": {
    name: "Optimism Goerli",
    chainIconURI:
      "https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png",
  },
  "arbitrum-goerli": {
    name: "Arbitrum Goerli",
    chainIconURI:
      "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/chains/arbitrum.svg",
  },
  "linea-goerli": {
    name: "Linea Goerli",
    chainIconURI:
      "https://raw.githubusercontent.com/axelarnetwork/axelar-satellite/main/public/assets/chains/linea.logo.svg",
  },
};

export const CHAIN_TOKENS: Record<
  ChainName,
  Partial<Record<AssetName, TokenData>>
> = {
  ethereum: {
    ETH: {
      chainId: 1,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
      commonKey: "weth-wei",
    },
    USDC: {
      name: "USDCoin",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      decimals: 6,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/usdc.svg",
      coingeckoId: "usd-coin",
      commonKey: "uusdc",
    },
    DAI: {
      name: "Dai Stablecoin",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      decimals: 18,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
      coingeckoId: "dai",
      commonKey: "dai-wei",
    },
  },
  optimism: {
    ETH: {
      chainId: 10,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
    USDC: {
      chainId: 10,
      address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      logoURI:
        "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/usdc.svg",
      coingeckoId: "usd-coin",
    },
    DAI: {
      chainId: 10,
      address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
      name: "Dai Stablecoin",
      symbol: "DAI",
      decimals: 18,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
      coingeckoId: "dai",
    },
  },
  base: {
    ETH: {
      chainId: 8453,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
    USDC: {
      chainId: 8453,
      address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
      name: "USD Base Coin",
      symbol: "USDbC",
      decimals: 6,
      logoURI:
        "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/usdc.svg",
      coingeckoId: "bridged-usd-coin-base",
    },
    DAI: {
      name: "Dai Stablecoin",
      address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      symbol: "DAI",
      decimals: 18,
      chainId: 8453,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
      coingeckoId: "dai",
    },
  },
  arbitrum: {
    ETH: {
      chainId: 42161,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
    USDC: {
      chainId: 42161,
      name: "USD Coin",
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      symbol: "USDC",
      decimals: 6,
      logoURI:
        "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/usdc.svg",
      coingeckoId: "usd-coin",
    },
    ARB: {
      chainId: 42161,
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      name: "Arbitrum",
      symbol: "ARB",
      decimals: 18,
      logoURI:
        "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/chains/arbitrum.svg",
      coingeckoId: "arbitrum",
    },
    DAI: {
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      chainId: 42161,
      decimals: 18,
      logoURI:
        "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/arbitrum/assets/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1/logo.png",
      name: "DAI Stablecoin",
      symbol: "DAI",
      coingeckoId: "dai",
    },
  },
  linea: {
    ETH: {
      chainId: 59144,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
    USDC: {
      name: "USDCoin",
      address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
      symbol: "USDC",
      decimals: 6,
      chainId: 59144,
      logoURI:
        "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/usdc.svg",
      coingeckoId: "usd-coin",
    },
  },
  goerli: {
    ETH: {
      chainId: 5,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
    DAI: {
      chainId: 5,
      address: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
      name: "Dai Stablecoin",
      symbol: "DAI",
      decimals: 18,
      logoURI:
        "https://assets.coingecko.com/coins/images/9956/thumb/4943.png?1636636734",
      coingeckoId: "dai",
    },
  },
  "optimism-goerli": {
    ETH: {
      chainId: 420,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
  },
  "base-goerli": {
    ETH: {
      chainId: 84531,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
  },
  "arbitrum-goerli": {
    ETH: {
      chainId: 421613,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
  },
  "linea-goerli": {
    ETH: {
      chainId: 59140,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      coingeckoId: "ethereum",
    },
    USDC: {
      chainId: 59140,
      address: "0xf56dc6695cf1f5c364edebc7dc7077ac9b586068",
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
      coingeckoId: "usd-coin",
    },
  },
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
