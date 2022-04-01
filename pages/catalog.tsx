import apolloClient from '@lib/graphql'
import {
  ProductManyQuery,
  ProductManyDocument,
  CollectionManyDocument,
  CollectionManyQuery,
  Collection,
} from '@saleor/api'
import { ApolloQueryResult } from '@apollo/client'
import React, { Fragment, useState } from 'react'
import { NextSeo } from 'next-seo'
import { Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { classNames } from '@lib/util'
import { ActiveFilters, ListItem } from '@components/Catalog'
import { AnimateSharedLayout, motion } from 'framer-motion'
import type { InferGetStaticPropsType } from 'next'
import { Layout } from '@components/common'
// import { Layout } from '@components/common'

const sortOptions = [
  { name: 'Best Rating', href: '#' },
  { name: 'Alphabetical', href: '#' },
  { name: 'Price: Low to High', href: '#' },
  { name: 'Price: High to Low', href: '#' },
]

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
    revalidate: 60,
  }
}

export default function Catalog({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeFilters, setActive] = useState<string[]>([])

  const onEntryChange = (value: string) => {
    const exists = activeFilters.includes(value)

    if (exists) {
      setActive(activeFilters.filter((c) => c !== value))
    } else {
      setActive([...activeFilters, value])
    }
  }

  const filtered =
    activeFilters.length === 0 || activeFilters.indexOf('all') !== -1
      ? products
      : (categories as Collection[])
          .filter(({ id }: Collection) => activeFilters.indexOf(id) !== -1)
          .reduce((acc: any, entry: Collection) => {
            return acc.concat(entry?.products?.edges.map(({ node }) => node))
          }, [])
  return (
    <>
      <NextSeo title="IV Therapies" />
      <main>
        <div>
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-12">
            <h1 className="text-3xl font-extrabold tracking-tight text-skin-secondary">
              Mobile IV Therapy Drips & In-home
            </h1>
            <p className="mt-4 max-w-xl text-sm text-skin-secondary-muted">
              In-home and mobile IV Therapy means we come to you, whenever and
              wherever.
            </p>
          </div>
        </div>

        {/* Filters */}
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>

          <div className="relative z-10 border-b border-skin-primary-muted pb-4">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-12">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-lg font-medium text-skin-secondary hover:text-skin-secondary-hover">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-6 w-6 text-skin-secondary group-hover:text-skin-secondary-hover"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-left absolute bg-skin-primary left-0 mt-2 w-40 rounded-md shadow-2xl ring-1 ring-skin-secondary-muted ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.name === 'Best Rating'
                                  ? 'font-medium text-skin-secondary'
                                  : 'text-skin-secondary-muted',
                                active ? 'bg-skin-primary-muted' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-skin-primary-muted">
                  <Popover className="px-4 relative inline-block text-left">
                    <Popover.Button className="group inline-flex justify-center text-lg font-medium  text-skin-secondary hover:text-skin-secondary-hover">
                      <span>Category</span>
                      <span className="ml-1.5 rounded py-1 px-1.5 bg-skin-secondary divide-skin-primary-muted text-xs font-semibold text-skin-primary tabular-nums">
                        {activeFilters.length}
                      </span>
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-skin-secondary-muted group-hover:text-skin-secondary-muted"
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Popover.Panel className="origin-top-right absolute bg-skin-primary right-0 mt-2 rounded-md shadow-2xl p-4 ring-1 ring-skin-secondary-muted ring-opacity-5 focus:outline-none">
                        <form className="space-y-4">
                          {(categories as Collection[]).map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-category-${category.id}`}
                                name="category"
                                type="checkbox"
                                defaultChecked={activeFilters.includes(
                                  category.id
                                )}
                                onChange={() => onEntryChange(category.id)}
                                className="h-4 w-4 border-skin-primary-muted rounded text-skin-accent hover:bg-skin-primary-muted focus:ring-skin-accent"
                              />
                              <label
                                htmlFor={`filter-category-${category.id}`}
                                className="ml-3 pr-6 text-sm font-medium text-skin-secondary whitespace-nowrap"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </form>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </Popover.Group>
              </div>
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 ? (
            <ActiveFilters {...{ activeFilters, onEntryChange, categories }} />
          ) : null}
        </section>

        {/* Product grid */}
        <section
          aria-labelledby="products-heading"
          className="max-w-2xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <AnimateSharedLayout>
            <motion.div
              layout
              className="mt-8 grid md:auto-rows-1fr grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {filtered.map((product: any) => (
                <ListItem key={product.id} {...{ product }} />
              ))}
            </motion.div>
          </AnimateSharedLayout>
        </section>
      </main>
    </>
  )
}

Catalog.Layout = Layout
