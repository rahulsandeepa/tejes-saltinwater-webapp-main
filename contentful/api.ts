const POST_GRAPHQL_FIELDS = `
  title
  slug
  heroImage {
    url
  }
  tags
  publishDate
  author {
    __typename
    ... on Person {
      name
      image {
        url
      }
    }
  }
  excerpt
  content {
    json
  }
`

async function fetchGraphQL(query: any) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then(async (response) => {
    const resp = await response.json()
    return resp
  })
}

export async function getAllPostsForHome() {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(order: publishDate_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(slug: string) {
  const entry = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}

function extractPostEntries(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items
}

export function extractPost(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items?.[0]
}
