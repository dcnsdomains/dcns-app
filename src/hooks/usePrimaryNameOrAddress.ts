import { shortenAddress } from '@app/utils/utils'
import { usePrimary } from './usePrimary'

export const usePrimaryNameOrAddress = (address: string, length = 4) => {
  const { name, ...rest } = usePrimary(address)
  const shortenedAddress = shortenAddress(address, length)

  return {
    nameOrAddr: name || shortenedAddress,
    type: name ? 'name': 'address',
    ...rest,
  }
}