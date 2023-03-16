import { BigNumber } from 'ethers'
import { useFeeData } from 'wagmi'
import { useRentPrice } from './useRentPrice'

type FullProps = {
  name: string
  years: number
}

export const useEstimateFullRegistration = ({
  name,
  years,
}: FullProps) => {
  const { price: yearlyFee } = useRentPrice(name, BigNumber.from(31556951))
  const totalYearlyFee = yearlyFee?.mul(years)

  const { data: feeData, isLoading } = useFeeData()

  return {
    estimatedGasLoading: isLoading,
    yearlyFee,
    totalYearlyFee,
    gasPrice: feeData?.maxFeePerGas || undefined,
    years,
  }
}