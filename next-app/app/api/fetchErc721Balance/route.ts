import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userAddress = searchParams.get('userAddress');

    if (!userAddress) {
        return NextResponse.json({ error: 'User address is required' }, { status: 400 });
    }

    try {
        // Fetch NFTs for the owner using the Moralis API
        const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/${userAddress}/nft`, {
            params: {
                chain: 'polygon amoy',
                format: 'decimal',
                'token_addresses[]': '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
                media_items: false,
            },
            headers: {
                accept: 'application/json',
                'X-API-Key': process.env.MORALIS_API_KEY, // Store your API key in the environment variable
            },
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
    }
}
