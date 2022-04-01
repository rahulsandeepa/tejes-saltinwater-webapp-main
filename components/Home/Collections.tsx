import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { Collection, Product } from '@saleor/api'

export type ValuesOf<T extends readonly any[]> = T[number]

const Collections = ({ products, categories }: any) => {
  const [selectedTab, setSelected] = useState<string>('All')
  const allTabs = ['All', ...categories.map(({ name }: Collection) => name)]
  const filtered =
    selectedTab === 'All'
      ? products
      : categories
          .find(({ name }: Collection) => name === selectedTab)
          ?.products?.edges.map(({ node }: { node: Collection }) => node)
  return (
    <section
      aria-labelledby="product-heading"
      className="max-w-xl mx-auto pt-24 px-4 sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div className="flex justify-center">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a category
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-skin-accent focus:border-skin-accent border-skin-primary-muted rounded-md"
            value={selectedTab}
            onChange={(evt) => setSelected(evt.target.value as any)}
          >
            {allTabs.map((tab: string) => (
              <option key={tab}>{tab}</option>
            ))}
          </select>
        </div>
        <div className="w-full mx-auto max-w-4xl hidden sm:block">
          <nav
            className="flex flex-wrap justify-center gap-6"
            aria-label="Tabs"
          >
            <AnimateSharedLayout>
              {allTabs.map((tab: string) => (
                <a
                  key={tab}
                  onClick={() => setSelected(tab)}
                  className={`relative ${
                    selectedTab === tab
                      ? 'text-skin-primary hover:text-skin-light'
                      : 'text-skin-secondary'
                  } px-3 py-2 font-medium text-sm cursor-pointer`}
                  aria-current={selectedTab === tab ? 'page' : undefined}
                >
                  {selectedTab === tab ? (
                    <motion.div
                      layoutId="current"
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="absolute rounded-md inset-0 bg-skin-accent"
                    ></motion.div>
                  ) : null}
                  <span className="relative">{tab}</span>
                  {selectedTab === tab ? (
                    <span className="relative bg-skin-white text-skin-accent-thick hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium sm:inline-block">
                      {filtered!.length}
                    </span>
                  ) : null}
                </a>
              ))}
            </AnimateSharedLayout>
          </nav>
        </div>
      </div>

      <AnimateSharedLayout>
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-8"
        >
          {filtered!.map((product: Product) => {
            const url = Array.isArray(product.media) ? product.media[0].url : ''
            return (
              <motion.div layout key={product.id} className="group relative">
                <div className="relative w-full h-56 bg-skin-primary rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={url || '/product-img-placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base text-skin-secondary font-bold">
                  <Link href={`/product/${product.slug}`}>
                    <a>
                      <span className="absolute inset-0" />
                      {product.name}
                    </a>
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-skin-secondary-muted">
                  {
                    JSON.parse(product.description as any)?.blocks[0]?.data
                      ?.text
                  }
                </p>
                <p className="mt-1 text-sm font-medium text-skin-secondary">
                  {`$${product.pricing?.priceRange?.start?.net?.amount}`}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimateSharedLayout>
    </section>
  )
}

export default Collections
