import useFetchNfts from '@/hooks/useFetchNfts'; // Import your custom hook
import useTokenBalances from '@/hooks/useTokenBalances';
import erc721Abi from "@/smart-contracts/ERC721Abi.json";
import { ListTodo, Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

function NftsCard({ item, index, fetchNfts }: { item: number; index: number; fetchNfts: () => void; }) {
    const { data: hash, isPending, writeContract } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: hash });
    const { balances, loading, refetch } = useTokenBalances();

    useEffect(() => {
        if (isConfirmed) {
            let timeoutId: NodeJS.Timeout;

            timeoutId = setTimeout(async () => {
                // Fetch Balances after Burn
                await refetch(); // Wait for fetchBalances to complete

                // Fetch NFTs after Burn
                fetchNfts();

                toast("NFT Burned!", {
                    description: "You just earned some tokens!",
                });
            }, 2500)

            // Cleanup function to clear timeout on unmount
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isConfirmed, refetch]);

    // Log balances for debugging
    useEffect(() => {
        console.log('Token Balances:', balances);
    }, [balances]);


    const handleBurn = async (id: number) => {
        try {
            writeContract({
                abi: erc721Abi,
                address: '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
                functionName: 'burn',
                args: [id]
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='relative' key={index}>
                <div className='z-10 relative w-[230px] h-[60px] bg-white rounded-xl border-1 border-black flex items-center justify-between p-3' key={index}>
                    <p>Nft Id: {item}</p>
                    <Button variant="default" className="flex justify-between rounded-xl gap-3" onClick={() => handleBurn(item)} disabled={isPending || hash && isConfirming && !isConfirmed}>
                        <span>{(isPending || hash && isConfirming && !isConfirmed) ? 'Burning...' : 'Burn'}</span>
                        <Trash2Icon height={14} width={14} />
                    </Button>
                </div>
                <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>
            </div>
        </>
    );
}

function NftsList({ mintConfirmed }: { mintConfirmed: boolean; }) {
    const { balance, loading, fetchNfts } = useFetchNfts(); // Use the custom hook

    // Fetch NFTs when mintConfirmed is true with a timeout
    useEffect(() => {
        let timeoutId: NodeJS.Timeout; // Type for Node.js timeout ID

        if (mintConfirmed) {
            timeoutId = setTimeout(() => {
                fetchNfts();
            }, 2500)
        }

        // Cleanup function to clear timeout on unmount
        return () => {
            clearTimeout(timeoutId);
        };
    }, [mintConfirmed])

    return (
        <>
            <div className="flex gap-2 items-center border-b-1 border-slate-500 mt-8 mb-5 pb-4">
                <ListTodo height={22} width={22} />
                <h3 className="font-bold text-2xl">NFTs Minted ({balance.totalCount})</h3>
            </div>
            {loading ? (
                <div className='flex gap-4'>
                    {[1, 2, 3, 4].map((item) => <Skeleton key={item} className='w-[230px] h-[60px]' />)}
                </div>
            ) : (
                <div className='flex gap-4 flex-wrap'>
                    {balance?.tokenIds.map((item, index) =>
                        <NftsCard key={index} item={item} index={index} fetchNfts={fetchNfts} />
                    )}
                </div>
            )}
        </>
    );
}

export default NftsList;
