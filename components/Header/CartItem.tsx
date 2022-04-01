import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Loading } from '@components/Icons/Common'
import { useRemoveItem } from '@lib/hooks'

const CartItem = ({ product: line }: any) => {
  const removeItem = useRemoveItem(line?.id || '')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const product = line?.variant.product
  const price = line?.totalPrice?.gross
  const url = product.thumbnail ? product.thumbnail.url : ''

  const handleRemove = async () => {
    setLoading(true)
    const errorMessage = await removeItem()
    setLoading(false)
    setMessage(errorMessage)
  }

  return (
    <li key={product.id} className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-skin-secondary-muted rounded-md overflow-hidden">
        <div className="relative w-full h-full object-center">
          <Image
            layout="fill"
            objectFit="cover"
            src={url || '/product-img-placeholder.png'}
            alt={product.name}
          />
        </div>
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-skin-secondary">
            <h3>
              <Link href={`/product/${product.path}`}>
                <a>{product.name}</a>
              </Link>
            </h3>
            <p className="ml-4">{`${price?.localizedAmount}`}</p>
          </div>
          <p className="mt-1 text-sm text-skin-secondary-muted">
            {product.ingredients}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <p className="text-skin-secondary-muted">Qty {line.quantity}</p>

          <div className="flex">
            {loading ? (
              <Loading color="text-skin-accent" />
            ) : (
              <button
                type="button"
                onClick={handleRemove}
                className="font-medium text-skin-accent hover:text-skin-accent"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        {message && (
          <div className="text-skin-error border border-skin-error mt-3 p-3 break-all">
            {message}
          </div>
        )}
      </div>
    </li>
  )
}

export default CartItem
