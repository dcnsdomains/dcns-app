import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import WalletSVG from '@app/assets/Wallet.svg'
import { Button, Dialog, Helper, Spinner, Typography } from '@ensdomains/thorin'
import { useSendRegister } from '@app/hooks/useSendRegister'
import { useAccountSafely } from '@app/hooks/useAccountSafely'
import { InnerDialog } from '@app/components/@atoms/InnerDialog'

const WalletIcon = styled.svg(
  ({ theme }) => css`
    width: ${theme.space['12']};
  `,
)

const MessageTypography = styled(Typography)(
  () => css`
    text-align: center;
  `,
)

export type Props = {
  normalizeName: string
  years: number
}

export const TransactionStageModal = ({
  normalizeName,
  years,
}: Props) => {
  const { t } = useTranslation()
  const { address } = useAccountSafely()
  const {
    sendTransaction,
    requestLoading,
    transactionLoading,
    requestError,
    transactionError,
    recentTransaction,
  } = useSendRegister(normalizeName, address!, years)

  const MiddleContent = useMemo(() => {
    return (
      <>
        <WalletIcon as={WalletSVG} />
        <MessageTypography>{t('transaction.dialog.confirm.message')}</MessageTypography>
      </>
    )
  }, [t])

  const ActionButton = useMemo(() => {
    if (!!recentTransaction?.hash) {
      return (
        <Button
          onClick={() => {}}
          colorStyle='accentSecondary'
        >
          {t('action.close')}
        </Button>
      )
    }
    if (transactionLoading) {
      return (
        <Button
          disabled
          suffix={<Spinner color='background' />}
        >
          {t('transaction.dialog.confirm.waitingForWallet')}
        </Button>
      )
    }
    return (
      <Button
        disabled={requestLoading || !sendTransaction || !!requestError}
        loading={requestLoading}
        onClick={() => sendTransaction!()}
      >
        {t('transaction.dialog.confirm.openWallet')}
      </Button>
    )
  }, [
    t,
    sendTransaction,
    requestError,
    requestLoading,
    transactionLoading,
  ])

  const lowerError = useMemo(() => {
    if (transactionError) {
      return transactionError.message.split('(')[0].trim()
    }
    if (requestError) {
      if (requestError.code === 'UNPREDICTABLE_GAS_LIMIT') {
        return 'An unknown error occurred.'
      }
      return requestError.reason
    }
    return null
  }, [transactionError, requestError])

  return (
    <>
      <Dialog.Heading title={t('transaction.dialog.confirm.title')} />
      <InnerDialog>
        {MiddleContent}
        {lowerError && <Helper type='error'>{lowerError}</Helper>}
      </InnerDialog>
      <Dialog.Footer
        leading={ActionButton}
        trailing={
          <></>
        }
      />
    </>
  )
}
