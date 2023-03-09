import { ReactElement } from 'react'
import { useAccount } from 'wagmi'

import { useInitial } from '@app/hooks/useInitial'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { ContentGrid } from '@app/layouts/ContentGrid'
import Registration from '@app/components/pages/profile/[name]/registration/Registration'

export default function Page() {
  const router = useRouterWithHistory()
  const name = router.query.name as string

  const initial = useInitial()

  const { address, isConnecting, isReconnecting } = useAccount()
  const accountLoading = isConnecting || isReconnecting

  const isLoading = accountLoading || initial

  return <Registration nameDetails={{name}} isLoading={isLoading} />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ContentGrid>{page}</ContentGrid>
}