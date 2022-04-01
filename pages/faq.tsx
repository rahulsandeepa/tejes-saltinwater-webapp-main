import apolloClient from '@lib/graphql'
import { ProductManyQuery, ProductManyDocument } from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import { NextSeo } from 'next-seo'
import { Layout } from '@components/common'
import { faqs } from '@utils/constants'

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
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  }
}

export default function FAQ() {
  return (
    <>
      <NextSeo title="FAQ" />
      <main>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl lg:mx-auto lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-skin-secondary sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-skin-secondary-muted">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
              Malesuada adipiscing sagittis vel nulla nec. Urna, sed a lectus
              elementum blandit et.
            </p>
          </div>
          <div className="mt-20">
            <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <dt className="font-semibold text-skin-secondary">
                    {faq.title}
                  </dt>
                  <dd className="mt-3 text-skin-secondary-muted">{faq.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
    </>
  )
}

FAQ.Layout = Layout
