"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';


const TokenBalanceDisplay: React.FC<{ userAddress: `0x${string}` }> = ({ userAddress }) => {
    const [balance, setBalance] = useState<{ erc20Bal: number; erc721Bal: number }>({
        erc20Bal: 0,
        erc721Bal: 0
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBalance = async () => {
            const result = await axios.get('/api/fetchErc20Balance', { params: { userAddress } });
            // console.debug(result.data, '1qwedeqw');
            setBalance({ erc20Bal: result.data.erc20Bal, erc721Bal: result.data.erc721Bal });
            setLoading(false);
        };
        fetchBalance();
    }, []);


    if (loading) {
        return <div>Loading balance...</div>;
    }

    // if (isError) {
    //     return <div>Error fetching balance.</div>;
    // }

    return (
        <div className='relative'>
            <div className='z-10 relative bg-white rounded-xl border-1 border-black px-3 py-1'>
                ERC20: {balance.erc20Bal}
            </div>
            <div className="absolute z-0 bg-black m-auto w-[93%] h-5 rounded-2xl -bottom-1 right-1"></div>
        </div>
    );
};

export default TokenBalanceDisplay;
