import apolloClient from '@lib/graphql'
import {
  ProductManyQuery,
  ProductManyDocument,
  useOrdersQuery,
} from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import { NextSeo } from 'next-seo'
import { Layout } from '@components/common'
import OrderHistory from '@components/Profile/OrderHistory'
import { useAuthState } from '@saleor/sdk'
import Router from 'next/router'
import { useEffect } from 'react'

export async function getStaticProps() {
  const productsResult: ApolloQueryResult<ProductManyQuery | undefined> =
    await apolloClient.query({
      query: ProductManyDocument,
      variables: {
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
      },
    })
  const products = productsResult?.data?.products?.edges.map(({ node }) => node)

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}

export default function Profile() {
  const { authenticated, user: customer } = useAuthState()
  const { data: ordersCollection } = useOrdersQuery({
    skip: !authenticated,
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && (!customer || !customer.email)) {
      Router.push('/')
    }
  }, [customer])

  const orders = ordersCollection?.me?.orders?.edges.map(({ node }) => node)

  return (
    <>
      <NextSeo title="Order History" />
      <div className="max-w-4xl mx-auto w-full mt-12 mb-24 px-4">
        <OrderHistory {...{ orders }} />
      </div>
    </>
  )
}

Profile.Layout = Layout
