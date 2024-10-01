import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const useFetchNfts = () => {
    const { address, isConnected } = useAccount();
    const [balance, setBalance] = useState<{ totalCount: number; tokenIds: number[] }>({
        totalCount: 0,
        tokenIds: []
    });
    const [loading, setLoading] = useState<boolean>(true);

    const fetchNfts = async () => {
        if (!address) return;

        // console.log('called fetchNfts');
        try {
            const response = await axios.get('/api/fetchErc721Balance', {
                params: { userAddress: address },
                headers: { 'Cache-Control': 'no-store' }
            });
            setBalance({
                totalCount: response.data.result.length,
                tokenIds: response.data.result.map((item: any) => parseInt(item.token_id, 10))
            });
        } catch (error) {
            console.error('Error fetching NFTs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isConnected) {
            fetchNfts();
        }
    }, [address, isConnected]);

    return { balance, loading, fetchNfts };
};

export default useFetchNfts;
