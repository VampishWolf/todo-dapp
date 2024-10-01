// useTokenBalances.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAccount } from 'wagmi';

// Function to fetch token balances
const fetchBalances = async (userAddress: string) => {
    const result = await axios.get('/api/fetchErc20Balance', {
        params: { userAddress },
        headers: { 'Cache-Control': 'no-store' },
    });
    return { erc20Bal: result.data.erc20Bal, erc721Bal: result.data.erc721Bal };
};

const useTokenBalances = () => {
    const { address, isConnected } = useAccount();

    const queryInfo = useQuery({
        queryKey: ['tokenBalances', address],
        queryFn: () => {
            if (isConnected && address) {
                return fetchBalances(address);
            }
            return { erc20Bal: 0, erc721Bal: 0 };
        },
        enabled: isConnected && Boolean(address),
        refetchOnWindowFocus: false,
        staleTime: 5000, // Adjust stale time as needed
    });

    return {
        balances: queryInfo.data || { erc20Bal: 0, erc721Bal: 0 },
        loading: queryInfo.isLoading,
        refetch: queryInfo.refetch,
    };
};

export default useTokenBalances;
