import axios from 'axios';
import { ListTodo, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import erc721Abi from "../../smart-contracts/ERC721Abi.json";
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

function NftsCard({ item, index, refreshList }: { item: number, index: number, refreshList: () => void }) {
    const { data: hash, isPending, writeContract } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash: hash,
        })

    useEffect(() => {
        if (isConfirmed) {
            refreshList()
            toast("NFT Burned!", {
                description: "You just earned some tokens!",
            })
        }
    }, [isConfirming, isConfirmed])

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
            </div></>
    )
}

function NftsList({ mintConfirmed }: { mintConfirmed: boolean }) {
    const { address, isConnected } = useAccount()
    const [balance, setBalance] = useState<{ totalCount: number; tokenIds: number[] }>({
        totalCount: 0,
        tokenIds: []
    });
    const [loading, setLoading] = useState<boolean>(true);


    const fetchNfts = async () => {
        console.log('called fetchNfts')
        const response = await axios.get('/api/fetchErc721Balance', { params: { userAddress: address }, headers: { 'Cache-Control': 'no-store' } });
        setBalance({ totalCount: response.data.result.length, tokenIds: response.data.result.map((item: any) => parseInt(item.token_id, 10)) });
        setLoading(false);
    }

    useEffect(() => {
        if (isConnected) {
            fetchNfts();
        }
    }, [address])

    // Refetch NFTs when isConfirmed is true
    useEffect(() => {
        console.log(mintConfirmed, 'mintConfirmed')
        if (mintConfirmed) {
            fetchNfts()
        }
    }, [mintConfirmed]);

    return (
        <>
            <div className="flex gap-2 items-center border-b-1 border-slate-500 mt-8 mb-5 pb-4">
                <ListTodo height={22} width={22} />
                <h3 className="font-bold text-2xl">NFTs Minted ({balance.totalCount})</h3>
            </div>
            {loading ? <div className='flex gap-4'>
                {[1, 2, 3].map((item) => <Skeleton key={item} className='w-[230px] h-[60px]' />)}
            </div> :
                <div className='flex gap-4 flex-wrap'>
                    {balance?.tokenIds.map((item, index) =>
                        <NftsCard key={index} item={item} index={index} refreshList={fetchNfts} />
                    )}
                </div>
            }
        </>
    )
}

export default NftsList