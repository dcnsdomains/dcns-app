/* eslint-disable @next/next/no-img-element */
import styled, { css } from 'styled-components'
import { useAccount } from 'wagmi'

import { mq } from '@ensdomains/thorin'

import { useActiveRoute } from '@app/hooks/useActiveRoute'
import { getRoute } from '@app/routes'

import { RouteItem } from './@atoms/RouteItem/RouteItem'
import { ConnectButton } from './ConnectButton'

const TabWrapper = styled.div(
  ({ theme }) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${theme.colors.background} 60%);
    padding: ${theme.space['6']} ${theme.space['4']};
    ${mq.md.min(
      css`
        display: none;
      `,
    )}
  `,
)

const TabContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.space['3']};
    border-radius: ${theme.radii.full};
    background-color: ${theme.colors.background};
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 3px 24px ${theme.colors.border};
    padding: ${theme.space['1.5']} ${theme.space['1.5']};
  `,
)

const TabItems = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: ${theme.space['3']};
    padding: 0 ${theme.space['1.5']};
  `,
)

const TabBarProfile = ({ address, isActive }: { address: string; isActive: boolean }) => {
  return (
    <></>
  )
}

export const TabBar = () => {
  const { address } = useAccount()
  const activeRoute = useActiveRoute()
  return (
    <>
      <TabWrapper id="tabbar">
        <TabContainer>
          <TabItems>
            <RouteItem route={getRoute('search')} />
            {/* {address && (
              <>
                <RouteItem route={getRoute('names')} />
                <TabBarProfile address={address} isActive={activeRoute === 'profile'} />
                <RouteItem route={getRoute('favourites')} />
                <RouteItem
                  route={getRoute('settings')}
                />
              </>
            )} */}
          </TabItems>
          {!address && <ConnectButton isTabBar />}
        </TabContainer>
      </TabWrapper>
    </>
  )
}
