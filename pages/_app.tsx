import React, { FC } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import apolloClient, { saleorClient } from '@lib/graphql'
import { ApolloProvider } from '@apollo/client'
import { ManagedUIContext } from '@components/ui/context'
import { SaleorProvider } from '@saleor/sdk'

import '../styles/globals.css'
import 'react-calendar/dist/Calendar.css'
import 'tailwindcss/tailwind.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        ></meta>
      </Head>
      <DefaultSeo {...SEO} />
      <ApolloProvider client={apolloClient}>
        <SaleorProvider client={saleorClient}>
          <ManagedUIContext>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </ManagedUIContext>
        </SaleorProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
