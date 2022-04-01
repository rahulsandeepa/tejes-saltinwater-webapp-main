import Image from 'next/image'
import React, { useState } from 'react'
import { CheckoutLine, Product } from '@saleor/api'
import { TrashIcon } from '@heroicons/react/outline'
import { Loading } from '@components/Icons/Common'
import { useRemoveItem } from '@lib/hooks'

const CartItem = ({ line }: { line: CheckoutLine }) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const removeItem = useRemoveItem(line?.id || '')
  const lineID = line?.id || ''
  const product = line?.variant.product as Product
  const price = line?.totalPrice?.gross
  const url = product.thumbnail ? product.thumbnail.url : ''

  const handleRemove = async () => {
    setLoading(true)
    const errorMessage = await removeItem()
    setLoading(false)
    setMessage(errorMessage)
  }

  return (
    <li key={lineID} className="flex py-6 px-4 sm:px-6">
      <div className="flex-shrink-0 w-20 rounded-md relative overflow-hidden">
        <Image
          layout="fill"
          objectFit="cover"
          src={url || '/product-img-placeholder.png'}
          alt={product.name}
        />
      </div>

      <div className="ml-6 flex-1 flex flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm">
              <a
                href={`/product/${product.slug}`}
                className="font-medium text-skin-secondary-muted hover:text-skin-secondary-hover"
              >
                {product.name}
              </a>
            </h4>
            <p className="mt-1 text-sm text-skin-secondary-muted">
              {product.name}
            </p>
            <p className="mt-1 text-sm text-skin-secondary-muted">
              {product.name}
            </p>
          </div>

          <div className="ml-4 flex-shrink-0 flow-root">
            {loading ? (
              <Loading color="text-skin-accent" />
            ) : (
              <button
                type="button"
                onClick={handleRemove}
                className="-m-2.5 p-2.5 flex items-center justify-center text-skin-secondary-muted hover:text-skin-secondary-muted"
              >
                <span className="sr-only">Remove</span>
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 pt-2 flex items-end justify-between">
          <p className="mt-1 text-sm font-medium text-skin-secondary">
            {`${price?.localizedAmount}`}
          </p>

          <div className="ml-4">
            <p className="text-skin-secondary-muted">{`Qty: ${line.quantity}`}</p>
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
