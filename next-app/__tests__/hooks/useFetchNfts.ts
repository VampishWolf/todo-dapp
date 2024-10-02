import useFetchNfts from '@/hooks/useFetchNfts';
import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useAccount } from 'wagmi';

// Mock axios and useAccount
jest.mock('axios');
jest.mock('wagmi', () => ({
    useAccount: jest.fn(),
}));

describe('useFetchNfts hook', () => {
    let mockUseAccount: any;

    beforeEach(() => {
        mockUseAccount = {
            address: '0x123',
            isConnected: true,
        };
        (useAccount as jest.Mock).mockReturnValue(mockUseAccount);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useFetchNfts());

        expect(result.current.balance).toEqual({ totalCount: 0, tokenIds: [] });
        expect(result.current.loading).toBe(true);
    });

    it('should call fetchNfts and update balance with NFTs', async () => {
        const mockedNFTs = {
            data: {
                result: [
                    { token_id: '1' },
                    { token_id: '2' },
                    { token_id: '3' }
                ],
            },
        };
        (axios.get as jest.Mock).mockResolvedValueOnce(mockedNFTs);

        const { result, waitForNextUpdate } = renderHook(() => useFetchNfts());

        // Trigger the effect by simulating that the user is connected
        act(() => {
            result.current.fetchNfts();
        });

        // Wait for the state update after the fetch
        await waitForNextUpdate();

        expect(axios.get).toHaveBeenCalledWith('/api/fetchErc721Balance', {
            params: { userAddress: mockUseAccount.address },
            headers: { 'Cache-Control': 'no-store' },
        });

        expect(result.current.balance).toEqual({
            totalCount: 3,
            tokenIds: [1, 2, 3],
        });
        expect(result.current.loading).toBe(false);
    });

    it('should handle errors when fetching NFTs', async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        const { result, waitForNextUpdate } = renderHook(() => useFetchNfts());

        act(() => {
            result.current.fetchNfts();
        });

        await waitForNextUpdate();

        expect(result.current.balance).toEqual({ totalCount: 0, tokenIds: [] });
        expect(result.current.loading).toBe(false);
        expect(axios.get).toHaveBeenCalledWith('/api/fetchErc721Balance', {
            params: { userAddress: mockUseAccount.address },
            headers: { 'Cache-Control': 'no-store' },
        });
    });

    it('should not fetch NFTs if no address is provided', async () => {
        (useAccount as jest.Mock).mockReturnValue({ address: null, isConnected: false });

        const { result } = renderHook(() => useFetchNfts());

        act(() => {
            result.current.fetchNfts();
        });

        expect(axios.get).not.toHaveBeenCalled();
        expect(result.current.balance).toEqual({ totalCount: 0, tokenIds: [] });
    });
});
