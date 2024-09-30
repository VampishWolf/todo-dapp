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
    url: "https://scrollapp.com", // origin must match your domain & subdomain
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
    tokens: {
        80002: {
            address: '0xf02f35bF1C8D2c3a1e7255FD9AddC8F2182e0627',
            image: 'token_image_url' //optional
        },
    } as Tokens
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