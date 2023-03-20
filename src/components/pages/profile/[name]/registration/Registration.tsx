import Head from 'next/head'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { useAccount } from 'wagmi'

import { Typography, mq } from '@ensdomains/thorin'

import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { Content } from '@app/layouts/Content'
import { BaseLinkWithHistory } from '@app/components/@atoms/BaseLink'

import Pricing from './steps/Pricing/Pricing'
import Complete from './steps/Complete'
import { usePrimary } from '@app/hooks/usePrimary'
import { TransactionDialogManager } from '@app/components/@molecules/TransactionDialogManager/TransactionDialogManager'
import { isLabelTooLong } from '@app/utils/utils'

const ViewProfileContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    margin-bottom: -${theme.space['3']};
    padding: 0 ${theme.space['4']};

    & > a {
      transition: all 0.15s ease-in-out;

      &:hover {
        filter: brightness(1.05);
        transform: translateY(-1px);
      }
    }

    ${mq.md.min(css`
      margin-bottom: 0;
      padding: 0;
    `)}
  `,
)

export type Props = {
  normalisedName: string
  isLoading: boolean
}

export type RegistrationState = 'pricing' | 'complete'

const Registration = ({ normalisedName, isLoading }: Props) => {
  const { t } = useTranslation('register')

  const labelTooLong = isLabelTooLong(normalisedName)
  const router = useRouterWithHistory()
  const { address } = useAccount()
  const { name: primaryName, loading: primaryLoading } = usePrimary(address!)
  const [years, setYears] = useState(1)
  const [isDialogShown, setDialogShown] = useState(false)
  const [state, setState] = useState<RegistrationState>('pricing')

  const pricingCallback = (years: number) => {
    setYears(years)
    setDialogShown(true)
  }
  const handleBack = () => {
    setDialogShown(false)
  }

  const onComplete = (toProfile: boolean) => {
    router.push(toProfile ? `/profile/${normalisedName}` : '/')
  }

  return (
    <>
      <Head>
        <title>{t('title', { name: normalisedName })}</title>
      </Head>
      <Content
        noTitle
        title={normalisedName}
        subtitle={t('subtitle')}
        hideHeading={state == 'complete'}
        loading={labelTooLong ? false : isLoading || primaryLoading}
        singleColumnContent
        inlineHeading
      >
        {{
          header: (
            <ViewProfileContainer>
              <BaseLinkWithHistory href={'/expired-profile/'} passHref>
                <a>
                  <Typography color='accent' weight='bold'>
                    {t('wallet.viewProfile', { ns: 'common' })}
                  </Typography>
                </a>
              </BaseLinkWithHistory>
            </ViewProfileContainer>
          ),
          trailing: (
            {
              pricing: (
                <Pricing
                  normalisedName={normalisedName}
                  callback={pricingCallback}
                  hasPrimaryName={!!primaryName}
                />
              ),
              complete: (
                <Complete
                  normalisedName={normalisedName}
                  callback={onComplete}
                />
              ),
            }[state]
          ),
        }}
      </Content>
      <TransactionDialogManager
        normalizeName={normalisedName}
        years={years}
        open={isDialogShown}
        back={handleBack}
      />
    </>
  )
}

export default Registration
