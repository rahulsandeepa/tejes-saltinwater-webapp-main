import apolloClient from '@lib/graphql'
import {
  ProductManyQuery,
  ProductManyDocument,
  ProductBySlugQuery,
  ProductBySlugDocument,
} from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import * as React from 'react'
import { NextSeo } from 'next-seo'
import {
  ProductFaq,
  ProductMedicines,
  ProductOverview,
  VitaminFeature,
  ProductReviews,
  ProductFeature,
} from '@components/product'
import { useRouter } from 'next/dist/client/router'
import { Layout } from '@components/common'

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const productSlug = params?.slug?.toString()
  const productResult: ApolloQueryResult<ProductBySlugQuery | undefined> =
    await apolloClient.query({
      query: ProductBySlugDocument,
      variables: {
        slug: productSlug,
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
      },
    })
  const product = productResult?.data?.product

  const productsResult: ApolloQueryResult<ProductManyQuery | undefined> =
    await apolloClient.query({
      query: ProductManyDocument,
      variables: {
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
      },
    })
  const products = productsResult?.data?.products?.edges.map(({ node }) => node)

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      product,
      products,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths() {
  const productsResult: ApolloQueryResult<ProductManyQuery | undefined> =
    await apolloClient.query({
      query: ProductManyDocument,
      variables: {
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
      },
    })
  const products = productsResult?.data?.products?.edges.map(({ node }) => node)

  return {
    paths: products?.map((product) => `/product/${product.slug}`),
    fallback: 'blocking',
  }
}

export default function Product({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <NextSeo
        title={product.seoTitle as string}
        description={product.seoDescription as string}
      />
      <main>
        <ProductOverview {...{ product }} />
        <ProductMedicines {...{ product }} />
        <VitaminFeature {...{ product }} />
        <ProductFaq />
        <ProductReviews />
        <ProductFeature {...{ product }} />
      </main>
    </>
  )
}

Product.Layout = Layout
