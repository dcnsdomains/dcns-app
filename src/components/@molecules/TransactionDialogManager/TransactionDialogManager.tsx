import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Dialog } from '@ensdomains/thorin'
import { TransactionStageModal } from './TransactionStageModal'

export type Props = {
  normalizeName: string
  years: number
  open: boolean
  back: () => void
  complete: () => void
}

export const TransactionDialogManager = ({
  normalizeName,
  years,
  open,
  back,
  complete,
}: Props) => {
  const { t } = useTranslation()

  const onDismiss = useCallback(() => {
    back()
  }, [])

  const InnerComponent = useMemo(() => {
    return (
      <TransactionStageModal
        normalizeName={normalizeName}
        years={years}
        complete={complete}
      />
    )
  }, [onDismiss, t])

  const onCloseDialog = useMemo(() => {
    return onDismiss
  }, [])

  const onDismissDialog = useCallback(() => {
    back()
  }, [])

  return (
    <Dialog
      variant='blank'
      open={open}
      onDismiss={onDismissDialog}
      onClose={onCloseDialog}
    >
      {InnerComponent}
    </Dialog>
  )
}