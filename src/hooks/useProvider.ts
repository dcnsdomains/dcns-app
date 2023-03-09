import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { useChainId } from './useChainId'

export const useProvider = () => {
  const chainId = useChainId()
  let RPC_URL: string
  let NETWORKISH: any

  switch (chainId) {
    case 2000:
      RPC_URL = 'https://rpc.ankr.com/dogechain'
      NETWORKISH = {
        name: 'dogechain',
        chainId: 2000,
      }
      break
    case 568:
      RPC_URL = 'https://rpc-testnet.dogechain.dog'
      NETWORKISH = {
        name: 'dogechain-testnet',
        chainId: 568,
      }
      break
    default:
      throw new Error('Unsupported chainId')
  }

  return new StaticJsonRpcProvider(RPC_URL, NETWORKISH)
}
