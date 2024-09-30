type CaipNetworkId = `${ChainNamespace}:${ChainId}`;
type ChainId = string | number;
type ChainNamespace = 'eip155' | 'solana' | 'polkadot';
type CaipNetwork = {
    id: CaipNetworkId;
    chainId: ChainId;
    chainNamespace: ChainNamespace;
    name: string;
    currency: string;
    explorerUrl: string;
    rpcUrl: string;
    imageUrl?: string;
    imageId?: string;
};

export const polygonAmoy: CaipNetwork = {
    id: `eip155:${80002}`,
    chainId: 80002,
    chainNamespace: 'eip155',
    name: 'Amoy Testnet',
    currency: 'POL',
    explorerUrl: 'https://amoy.polygonscan.com/',
    rpcUrl: 'https://rpc.ankr.com/polygon_amoy',
    imageUrl: 'https://uk.pinterest.com/pin/polygon-logo-matic-token--268456827780023387/',
    imageId: ''
}
