import { Chain } from 'wagmi'

export const dogechain: Chain = {
  id: 2000,
  name: 'Dogechain',
  network: 'dogechain',
  testnet: false,
  nativeCurrency: {
    decimals: 18,
    name: 'Dogechain',
    symbol: 'wDOGE',
  },
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/dogechain'] },
    default: { http: ['https://rpc.ankr.com/dogechain'] },
  },
  blockExplorers: {
    default: { name: 'Dogechain Explorer', url: 'https://explorer.dogechain.dog' },
  },
}

export const dogechainTestnet: Chain = {
  id: 568,
  name: 'Dogechain testnet',
  network: 'dogechain-testnet',
  testnet: true,
  nativeCurrency: {
    decimals: 18,
    name: 'Dogechain',
    symbol: 'wDOGE',
  },
  rpcUrls: {
    public: { http: ['https://rpc-testnet.dogechain.dog'] },
    default: { http: ['https://rpc-testnet.dogechain.dog'] },
  },
  blockExplorers: {
    default: { name: 'Dogechain Testnet Explorer', url: 'https://explorer-testnet.dogechain.dog' },
  },
}