import Link from 'next/link'
import Image from 'next/image'
import apolloClient from '@lib/graphql'
import {
  ProductManyQuery,
  ProductManyDocument,
  useCheckoutByTokenQuery,
} from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import React from 'react'
import { NextSeo } from 'next-seo'
import { Layout } from '@components/common'
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/solid'
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

export default function Catalog() {
  const { checkoutToken: token } = useUI()
  const { data } = useCheckoutByTokenQuery({
    fetchPolicy: 'network-only',
    variables: { checkoutToken: token },
    skip: !token,
  })
  const cartItems = data?.checkout?.lines || []
  return (
    <>
      <NextSeo title="IV Therapies" />
      <div className="">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-skin-secondary sm:text-4xl">
            Shopping Cart
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="border-t border-b border-skin-primary-muted divide-y divide-skin-primary-muted"
              >
                {cartItems.map((line) => {
                  const lineID = line?.id || ''
                  const product = line?.variant.product
                  const price = line?.totalPrice?.gross
                  const url =
                    product && product.thumbnail ? product.thumbnail.url : ''
                  return (
                    <li key={lineID} className="flex py-6 sm:py-10">
                      <div className="relative flex-shrink-0 w-24 h-24 rounded-md object-center sm:w-48 sm:h-48 overflow-hidden">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={url || '/product-img-placeholder.png'}
                          alt={product!.name}
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={`/product/${product!.slug}`}
                                  className="font-medium text-skin-secondary hover:text-skin-secondary-hover"
                                >
                                  {product!.name}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-skin-secondary-muted">
                                Hydration
                              </p>
                              {product!.name ? (
                                <p className="ml-4 pl-4 border-l border-skin-primary-muted text-skin-secondary-muted">
                                  Therapy
                                </p>
                              ) : null}
                            </div>
                            <p className="mt-1 text-sm font-medium text-skin-secondary">
                              {price?.localizedAmount}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                className="-m-2 p-2 inline-flex text-skin-secondary-muted"
                              >
                                <span className="sr-only">Remove</span>
                                <XIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                          <CheckIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-300"
                            aria-hidden="true"
                          />

                          <span>In stock</span>
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-skin-secondary"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-skin-secondary-muted">
                    Subtotal
                  </dt>
                  <dd className="text-sm font-medium text-skin-secondary">
                    {data?.checkout?.subtotalPrice?.net.localizedAmount}
                  </dd>
                </div>
                <div className="border-t border-skin-primary-muted pt-4 flex items-center justify-between">
                  <dt className="flex text-sm text-skin-secondary-muted">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-skin-secondary-muted"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-skin-secondary">
                    {data?.checkout?.subtotalPrice?.tax.localizedAmount}
                  </dd>
                </div>
                <div className="border-t border-skin-primary-muted pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-skin-secondary">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-skin-secondary">
                    {data?.checkout?.subtotalPrice?.net.localizedAmount}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link href="/checkout">
                  <a className="w-full inline-flex justify-center bg-skin-accent border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-skin-white hover:bg-skin-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-skin-accent">
                    Checkout
                  </a>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

Catalog.Layout = Layout
