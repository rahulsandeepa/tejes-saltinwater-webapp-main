import Link from 'next/link'
import apolloClient from '@lib/graphql'
import { ProductManyQuery, ProductManyDocument } from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { Layout } from '@components/common'
import { getAllPostsForHome } from '@contentful/api'

export async function getStaticProps() {
  const productsResult: ApolloQueryResult<ProductManyQuery | undefined> =
    await apolloClient.query({
      query: ProductManyDocument,
      variables: {
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
      },
    })
  const products = productsResult?.data?.products?.edges.map(({ node }) => node)
  const blogs = await getAllPostsForHome()

  return {
    props: {
      products,
      blogs,
    },
    revalidate: 60,
  }
}

export default function Blog({ blogs }: any) {
  return (
    <>
      <NextSeo title="Blog" />
      <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-skin-primary-muted lg:max-w-7xl">
          <div>
            <h2 className="text-3xl tracking-tight font-extrabold text-skin-secondary sm:text-4xl">
              Recent posts
            </h2>
            <p className="mt-3 text-xl text-skin-secondary-muted sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              libero labore natus atque, ducimus sed.
            </p>
          </div>
          <div className="grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-6">
            {blogs.map((post: any) => (
              <div key={post.title}>
                <div className="flex flex-wrap items-end h-12 gap-2">
                  {(post.tags || []).map((tag: string) => (
                    <a key={tag} href="#" className="inline-block">
                      <span className="bg-skin-accent text-skin-white uppercase px-3 py-1 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    </a>
                  ))}
                </div>
                <div className="mt-4 relative w-full h-56 shadow-2xl hover:shadow-3xl">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={post.heroImage.url}
                    alt="Cover"
                    className="object-cover pointer-events-none group-hover:opacity-75"
                  />
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <a className="block mt-4">
                    <p className="text-2xl font-semibold text-skin-secondary">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-skin-secondary-muted">
                      {post.excerpt}
                    </p>
                  </a>
                </Link>
                <div className="mt-3">
                  <Link href={`/blog/${post.slug}`}>
                    <a className="text-base font-semibold text-skin-accent hover:text-skin-accent">
                      Read full story
                    </a>
                  </Link>
                </div>
                <div className="mt-4">
                  <p className="text-base font-medium text-skin-secondary">
                    <a href="#">{post.author.name}</a>
                  </p>
                  <div className="flex space-x-1 text-sm text-skin-secondary-muted">
                    <span>
                      {new Intl.DateTimeFormat('en-GB', {
                        dateStyle: 'full',
                      }).format(post.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

Blog.Layout = Layout
