import Image from 'next/image'
import apolloClient from '@lib/graphql'
import { ProductManyQuery, ProductManyDocument } from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import { NextSeo } from 'next-seo'
import { Layout } from '@components/common'
import { Perks, Testimonials, Popular } from '@components/About'
import { InferGetStaticPropsType } from 'next'

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

export default function About({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo title="About" />
      <main className="space-y-16">
        <Popular products={products?.slice(0, 3)} />
        <Testimonials />
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-skin-secondary">
                  The best part about Salt In Water In Home and Mobile IV
                  treatments- you do not have to come to us. We will come to
                  you!
                </h2>
                <p className="mt-4 text-skin-secondary-muted">
                  Our team is fully mobile and we serve almost every area in
                  Colorado. So what are you waiting for? Give your body that
                  much needed nutrition and book your appointment with us right
                  now!
                </p>
              </div>
              <div className="relative aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src="https://images.unsplash.com/photo-1585960691786-a593e76d3847?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                  alt=""
                  className="object-center object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <Perks />
      </main>
    </>
  )
}

About.Layout = Layout
