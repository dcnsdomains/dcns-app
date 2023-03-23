import ProfileContent from '@app/components/pages/profile/[name]/Profile'
import { useInitial } from '@app/hooks/useInitial'
import { usePrimary } from '@app/hooks/usePrimary'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { useAccount } from 'wagmi'

export default function Profile() {
  const router = useRouterWithHistory()
  const _name = router.query.name as string
  const isSelf = router.query.connected === 'true'

  const initial = useInitial()

  const { address, isConnecting, isReconnecting } = useAccount()
  const accountLoading = isConnecting || isReconnecting

  const { name: ensName, loading: primaryLoading }  = usePrimary(address as string)

  const name = isSelf && ensName ? ensName : _name

  const isLoading = primaryLoading || accountLoading || initial

  return (
    <ProfileContent
      {...{
        isSelf,
        isLoading,
        name,
      }}
    />
  )
}