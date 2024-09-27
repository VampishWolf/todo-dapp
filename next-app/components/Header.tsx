"use client"

import { useAccount } from 'wagmi';

function Header() {
    const { address, isConnected } = useAccount()

    return (
        <div className="p-2 flex items-center justify-end text-black gap-4">
            {/* *TO DO - Custom Wallet connection without external providers.  */}
            {/* {isConnected ? (<p>{address}</p>) : null} */}
            {/* <WalletDialog /> */}
            {isConnected ? <w3m-button /> : <w3m-account-button />}
            {/* <w3m-network-button /> */}
        </div>
    )
}

export default Header   