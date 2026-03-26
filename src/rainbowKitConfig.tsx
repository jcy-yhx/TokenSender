"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, sepolia, zksync, mainnet, arbitrum, optimism, base } from "wagmi/chains";

export default getDefaultConfig({
  appName: "Tsender",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [mainnet, arbitrum, optimism, base, zksync, sepolia, anvil],
  ssr: false,
});