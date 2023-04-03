import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { useChainId } from './useChainId'

export const useProvider = () => {
  const chainId = useChainId()
  let RPC_URL: string
  let NETWORKISH: any

  if (chainId == 568) {
    RPC_URL = 'https://rpc-testnet.dogechain.dog'
    NETWORKISH = {
      name: 'dogechain-testnet',
      chainId: 568,
    }
  } else {
    RPC_URL = 'https://rpc.dogechain.dog'
    NETWORKISH = {
      name: 'dogechain',
      chainId: 2000,
    }
  }
  return new StaticJsonRpcProvider(RPC_URL, NETWORKISH)
}
