
import { createPublicClient, http } from 'viem';
import { polygonAmoy } from 'viem/chains';


declare global {
    interface Window {
        ethereum: any;
    }
}

export const publicClient = createPublicClient({
    chain: polygonAmoy,
    transport: http()
})

// export const walletClient = createWalletClient({
//     chain: polygonAmoy,
//     transport: custom(window.ethereum)
// })

// // JSON-RPC Account
// export const [account] = await walletClient.getAddresses()