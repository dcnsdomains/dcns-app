import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import GasDisplay from '@app/components/@atoms/GasDisplay'
import { Invoice } from '@app/components/@atoms/Invoice/Invoice'
// import { useEstimateFullRegistration } from '@app/hooks/useEstimateRegistration'
import { CurrencyUnit } from '@app/types'
import { BigNumber } from 'ethers'

const OptionBar = styled.div(
  () => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
)

const InvoiceContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: ${theme.space['2']};
    width: 100%;
  `,
)

// type Props = ReturnType<typeof useEstimateFullRegistration>
type Props = {
  years: number
  totalYearlyFee: BigNumber | undefined
  estimatedGasFee: BigNumber | undefined
  estimatedGasLoading: boolean
  gasPrice: BigNumber | undefined
}

const FullInvoice = ({
  years,
  totalYearlyFee,
  estimatedGasFee,
  estimatedGasLoading,
  gasPrice,
}: Props) => {
  const { t } = useTranslation('register')
  const fiatUnit = 'usd'

  const [currencyUnit, setCurrencyUnit] = useState<CurrencyUnit>('wDOGE')
  const currencyDisplay = currencyUnit === 'fiat' ? fiatUnit : 'wDOGE'

  const invoiceItems = useMemo(
    () => [
      {
        label: t('invoice.yearRegistration', { years }),
        value: totalYearlyFee,
      },
      {
        label: t('invoice.estimatedNetworkFee'),
        value: estimatedGasFee,
      },
    ],
    [t, years, totalYearlyFee, estimatedGasFee],
  )

  if (estimatedGasLoading) return <InvoiceContainer />

  return (
    <InvoiceContainer>
      <OptionBar>
        <GasDisplay gasPrice={gasPrice} />
      </OptionBar>
      <Invoice items={invoiceItems} unit={currencyDisplay} totalLabel={t('invoice.total')} />
    </InvoiceContainer>
  )
}

export default FullInvoice
