import { getProviderById, setupRegistrar, NETWROK_ID } from '@dcnsdomains/function'
import { useChainId } from './useChainId'

export const useRegistrar = () => {
  const networkId = useChainId()
  const networkName = NETWROK_ID[networkId]
  const provider = getProviderById(networkId)
  return setupRegistrar(networkName, provider)
}