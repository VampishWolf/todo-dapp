"use client"

import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import TokenBalanceDisplay from './TokenBalanceDisplay';
import { Button } from './ui/button';

function Header() {
    const { address, isConnected, isConnecting } = useAccount()
    const { open, close } = useAppKit()


    return (
        <div className="p-5 mx-1 flex items-center justify-between text-black gap-4 font-geistSans">
            <p className='font-extrabold text-5xl font-sylvia pl-1'>ToDoos</p>
            {/* Check if wallet is connected */}
            {isConnecting && <Button
                className='font-semibold outline-none text-white'
                variant="default"
            >
                Connecting...
            </Button>}
            {isConnected && address
                ? (
                    <div className='flex gap-3 items-center'>
                        <TokenBalanceDisplay userAddress={address} />
                        <Button
                            className='text-black font-semibold outline-none'
                            onClick={() => open()}
                            variant="destructive"
                        >
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </Button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Header   