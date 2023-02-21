import { ReactElement } from 'react'
import { useAccount } from 'wagmi'

import { useInitial } from '@app/hooks/useInitial'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { ContentGrid } from '@app/layouts/ContentGrid'

export default function Page() {
  const router = useRouterWithHistory()
  const name = router.query.name as string
  console.log('name', name)

  const initial = useInitial()

  const { address, isConnecting, isReconnecting } = useAccount()
  const accountLoading = isConnecting || isReconnecting

  return <></>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ContentGrid>{page}</ContentGrid>
}