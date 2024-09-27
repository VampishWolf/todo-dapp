"use client"

import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from './ui/button';

function Header() {
    const { address, isConnected } = useAccount()
    const { open, close } = useAppKit()
    const { disconnect } = useDisconnect()

    return (
        <div className="p-5 mx-1 flex items-center justify-between text-black gap-4">
            <div className='font-extrabold text-xl'>ToDoo DApp</div>
            {/* Check if wallet is connected */}
            {isConnected
                ? <Button
                    className='text-black font-semibold outline-none'
                    onClick={() => open()}
                    variant="destructive"
                >
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                </Button>
                : <Button variant="default" onClick={() => open()}>
                    Connect Wallet
                </Button>}
        </div>
    )
}

export default Header   