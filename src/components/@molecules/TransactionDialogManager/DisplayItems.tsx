import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

const Container = styled.div(
  ({ theme}) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    width: ${theme.space.full};
    gap: ${theme.space['2']};
  `
)

export const DisplayItems = () => {
  const { t } = useTranslation()

  return <Container></Container>
}