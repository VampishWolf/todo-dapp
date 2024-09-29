import { publicClient } from '@/lib/viemClient';
import { NextResponse } from 'next/server';
import { formatUnits } from 'viem';
import erc20Abi from '../../../../smart-contracts/ERC20-ABI.json';
import erc721Abi from '../../../../smart-contracts/ERC721Abi.json';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userAddress = searchParams.get('userAddress');

    if (!userAddress) {
        return NextResponse.json({ error: 'User address is required' }, { status: 400 });
    }

    try {
        const erc20Balance = await publicClient.readContract({
            address: '0xf02f35bf1c8d2c3a1e7255fd9addc8f2182e0627',
            abi: erc20Abi.abi,
            functionName: 'balanceOf',
            args: [
                userAddress
            ]
        });
        // 0x41B073e1478E53A66ba6F8B90094Ae28FB9c9238
        const erc721Balance = await publicClient.readContract({
            address: '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
            abi: erc721Abi,
            functionName: 'balanceOf',
            args: [
                userAddress
            ]
        });
        console.log(erc20Balance, erc721Balance, 'balance');

        return NextResponse.json({ erc20Bal: Number(formatUnits(erc20Balance as bigint, 18)).toFixed(3) || '00', erc721Bal: String(erc721Balance) }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ errorw: 'Failed to fetch balance', error }, { status: 500 });
    }
}
