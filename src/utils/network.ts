import { ethers } from 'ethers'
import { BaseError } from './api/base';

export interface UnsupportedNetwork {}
export class UnsupportedNetwork extends BaseError {}

const NETWORK_ID = {
  2000: 'dogechain',
  568: 'dogechain-testnet',
}

export default function getNetwork(network: string) {
  let INFURA_URL: string;
  let NETWORKISH: any;

  switch (network) {
    case 'dogechain':
      INFURA_URL = 'https://rpc.ankr.com/dogechain'
      NETWORKISH = {
        name: 'dogechain',
        chainId: 2000,
        ensAddress: '',
      }
      break
    case 'dogechain-testnet':
      INFURA_URL = 'https://rpc-testnet.dogechain.dog'
      NETWORKISH = {
        name: 'dogechain-testnet',
        chainId: 568,
        ensAddress: '0xdcB09b788c0FFa486e6458C14F37b29DE24046d2',
      }
      break
    default:
      throw new UnsupportedNetwork(`Unknown network '${network}'`);
  }
  const provider = new ethers.providers.StaticJsonRpcProvider(INFURA_URL, NETWORKISH)
  return { INFURA_URL, provider }
}