import { ProfileSnippet } from '@app/components/ProfileSnippet'
import { useChainId } from '@app/hooks/useChainId'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { useAccount } from 'wagmi'
import { ProfileDetails } from '../../ProfileDetails'

const DetailsWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
    width: 100%;
  `,
)

export type Props = {
  name: string
}

const ProfileTab = ({ name }: Props) => {
  const chainId = useChainId()
  const { address } = useAccount()
  const { t } = useTranslation('profile')

  return (
    <DetailsWrapper>
      <ProfileSnippet name={name} >
      </ProfileSnippet>
      <ProfileDetails name={name} />
    </DetailsWrapper>
  )
}

export default ProfileTab