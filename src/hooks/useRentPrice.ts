import { getDcRegistrarControllerContract } from '@app/contracts/contracts'
import { BigNumber } from 'ethers'
import { useQuery } from 'wagmi'
import { useContractAddress } from './useContractAddress'
import { useProvider } from './useProvider'

export const useRentPrice = (name: string, years: BigNumber) => {
  const provider = useProvider()
  const controllerAddr = useContractAddress('DcRegistrarController')
  const controller = getDcRegistrarControllerContract(controllerAddr, provider)

  const {
    data: price,
    isLoading,
  } = useQuery([name, years], async () => await controller.rentPrice(name, years), {
    enabled: !!name,
  })

  return {
    price,
    isLoading,
  }
}