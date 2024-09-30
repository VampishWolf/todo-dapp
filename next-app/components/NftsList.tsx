import axios from 'axios';
import { ListTodo } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import erc721Abi from "../../smart-contracts/ERC721Abi.json";
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

function NftsList() {
    const { address, isConnected, isConnecting } = useAccount()
    const [balance, setBalance] = useState<{ totalCount: number; tokenIds: number[] }>({
        totalCount: 0,
        tokenIds: []
    });
    const [loading, setLoading] = useState<boolean>(true);
    const { writeContract } = useWriteContract();

    useEffect(() => {
        if (isConnected) {
            const fetchNfts = async () => {
                const response = await axios.get('/api/fetchErc721Balance', { params: { userAddress: address } });
                setBalance({ totalCount: response.data.result.length, tokenIds: response.data.result.map((item: any) => parseInt(item.token_id, 10)) });
                setLoading(false);
            }
            fetchNfts();
        }
    }, [address])

    const burnNft = async (id: number) => {

        try {
            const tx = writeContract({
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
            <div className="flex gap-2 items-center border-b-1 border-slate-500 mt-8 mb-5 pb-4">
                <ListTodo height={22} width={22} />
                <h3 className="font-bold text-2xl">NFTs Minted ({balance.totalCount})</h3>
            </div>
            {loading ? <div className='flex gap-4'>
                {[1, 2, 3].map((item) => <Skeleton key={item} className='w-[200px] h-[60px]' />)}
            </div> :
                <div className='flex gap-4'>
                    {balance?.tokenIds.map((item, index) =>
                        <div className='relative'>
                            <div className='z-10 relative w-[200px] h-[60px] bg-white rounded-xl border-1 border-black flex items-center justify-between p-3' key={index}>
                                <p>Nft Ids: {item}</p>
                                <Button variant="default" className="rounded-xl" onClick={() => burnNft(item)}>Burn</Button>
                            </div>
                            <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default NftsList