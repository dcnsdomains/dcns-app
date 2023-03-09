import { useName } from './useName'
import { useReverseNode } from './useReverseNode'

export const usePrimary = (address: string) => {
  const { reverseNode, isLoading } = useReverseNode(address)
  const { name } = useName(reverseNode ?? '')

  return {
    name: name ?? null,
    loading: isLoading,
  }
}