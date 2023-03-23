import styled, { css } from 'styled-components'

import { Typography, mq } from '@ensdomains/thorin'

const Container = styled.div<{ $banner?: string }>(
  ({ theme, $banner }) =>
    css`
      width: 100%;
      padding: ${theme.space['4']};
      padding-top: ${theme.space['18']};
      background-repeat: no-repeat;
      background-attachment: scroll;
      background-size: 100% ${theme.space['28']};
      background-position-y: -1px; // for overlap with border i think
      background-color: ${theme.colors.background};
      border-radius: ${theme.radii['2xLarge']};
      border: ${theme.space.px} solid ${theme.colors.border};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: ${theme.space['4']};
      flex-gap: ${theme.space['4']};

      ${mq.md.min(css`
        padding: ${theme.space['6']};
        padding-top: ${theme.space['12']};
      `)}
    `,
)

const DetailStack = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    overflow: hidden;
  `,
)

const Name = styled(Typography)(
  () => css`
    width: 100%;
    overflow-wrap: anywhere;
  `,
)

const TextStack = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: ${theme.space['1']};
    flex-gap: ${theme.space['1']};
    width: 100%;
    overflow: hidden;
  `,
)

export const ProfileSnippet = ({
  name,
  children, 
}: {
  name: string
  children?: React.ReactNode
}) => {
  return (
    <Container>
      <TextStack>
        <DetailStack>
          <Name fontVariant='headingTwo'>
            {name}
          </Name>
        </DetailStack>
      </TextStack>
      {children}
    </Container>
  )
}