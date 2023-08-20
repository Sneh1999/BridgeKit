"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  goerli,
  base,
  baseGoerli,
  lineaTestnet,
  linea,
  optimismGoerli,
  arbitrumGoerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ReactNode } from "react";

const { chains, publicClient } = configureChains(
  [
    mainnet,
    goerli,
    optimism,
    optimismGoerli,
    arbitrum,
    arbitrumGoerli,
    base,
    baseGoerli,
    linea,
    lineaTestnet,
  ],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "BridgeKit Sample",
  projectId: "e3126d6134d23deaea7737ed6f4153c0",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};
