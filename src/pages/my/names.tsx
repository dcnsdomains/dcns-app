import { useNames } from '@app/hooks/useNames'
import { ContentGrid } from '@app/layouts/ContentGrid'
import { ReactElement } from 'react'
import { useAccount } from 'wagmi'

export default function Page() {
  const { address } = useAccount()
  const { names } = useNames(address as string)
  console.log('names', names)

  return <></>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ContentGrid>{page}</ContentGrid>
}