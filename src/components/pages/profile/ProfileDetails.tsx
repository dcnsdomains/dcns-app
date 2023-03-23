import { Typography, mq } from '@ensdomains/thorin'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { CacheableComponent } from '@app/components/@atoms/CacheableComponent'
import { useEffect, useState } from 'react'
import { useContractAddress } from '@app/hooks/useContractAddress'
import { useProvider } from '@app/hooks/useProvider'
import { getPublicResolverContract } from '@app/contracts/contracts'
import { namehash } from 'ethers/lib/utils.js'

const SectionTitle = styled(Typography)(({ theme }) => [
  css`
    color: ${theme.colors.greyPrimary};
    margin-left: ${theme.space['2']};
  `,
])

const Stack = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-flow: row wrap;
    flex-gap: ${theme.space['2']};
    gap: ${theme.space['2']};
    margin-top: ${theme.space['2']};
  `,
)

const RecordsStack = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex-gap: ${theme.space['4']};
    gap: ${theme.space['4']};
    padding: ${theme.space['4']};

    ${mq.md.min(css`
      padding: ${theme.space['6']};
    `)}
  `,
)

const ProfileInfoBox = styled(CacheableComponent)(
  ({ theme }) =>
    css`
      background-color: ${theme.colors.background};
      border-radius: ${theme.radii['2xLarge']};
      border: ${theme.space.px} solid ${theme.colors.border};
    `,
)

const ProfileSection = ({
  label,
  address,
}: {
  label: string
  address: string
}) => {
  const { t } = useTranslation('profile')

  return (
    <>
      <SectionTitle weight='bold' >{t(label)}</SectionTitle>
      <Stack>
        {address}
      </Stack>
    </>
  )
}

export const ProfileDetails = ({
  name
}: {
  name: string
}) => {
  const [address, setAddress] = useState('empty address')
  const provider = useProvider()
  const resolverAddr = useContractAddress('PublicResolver')
  const resolver = getPublicResolverContract(resolverAddr, provider)

  useEffect(() => {
    const request = async () => {
      const node = namehash(name)
      const addr = await resolver.addr(node)
      setAddress(addr)
    }
    request()
  }, [name])

  return (
    <ProfileInfoBox>
      <RecordsStack>
        <ProfileSection
          label='addresses'
          address={address}
        />
      </RecordsStack>
    </ProfileInfoBox>
  )
}