import apolloClient from '@lib/graphql'
import { ProductManyQuery, ProductManyDocument } from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import { NextSeo } from 'next-seo'
import { Layout } from '@components/common'

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

export default function ContactUs() {
  return (
    <>
      <NextSeo title="Contact Us" />
      <main>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="divide-y-2 divide-skin-primary-muted">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <h2 className="text-2xl font-extrabold text-skin-secondary sm:text-3xl">
                Get in touch
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-skin-secondary">
                    Collaborate
                  </h3>
                  <dl className="mt-2 text-base text-skin-secondary-muted">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>support@example.com</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">Phone number</dt>
                      <dd>+1 (555) 123-4567</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-skin-secondary">
                    Press
                  </h3>
                  <dl className="mt-2 text-base text-skin-secondary-muted">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>support@example.com</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">Phone number</dt>
                      <dd>+1 (555) 123-4567</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-skin-secondary">
                    Join our team
                  </h3>
                  <dl className="mt-2 text-base text-skin-secondary-muted">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>support@example.com</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">Phone number</dt>
                      <dd>+1 (555) 123-4567</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-skin-secondary">
                    Say hello
                  </h3>
                  <dl className="mt-2 text-base text-skin-secondary-muted">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>support@example.com</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">Phone number</dt>
                      <dd>+1 (555) 123-4567</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-16 lg:grid lg:grid-cols-3 lg:gap-8">
              <h2 className="text-2xl font-extrabold text-skin-secondary sm:text-3xl">
                Locations
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-skin-secondary">
                    Los Angeles
                  </h3>
                  <div className="mt-2 text-base text-skin-secondary-muted">
                    <p>4556 Brendan Ferry</p>
                    <p className="mt-1">Los Angeles, CA 90210</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-skin-secondary">
                    New York
                  </h3>
                  <div className="mt-2 text-base text-skin-secondary-muted">
                    <p>886 Walter Streets</p>
                    <p className="mt-1">New York, NY 12345</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-skin-secondary">
                    Toronto
                  </h3>
                  <div className="mt-2 text-base text-skin-secondary-muted">
                    <p>7363 Cynthia Pass</p>
                    <p className="mt-1">Toronto, ON N3Y 4H8</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-skin-secondary">
                    Chicago
                  </h3>
                  <div className="mt-2 text-base text-skin-secondary-muted">
                    <p>726 Mavis Island</p>
                    <p className="mt-1">Chicago, IL 60601</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

ContactUs.Layout = Layout
