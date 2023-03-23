import { ReactElement } from 'react'
import { useAccount } from 'wagmi'

import { useInitial } from '@app/hooks/useInitial'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { ContentGrid } from '@app/layouts/ContentGrid'
import Registration from '@app/components/pages/profile/[name]/registration/Registration'
import { useAvailable } from '@app/hooks/useAvailable'

export default function Page() {
  const router = useRouterWithHistory()
  const normalisedName = router.query.name as string

  const initial = useInitial()

  const { address, isConnecting, isReconnecting } = useAccount()
  const { available, isLoading: availableLoading } = useAvailable(normalisedName)
  const accountLoading = isConnecting || isReconnecting || availableLoading

  const isLoading = accountLoading || initial

  if (available != true) {
    router.push(`/profile/${normalisedName}`)
  }

  return <Registration normalisedName={normalisedName} isLoading={isLoading} />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ContentGrid>{page}</ContentGrid>
}