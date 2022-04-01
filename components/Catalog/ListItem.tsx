import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loading } from '@components/Icons/Common'
import { Product } from '@saleor/api'
import { useAddItem } from '@lib/hooks'

const ListItem = ({ product }: { product: Product }) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const addItem = useAddItem((product.variants as any[])[0].id)

  const addToCart = async () => {
    setLoading(true)
    const errorMessage = await addItem()
    setLoading(false)
    setMessage(errorMessage)
  }

  const url = Array.isArray(product.media) ? product.media[0].url : ''

  return (
    <motion.div layout className="md:flex flex-col justify-between">
      <Link href={`/product/${product.slug}`}>
        <a className="relative">
          <div className="relative w-full h-72 rounded-lg shadow overflow-hidden">
            <Image
              layout="fill"
              objectFit="cover"
              src={url || '/product-img-placeholder.png'}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
            <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-skin-black opacity-50"
              />
              <p className="relative text-lg font-semibold text-skin-white">
                {`$${product.pricing?.priceRange?.start?.net?.amount}`}
              </p>
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-lg font-medium text-skin-secondary">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-skin-secondary-muted">
              {JSON.parse(product.description as any)?.blocks[0]?.data?.text}
            </p>
          </div>
        </a>
      </Link>
      <div className="mt-3 md:mt-1 text-center">
        {message && (
          <div className="text-skin-error border border-skin-error mb-6 p-3 break-all">
            {message}
          </div>
        )}
        <button
          onClick={addToCart}
          className="mt-3 w-full relative flex bg-skin-accent border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-semibold text-skin-primary hover:bg-skin-accent"
        >
          {loading && <Loading />}
          Add to Cart
          <span className="sr-only">, {product.name}</span>
        </button>
      </div>
    </motion.div>
  )
}

export default ListItem
