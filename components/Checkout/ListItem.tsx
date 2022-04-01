import Image from 'next/image'
import Link from 'next/link'
import { Switch } from '@headlessui/react'
import { classNames } from '@lib/util'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Loading } from '@components/Icons/Common'
import { Product } from '@saleor/api'
import { useAddItem, useRemoveItem } from '@lib/hooks'

const ListItem = ({
  product,
  cartItems,
}: {
  product: Product
  cartItems: any
}) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const addItem = useAddItem((product.variants as any[])[0].id)
  const removeItem = useRemoveItem(
    cartItems.find((line: any) => line?.variant.product.id === product.id)?.id
  )

  const enabled =
    cartItems
      .map((line: any) => line?.variant.product.id)
      .indexOf(product.id) !== -1

  const toggleEnabledState = async (isEnabled: boolean) => {
    setLoading(true)
    let errorMessage
    if (isEnabled) {
      errorMessage = await addItem()
    } else {
      errorMessage = await removeItem()
    }
    setLoading(false)
    setMessage(errorMessage)
  }
  const url = Array.isArray(product.media) ? product.media[0].url : ''
  return (
    <Switch.Group
      as="div"
      className="bg-skin-primary-muted hover:bg-skin-primary-thick shadow-header rounded-md p-6"
    >
      <div className="flex items-center space-x-4">
        <Switch.Label as="div" className="select-none flex flex-1">
          <div className="relative flex-none w-20 h-20 rounded-md object-center object-cover">
            <Image
              layout="fill"
              objectFit="cover"
              src={url || '/product-img-placeholder.png'}
              alt={product.name}
            />
          </div>
          <div className="px-4 flex-auto space-y-1">
            <h3 className="text-base text-skin-secondary font-semibold">
              {product.name}
            </h3>
            <p className="font-semibold text-skin-secondary">
              {product.pricing?.priceRange?.start?.net.localizedAmount}
            </p>
          </div>
        </Switch.Label>
        {loading ? (
          <Loading color="text-skin-accent-thick" />
        ) : (
          <Switch
            checked={enabled}
            onChange={toggleEnabledState}
            className={classNames(
              enabled ? 'bg-skin-accent' : 'bg-skin-secondary-muted',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent'
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-skin-primary shadow transform ring-0 transition ease-in-out duration-200'
              )}
            />
          </Switch>
        )}
      </div>
      <div className="mt-4 text-skin-accent flex items-center space-x-2">
        <Link href={`/product/${product.slug}`}>
          <a className="font-semibold" target="_blank">
            Learn More
          </a>
        </Link>
        <ExternalLinkIcon className="h-5 w-5" />
      </div>
      {message && (
        <div className="text-skin-error border border-skin-error mb-6 p-3 break-all">
          {message}
        </div>
      )}
    </Switch.Group>
  )
}

export default ListItem
