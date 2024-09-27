"use client"

import { useAccount } from 'wagmi';
import { WalletDialog } from './WalletDialog';

function Header() {
    const { address, isConnected } = useAccount()

    return (
        <div className="p-2 flex items-center justify-end text-black gap-4">
            {isConnected ? (<p>{address}</p>) : null}
            {/* *TO DO - Custom Wallet connection without external providers.  */}
            <WalletDialog />
            {/* <ConnectKitButton /> */}
        </div>
    )
}

export default Header   