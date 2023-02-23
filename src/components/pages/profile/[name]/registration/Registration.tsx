import Head from 'next/head'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { useAccount } from 'wagmi'

import { Helper, Typography, mq } from '@ensdomains/thorin'

import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { useContractAddress } from '@app/hooks/useContractAddress'
import { Content } from '@app/layouts/Content'
import { BaseLinkWithHistory } from '@app/components/@atoms/BaseLink'

import Pricing from './steps/Pricing/Pricing'

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

type Props = {
  nameDetails: any
  isLoading: boolean
}

const Registration = ({ nameDetails, isLoading }: Props) => {
  const { t } = useTranslation('register')

  const router = useRouterWithHistory()
  const { address } = useAccount()
  const selected = { name: nameDetails.normalisedName, address: address! }
  const { normalisedName } = nameDetails
  const defaultResolverAddress = useContractAddress('PublicResolver')
  // const { data: resolverExists, isLoading: resolverExistsLoading } = useResolverExists(
  //   normalisedName,
  //   defaultResolverAddress,
  // )

  // const labelTooLong = isLabelTooLong(normalisedName)
  // const { dispatch, item } = useRegistrationReducer(selected)
  // const step = item.queue[item.stepIndex]

  // const keySuffix = `${nameDetails.normalisedName}-${address}`
  // const commitKey = `commit-${keySuffix}`
  // const registerKey = `register-${keySuffix}`

  // const { cleanupFlow } = useTransactionFlow()

  // const pricingCallback = ({ years, reverseRecord }: RegistrationStepData['pricing']) => {
  //   dispatch({ name: 'setPricingData', payload: { years, reverseRecord }, selected })
  //   if (!item.queue.includes('profile')) {
  //     // if profile is not in queue, set the default profile data
  //     dispatch({
  //       name: 'setProfileData',
  //       payload: {
  //         records: [{ key: 'ETH', group: 'address', type: 'addr', value: address! }],
  //         clearRecords: resolverExists,
  //         resolver: defaultResolverAddress,
  //       },
  //       selected,
  //     })
  //     if (reverseRecord) {
  //       // if reverse record is selected, add the profile step to the queue
  //       dispatch({
  //         name: 'setQueue',
  //         payload: ['pricing', 'profile', 'info', 'transactions', 'complete'],
  //         selected,
  //       })
  //     }
  //   }

  //   // If profile is in queue and reverse record is selected, make sure that eth record is included and is set to address
  //   if (item.queue.includes('profile') && reverseRecord) {
  //     const recordsWithoutEth = item.records.filter((record) => record.key !== 'ETH')
  //     const newRecords: ProfileRecord[] = [
  //       { key: 'ETH', group: 'address', type: 'addr', value: address! },
  //       ...recordsWithoutEth,
  //     ]
  //     dispatch({ name: 'setProfileData', payload: { records: newRecords }, selected })
  //   }

  //   dispatch({ name: 'increaseStep', selected })
  // }

  // const profileCallback = ({
  //   records,
  //   resolver,
  //   back,
  // }: RegistrationStepData['profile'] & BackObj) => {
  //   dispatch({ name: 'setProfileData', payload: { records, resolver }, selected })
  //   dispatch({ name: back ? 'decreaseStep' : 'increaseStep', selected })
  // }

  // const genericCallback = ({ back }: BackObj) => {
  //   dispatch({ name: back ? 'decreaseStep' : 'increaseStep', selected })
  // }

  // const transactionsCallback = ({ back, resetSecret }: BackObj & { resetSecret?: boolean }) => {
  //   if (resetSecret) {
  //     dispatch({ name: 'resetSecret', selected })
  //   }
  //   genericCallback({ back })
  // }

  // const infoProfileCallback = () => {
  //   dispatch({
  //     name: 'setQueue',
  //     payload: ['pricing', 'profile', 'info', 'transactions', 'complete'],
  //     selected,
  //   })
  // }

  const onStart = () => {
    // dispatch({ name: 'setStarted', selected })
  }

  const onComplete = (toProfile: boolean) => {
    router.push(toProfile ? `/profile/${normalisedName}` : '/')
  }

  useEffect(() => {
    const handleRouteChange = (e: string) => {
      // if (e !== router.asPath && step === 'complete') {
      //   dispatch({ name: 'clearItem', selected })
      //   cleanupFlow(commitKey)
      //   cleanupFlow(registerKey)
      // }
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  // }, [dispatch, step, selected, router.asPath])
  }, [selected, router.asPath] )

  return (
    <>
      <Head>
        <title>{t('title', { name: normalisedName })}</title>
      </Head>
      <Content
        noTitle
        title={normalisedName}
        subtitle={t('subtitle')}
        loading={false}
        singleColumnContent
        inlineHeading
      >
        {{
          // header: nameDetails.expiryDate && (
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
                <Pricing />
              ),
            }['pricing']
          ),
          // trailing: (
          //   {
          //     pricing: (
          //       <Pricing
          //         resolverExists={resolverExists}
          //         nameDetails={nameDetails}
          //         callback={pricingCallback}
          //         hasPrimaryName={!!primaryName}
          //         registrationData={item}
          //       />
          //     ),
          //     profile: (
          //       <Profile
          //         resolverExists={resolverExists}
          //         nameDetails={nameDetails}
          //         registrationData={item}
          //         callback={profileCallback}
          //       />
          //     ),
          //     info: (
          //       <Info
          //         nameDetails={nameDetails}
          //         registrationData={item}
          //         callback={genericCallback}
          //         onProfileClick={infoProfileCallback}
          //       />
          //     ),
          //     transactions: (
          //       <Transactions
          //         nameDetails={nameDetails}
          //         registrationData={item}
          //         onStart={onStart}
          //         callback={transactionsCallback}
          //       />
          //     ),
          //     complete: <Complete nameDetails={nameDetails} callback={onComplete} />,
          //   }[step]
        }}
      </Content>
    </>
  )
}

export default Registration
