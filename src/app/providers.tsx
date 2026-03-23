"use client";
import { type ReactNode } from "react";
import config from "@/rainbowKitConfig"
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";

export default function Providers(props: { children: ReactNode}) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children} 
                    <Toaster position="top-right" />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}