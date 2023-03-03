import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { useBalance } from 'wagmi'

import { Button, Field, Heading, Toggle, Typography, mq } from '@ensdomains/thorin'

import MobileFullWidth from '@app/components/@atoms/MobileFullWidth'
// import { PlusMinusControl } from '@app/components/@atoms/PlusMinusControl/PlusMinusControl'
// import { RegistrationTimeComparisonBanner } from '@app/components/@atoms/RegistrationTimeComparisonBanner/RegistrationTimeComparisonBanner'
import { Card } from '@app/components/Card'
import { ConnectButton } from '@app/components/ConnectButton'
import { useAccountSafely } from '@app/hooks/useAccountSafely'
// import { useEstimateFullRegistration } from '@app/hooks/useEstimateRegistration'
// import { useNameDetails } from '@app/hooks/useNameDetails'
import { useBreakpoint } from '@app/utils/BreakpointProvider'
import { PlusMinusControl } from '@app/components/@atoms/PlusMinusControl/PlusMinusControl'
import FullInvoice from '../../FullInvoice'
import { BigNumber } from 'ethers'

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

const OutlinedContainer = styled.div(
  ({ theme }) => css`
    width: ${theme.space.full};
    display: grid;
    align-items: center;
    grid-template-areas: 'title checkbox' 'description description';
    gap: ${theme.space['2']};

    padding: ${theme.space['4']};
    border-radius: ${theme.radii.large};
    border: ${theme.colors.border} solid 1px;

    ${mq.md.min(css`
      grid-template-areas: 'title checkbox' 'description checkbox';
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

const gridAreaStyle = ({ $name }: { $name: string }) => css`
  grid-area: ${$name};
`

const CheckboxWrapper = styled.div(
  () => css`
    width: 100%;
  `,
  gridAreaStyle,
)
const OutlinedContainerDescription = styled(Typography)(gridAreaStyle)

const OutlinedContainerTitle = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.large};
    font-weight: ${theme.fontWeights.bold};
    white-space: nowrap;
  `,
  gridAreaStyle,
)

type Props = {

}

const Pricing = ({

}: Props) => {
  const { t } = useTranslation('register')

  const { address } = useAccountSafely()
  const { data: balance } = useBalance({ address: '0x4F724516242829DC5Bc6119f666b18102437De53' })

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
      <Button>{t('action.next', { ns: 'common' })}</Button>
    )
  }

  return (
    <StyledCard>
      <StyledHeading>{t('heading', { name: 'tomokisun.dc' })}</StyledHeading>
      <PlusMinusControl
        minValue={1}
        value={1}
        onChange={(e) => {
          const newYears = parseInt(e.target.value)
        }}
        highlighted
      />
      <FullInvoice
        years={1}
        totalYearlyFee={BigNumber.from('10000000000000000000')}
        estimatedGasFee={BigNumber.from('10000000000000000000')}
        estimatedGasLoading={false}
        gasPrice={BigNumber.from('10000000000000000000')}
      />
      <OutlinedContainer>
        <OutlinedContainerTitle $name='title'>
          {t('steps.pricing.primaryName')}
        </OutlinedContainerTitle>
        <CheckboxWrapper $name='checkbox'>
          <Field
            hideLabel
            label={t('steps.pricing.primaryName')}
            inline
            reverse
            disabled={false}
          >
            <h1>Field</h1>
          </Field>
        </CheckboxWrapper>
        <OutlinedContainerDescription $name='description'>
          {t('steps.pricing.primaryNameMessage')}
        </OutlinedContainerDescription>
      </OutlinedContainer>
      <MobileFullWidth>{actionButton}</MobileFullWidth>
    </StyledCard>
  )
}

export default Pricing