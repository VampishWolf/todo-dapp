
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