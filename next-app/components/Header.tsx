"use client"

import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from './ui/button';

function Header() {
    const { address, isConnected } = useAccount()
    const { open, close } = useAppKit()
    const { disconnect } = useDisconnect()

    return (
        <div className="p-2 flex items-center justify-end text-black gap-4">
            {/* *TO DO - Custom Wallet connection without external providers.  */}
            {/* {isConnected ? (<p>{address}</p>) : <Button variant="default" onClick={() => open()}>Connect Wallet</Button>} */}
            {isConnected
                ? <Button onClick={() => disconnect()} variant="destructive">Disconnect</Button>
                : <Button variant="default" onClick={() => open()}>Connect Wallet</Button>}
            {/* <WalletDialog /> */}
            {/* {isConnected ? <w3m-button /> : <w3m-account-button />} */}
            {/* <w3m-network-button /> */}
        </div>
    )
}

export default Header   