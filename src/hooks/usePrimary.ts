import { useQuery } from 'wagmi'
import { useRegistrar } from './useRegistrar'

export const usePrimary = (address: string) => {
  const registrar = useRegistrar()

  const {
    data: name,
    isLoading: loading,
    status,
  } = useQuery(['getName', address], () => registrar.getName(address), {
    enabled: address !== '',
    cacheTime: 60,
  })

  return {
    name: name ?? null,
    loading,
    status,
  }
}