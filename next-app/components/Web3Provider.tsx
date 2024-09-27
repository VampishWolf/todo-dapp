'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

const config = createConfig({
    chains: [polygonAmoy],
    transports: {
        [polygonAmoy.id]: http(),
    },
    connectors: [
        metaMask(),
        // injected()
        walletConnect({ name: "TODO DApp", projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID! })
    ],
})

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
};