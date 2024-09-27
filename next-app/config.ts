

import { createConfig, http } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}

export const config = createConfig({
    chains: [polygonAmoy],
    transports: {
        [polygonAmoy.id]: http(),
    },
})