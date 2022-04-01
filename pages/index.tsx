import apolloClient from '@lib/graphql'
import {
  ProductManyQuery,
  ProductManyDocument,
  CollectionManyQuery,
  CollectionManyDocument,
} from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import { NextSeo } from 'next-seo'
import { Section, Preview, Collections } from '@components/Home'
import { Banner } from '@components/Header'
import { Carousel, Layout } from '@components/common'
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
  const categoriesResult: ApolloQueryResult<CollectionManyQuery | undefined> =
    await apolloClient.query({
      query: CollectionManyDocument,
      variables: {
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
      },
    })
  const categories = categoriesResult?.data?.collections?.edges.map(
    ({ node }) => node
  )
  return {
    props: {
      products,
      categories,
    },
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  }
}

export default function Home({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const images = [
    {
      title: 'Why choose Salt in Water Mobile IV?',
      description:
        'When it comes to your health there is no way you can compromise on it and that is the reason why we take pride in saying that we are one of the most trusted mobile IV solutions you will ever come across. Salt In Water Mobile IV is a team of experts with professional paramedics and registered nurses having years of experience. Whether it is drawing blood, offering high quality services, thoughtful care for the patients, administering IV infusions and so on, our team is extremely qualified and experienced to do every job in the best way possible. We want you to feel absolutely safe and secure while knowing that your paramedic is extremely experienced and we also consider proper personal protection equipment so that they can administer the IV infusion in a safe manner.',
      href: '/catalog',
      image:
        'https://images.unsplash.com/photo-1516575901726-efcb7a9895a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
    },
    {
      title: 'Top-notch professionalism-',
      description:
        'As we have already established, our customers are our top priority and we assure you will observe that when you join hands with our family. We are owned and operated by experienced medical professionals who have been doing this for years and are guided by physicians. We understand how important it is to think through when you let something inside your body and we can guarantee you that our IV infusions are always administered by licensed, trained nurses.',
      href: '/catalog',
      image:
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1706&q=80',
    },
    {
      title: 'Effective IV drips at an affordable price.',
      description:
        'We want to make our IP address accessible to everyone who is looking for that extra boost of energy in daily lives. Whatever your requirements are, from immunity boost, calming yourself, hydration, hangovers, migraine, flu to stress relief and more, we have a solution for every issue. After working for years in this industry we have been able to help tons of customers who now prefer our services regularly and we have seen great reviews regarding our products.',
      href: '/catalog',
      image:
        'https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1478&q=80',
    },
    {
      title: 'Easy to use mobile service.',
      description:
        'The utmost benefit of going for an in-home IV therapy is that you are getting the best high quality services in the comfort of your own home. Can it get any better? Whatever problem you are facing, all you need to do is book your IV hydration remedy and vitamin drips. We will get it all delivered to you no matter where you live in Colorado.',
      href: '/catalog',
      image:
        'https://images.unsplash.com/photo-1524683745036-b46f52b8505a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
    },
  ]
  return (
    <>
      <NextSeo title="Home" />
      <Banner />
      <main>
        {/* Preview section */}
        <Preview />

        <div className="pt-12 w-full px-4 md:px-16 grid grid-cols-1 gap-12">
          <Carousel slidesToScroll={1} slidesToShow={1} {...{ images }} />
        </div>

        {/* Collection section */}
        <Collections {...{ products, categories }} />

        {/* Featured section */}
        <Section />
      </main>
    </>
  )
}

Home.Layout = Layout
