import Link from 'next/link'
import Image from 'next/image'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import apolloClient from '@lib/graphql'
import {
  ProductManyQuery,
  ProductManyDocument,
  useOrderDetailsQuery,
} from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import { Layout } from '@components/common'

export async function getStaticProps(context: GetStaticPropsContext) {
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
      orderToken: context.params?.token?.toString(),
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default function Order({
  orderToken,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { loading, error, data } = useOrderDetailsQuery({
    variables: { token: orderToken || '' },
    skip: !orderToken,
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  if (!data || !data.orderByToken) {
    return <div></div>
  }

  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
          <div className="relative h-full w-full object-center">
            <Image
              layout="fill"
              objectFit="cover"
              src="https://images.unsplash.com/photo-1524683745036-b46f52b8505a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
              alt="TODO"
            />
          </div>
        </div>

        <div>
          <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-16 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-skin-accent">
                Order successful
              </h1>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-skin-secondary sm:text-5xl">
                Thanks for ordering
              </p>
              <p className="mt-2 text-base text-skin-secondary-muted">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>

              <dl className="mt-4 text-sm font-medium">
                <dt className="text-skin-secondary">Order number</dt>
                <dd className="mt-2 text-skin-accent">
                  {data.orderByToken.number}
                </dd>
              </dl>
              {data.orderByToken.metadata.map((entry) => (
                <dl key={entry?.key} className="mt-4 text-sm font-medium">
                  <dt className="text-skin-secondary uppercase">
                    {entry?.key}
                  </dt>
                  <dd className="mt-2 text-skin-accent">{entry?.value}</dd>
                </dl>
              ))}

              <ul
                role="list"
                className="mt-6 text-sm font-medium text-skin-secondary-muted border-t border-skin-primary-muted divide-y divide-skin-priborder-skin-primary-muted"
              >
                {(data.orderByToken.lines || [])!.map((line) => {
                  const lineID = line?.id || ''
                  const price = line?.totalPrice?.gross.localizedAmount
                  const url = line && line.thumbnail ? line.thumbnail.url : ''
                  return (
                    <li key={lineID} className="flex py-6 space-x-6">
                      <div className="relative flex-none w-24 h-24 rounded-md object-center">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={url || '/product-img-placeholder.png'}
                          alt={line!.productName}
                        />
                      </div>
                      <div className="flex-auto space-y-1">
                        <h3 className="text-skin-secondary">
                          <a href="#">{line!.productName}</a>
                        </h3>
                        <p>{`Quantity: ${line?.quantity}`}</p>
                      </div>
                      <p className="flex-none font-medium text-skin-secondary">
                        {price}
                      </p>
                    </li>
                  )
                })}
              </ul>

              <dl className="text-sm font-medium text-skin-secondary-muted space-y-6 border-t border-skin-primary-muted pt-6">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-skin-secondary">
                    {data.orderByToken.total.gross.localizedAmount}
                  </dd>
                </div>

                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-skin-secondary">$0.00</dd>
                </div>

                <div className="flex items-center justify-between border-t border-skin-primary-muted text-skin-secondary pt-6">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">
                    {data.orderByToken.total.gross.localizedAmount}
                  </dd>
                </div>
              </dl>

              <div className="mt-16 border-t border-skin-primary-muted py-6 text-right">
                <Link href="/catalog">
                  <a className="text-sm font-medium text-skin-accent hover:text-skin-accent">
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

Order.Layout = Layout
