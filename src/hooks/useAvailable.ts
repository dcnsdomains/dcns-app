import { getDcRegistrarControllerContract } from '@app/contracts/contracts'
import { useQuery } from 'wagmi'
import { useContractAddress } from './useContractAddress'
import { useProvider } from './useProvider'

export const useAvailable = (normalisedName: string) => {
  const name = normalisedName.split('.')[0]
  const provider = useProvider()
  const controllerAddr = useContractAddress('DcRegistrarController')
  const controller = getDcRegistrarControllerContract(controllerAddr, provider)

  const {
    data: available,
    isLoading,
  } = useQuery(['available', name],  () => controller.available(name), {
    cacheTime: 60,
  })

  return {
    available,
    isLoading,
  }
}