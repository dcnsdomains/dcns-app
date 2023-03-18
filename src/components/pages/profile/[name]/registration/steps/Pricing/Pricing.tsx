import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { useBalance } from 'wagmi'

import { Button,  Heading, mq } from '@ensdomains/thorin'

import MobileFullWidth from '@app/components/@atoms/MobileFullWidth'
import { Card } from '@app/components/Card'
import { ConnectButton } from '@app/components/ConnectButton'
import { useAccountSafely } from '@app/hooks/useAccountSafely'
import { PlusMinusControl } from '@app/components/@atoms/PlusMinusControl/PlusMinusControl'

const StyledCard = styled(Card)(
  ({ theme }) => css`
    max-width: 780px;
    margin: 0 auto;
    flex-direction: column;
    gap: ${theme.space['4']};
    padding: ${theme.space['4']};

    ${mq.md.min(css`
      padding: ${theme.space['6']} ${theme.space['18']};
      gap: ${theme.space['6']};
    `)}
  `,
)

const StyledHeading = styled(Heading)(
  () => css`
    width: 100%;
    word-break: break-all;

    @supports (overflow-wrap: anywhere) {
      overflow-wrap: anywhere;
      word-break: normal;
    }
  `,
)

type Props = {
  normalisedName: string
  callback: (years: number) => void
  hasPrimaryName: boolean
}

const Pricing = ({
  normalisedName,
  callback,
  hasPrimaryName,
}: Props) => {
  const { t } = useTranslation('register')

  const { address: addr } = useAccountSafely()
  const address = addr as `0x${string}`
  const { data: balance } = useBalance({ address: address })
  const [years, setYears] = useState(1)

  let actionButton: ReactNode

  if (!address) {
    actionButton = <ConnectButton large />
  } else if (!balance?.value) {
    actionButton = (
      <Button disabled>
        {t('action.loading', { ns: 'common' })}
      </Button>
    )
  } else {
    actionButton = (
      <Button
        onClick={() => callback(years) }
      >
        {t('action.next', { ns: 'common' })}
      </Button>
    )
  }

  return (
    <StyledCard>
      <StyledHeading>{t('heading', { name: normalisedName })}</StyledHeading>
      <PlusMinusControl
        minValue={1}
        value={years}
        onChange={(e) => {
          const newYears = parseInt(e.target.value)
          if (!Number.isNaN(newYears)) {
            setYears(newYears)
          }
        }}
        highlighted
      />
      <MobileFullWidth>{actionButton}</MobileFullWidth>
    </StyledCard>
  )
}

export default Pricing