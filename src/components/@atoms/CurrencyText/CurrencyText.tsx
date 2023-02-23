import { BigNumber } from 'ethers'

import { makeDisplay } from '@app/utils/currency'

type Props = {
  eth?: BigNumber
}

export const CurrencyText = ({ eth }: Props) => {
  if (!eth) return null
  return <>{makeDisplay(eth, 5, 'wDOGE')}</>
}