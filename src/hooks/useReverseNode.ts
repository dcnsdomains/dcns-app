import { getReverseRegistrarContract } from '@app/contracts/contracts'
import { useQuery } from 'wagmi'
import { useContractAddress } from './useContractAddress'
import { useProvider } from './useProvider'

export const useReverseNode = (address: string) => {
  const provider = useProvider()
  const reverseRegistrarAddress = useContractAddress('ReverseRegistrar')
  const reverseRegistrar = getReverseRegistrarContract(reverseRegistrarAddress, provider)

  const {
    data: reverseNode,
    isLoading,
    status,
  } = useQuery(['useReverseNode', address], () => reverseRegistrar.node(address), {
    cacheTime: 60,
  })

  return {
    reverseNode,
    isLoading,
    status,
  }
}