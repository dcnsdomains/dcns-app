import { useNetwork } from 'wagmi'

export const useChainId = (): number => {
  const { chain } = useNetwork()
  return chain?.id ?? 568
}
