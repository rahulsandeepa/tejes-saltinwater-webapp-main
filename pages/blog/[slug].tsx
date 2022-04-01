import apolloClient from '@lib/graphql'
import { ProductManyQuery, ProductManyDocument } from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import Image from 'next/image'
import Renderer from '@components/Blog/Renderer'
import { Layout } from '@components/common'
import { getAllPostsWithSlug, getPostAndMorePosts } from 'contentful/api'
import { useRouter } from 'next/dist/client/router'

export async function getStaticProps({ params }: any) {
  const productsResult: ApolloQueryResult<ProductManyQuery | undefined> =
    await apolloClient.query({
      query: ProductManyDocument,
      variables: {
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
      },
    })
  const products = productsResult?.data?.products?.edges.map(({ node }) => node)
  const { post } = await getPostAndMorePosts(params!.slug)

  return {
    props: {
      post,
      products,
    },
  }
}

export async function getStaticPaths() {
  const blogs = await getAllPostsWithSlug()
  return {
    paths: blogs?.map(({ slug }: any) => `/blog/${slug}`) ?? [],
    fallback: true,
  }
}

export default function BlogPost({ post }: any) {
  const router = useRouter()
  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div className="py-6">
        <div className="px-4 md:px-0 max-w-prose w-full mx-auto my-12 md:my-24">
          <h1 className="text-4xl md:text-6xl font-exo text-skin-secondary">
            {post.title}
          </h1>
          <div className="mt-4">
            <p className="text-lg md:text-xl font-semibold text-skin-secondary-muted">
              {`${post.author.name}, ${new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'full',
              }).format(post.date)}`}
            </p>
          </div>
        </div>
        <div className="mb-12 md:mb-24 relative max-w-5xl mx-auto shadow-3xl w-full overflow-hidden aspect-w-3 aspect-h-2 md:aspect-h-1">
          <Image
            layout="fill"
            objectFit="cover"
            src={post.heroImage.url}
            alt="Blog Hero Image"
          />
        </div>
        <div className="px-4">
          <Renderer richTextBody={post.content} renderH2Links={true} />
        </div>
      </div>
    </>
  )
}

BlogPost.Layout = Layout
