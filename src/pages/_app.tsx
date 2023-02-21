import { RainbowKitProvider, Theme, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ThorinGlobalStyles, lightTheme as thorinLightTheme } from '@ensdomains/thorin'
import { dogechain, dogechainTestnet } from '@app/utils/chains'
import { Basic } from '@app/layouts/Basic'
import { BreakpointProvider } from '@app/utils/BreakpointProvider'

import i18n from '../i18n'

const rainbowKitTheme: Theme = {
  ...lightTheme({
    accentColor: thorinLightTheme.colors.accent,
    borderRadius: 'medium',
  }),
  fonts: {
    body: 'Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
}

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  *,
  ::before,
  ::after {
    font-family: Satoshi,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif;
  }

  body {
    background: radial-gradient(50% 50% at 50% 50%, rgba(82, 152, 255, 0.062) 0%, rgba(255, 255, 255, 0) 100%), #F7F7F7;
  }

  body, .min-safe {
    min-height: 100vh;
    /* stylelint-disable-next-line value-no-vendor-prefix */
    @supports (-webkit-touch-callout: none) {
      /* stylelint-disable-next-line value-no-vendor-prefix */
      min-height: -webkit-fill-available;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    font-feature-settings: "ss01" on, "ss03" on;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -moz-font-feature-settings: "ss01" on, "ss03" on;
  }
`

const breakpoints = {
  xs: '(min-width: 360px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
}

const { provider, chains } = configureChains(
  [dogechain, dogechainTestnet],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'DcNS',
  chains,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  queryClient,
  persister: null,
})

// makePersistent(queryClient)

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider theme={rainbowKitTheme} chains={chains}>
            <ThemeProvider theme={thorinLightTheme}>
              <BreakpointProvider queries={breakpoints}>
                <GlobalStyle />
                <ThorinGlobalStyles />
                <Basic>
                  {getLayout(<Component {...pageProps} />)}
                </Basic>
              </BreakpointProvider>
            </ThemeProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </I18nextProvider>
    </QueryClientProvider>
  )
}
