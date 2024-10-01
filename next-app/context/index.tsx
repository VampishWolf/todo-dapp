'use client'

import { projectId, wagmiAdapter } from '@/config'
import { polygonAmoy } from '@/lib/amoyNetwork'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

type Tokens = {
    [key: string]: {
        address: string;
        image: string;
    };
};

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
    name: "ToDoo DAoo",
    description: "A place for all your ToDoos",
    url: "http://localhost:3000/", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"]
}

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [polygonAmoy],
    defaultNetwork: polygonAmoy,
    metadata: metadata,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
    themeMode: 'dark',
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider