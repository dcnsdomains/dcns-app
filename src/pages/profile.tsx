import { useInitial } from '@app/hooks/useInitial'
import { usePrimary } from '@app/hooks/usePrimary'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { useAccount } from 'wagmi'

export default function Profile() {
  const router = useRouterWithHistory()
  const _name = router.query.name as string
  const isSelf = router.query.connected === 'true'
  const isViewingExpired = router.query.expired === 'true'

  const initial = useInitial()

  const { address, isConnecting, isReconnecting } = useAccount()
  const accountLoading = isConnecting || isReconnecting

  const { name: primaryName, loading: primaryLoading } = usePrimary(address as string)
  const name = isSelf && primaryName ? primaryName : _name

  const isLoading = accountLoading || initial || primaryLoading

  if (isViewingExpired) {
    router.push(`/profile/${name}`)
    return null
  }

  if (!isViewingExpired) {
    router.push(`/register/${name}`)
    return null
  }
  
  return (
    <>
    </>
  )
}