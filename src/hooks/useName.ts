import { getPublicResolverContract } from '@app/contracts/contracts'
import { useQuery } from 'wagmi'
import { useContractAddress } from './useContractAddress'
import { useProvider } from './useProvider'

export const useName = (address: string) => {
  const provider = useProvider()
  const resolverAddr = useContractAddress('PublicResolver')
  const resolver = getPublicResolverContract(resolverAddr, provider)

  const {
    data: name,
    isLoading,
    status,
  } = useQuery(['useName', address], () => resolver.name(address), {
    cacheTime: 60,
  })

  return {
    name,
    isLoading,
    status,
  }
}