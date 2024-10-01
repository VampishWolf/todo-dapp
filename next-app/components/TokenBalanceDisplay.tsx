"use client";

import React from 'react';
import useTokenBalances from '../hooks/useTokenBalances'; // Adjust the path accordingly
import { Skeleton } from './ui/skeleton';

const TokenBalanceDisplay: React.FC<{ userAddress: `0x${string}` }> = ({ userAddress }) => {
    const { balances, loading } = useTokenBalances();

    return (
        <div className='relative'>
            {loading ? (
                <Skeleton className='h-9 w-32 relative rounded-lg ' />
            ) : (
                <>
                    <div className='z-10 relative bg-white rounded-xl border-1 border-black px-3 py-1'>
                        Balance: {balances?.erc20Bal}
                    </div>
                    <div className="absolute z-0 bg-black m-auto w-[93%] h-5 rounded-2xl -bottom-1 right-1"></div>
                </>
            )}
        </div>
    );
};

export default TokenBalanceDisplay;
