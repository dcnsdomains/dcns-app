import { useChainId } from '@app/hooks/useChainId'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { Content } from '@app/layouts/Content'
import Head from 'next/head'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import ProfileTab from './tabs/ProfileTab'

export type Props = {
  isSelf: boolean
  isLoading: boolean
  name: string
}

const ProfileContent = ({ isSelf, isLoading, name}: Props) => {
  const router = useRouterWithHistory()
  const { t } = useTranslation('profile')
  const chainId = useChainId()
  const { address } = useAccount()

  const [titleContent, descriptionContent] = useMemo(() => {
    if (isSelf) {
      return [t('yourProfile'), '']
    }
    return [
      t('meta.title', {
        name,
      }),
      t('meta.description', {
        name,
      }),
    ]
  }, [isSelf, name, t])

  return (
    <>
      <Head>
        <title>{titleContent}</title>
        <meta name='description' content={descriptionContent} />
      </Head>
      <Content
        noTitle
        title={isSelf ? t('yourProfile') : name}
        subtitle={isSelf ? name : t('Profile')}
        loading={isLoading}
      >
        {{
          info: undefined,
          warning: undefined,
          header: undefined,
          trailing: (
            <ProfileTab name={name} />
          ),
        }}
      </Content>
    </>
  )
}

export default ProfileContent