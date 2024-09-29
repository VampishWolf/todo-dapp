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
            const result = await axios.get('/api/fetchBalance', { params: { userAddress } });
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
        <div className='flex gap-3'>
            <p>ERC20: {balance.erc20Bal}</p>
            <p>ERC721: {balance.erc721Bal}</p>
        </div>
    );
};

export default TokenBalanceDisplay;
