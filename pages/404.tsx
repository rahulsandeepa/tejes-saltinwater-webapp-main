import apolloClient from '@lib/graphql'
import Link from 'next/link'
import { Layout } from '@components/common'
import { ProductManyDocument, ProductManyQuery } from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'

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

export default function NotFound() {
  return (
    <>
      <div className="bg-skin-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-skin-accent sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-skin-primary-muted sm:pl-6">
                <h1 className="text-4xl font-extrabold text-skin-secondary tracking-tight sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-1 text-base text-skin-secondary-muted">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href="/">
                  <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-skin-white bg-skin-accent hover:bg-skin-accent-thick focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent">
                    Go back home
                  </a>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

NotFound.Layout = Layout
