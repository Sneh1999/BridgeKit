import * as React from "react";
import { type WalletClient, useWalletClient } from "wagmi";
import { ethers, providers } from "ethers";

export function walletClientToSigner(
  walletClient: WalletClient
): ethers.Signer {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer as ethers.Signer;
}
