import apolloClient from '@lib/graphql'
import {
  ProductManyQuery,
  ProductManyDocument,
  useCheckoutByTokenQuery,
} from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import { Layout } from '@components/common'
import { CheckoutAccordion, OrderSummary } from '@components/Checkout'

import { useAuthState } from '@saleor/sdk'
import { useUI } from '@components/ui/context'

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

export default function Checker({ products }: any) {
  const { user: customer } = useAuthState()
  const { checkoutToken: token } = useUI()
  const { data } = useCheckoutByTokenQuery({
    fetchPolicy: 'network-only',
    variables: { checkoutToken: token },
    skip: !token,
  })
  const cartItems = data?.checkout?.lines || []

  return (
    <div className="">
      <div className="max-w-2xl mx-auto py-6 md:py-12 px-4 sm:px-6 lg:max-w-full lg:px-24">
        <h2 className="sr-only">Checkout</h2>

        <div className="lg:grid lg:grid-cols-2 xl:grid-cols-5 lg:gap-x-12 xl:gap-x-16">
          <CheckoutAccordion {...{ products, customer, cartItems }} />

          {/* Order summary */}
          <OrderSummary {...{ data, token, cartItems }} />
        </div>
      </div>
    </div>
  )
}

Checker.Layout = Layout
