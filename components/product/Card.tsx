import { Product } from '@saleor/api'
import Link from 'next/link'
import Image from 'next/image'

const Card = ({ product }: { product: Product }) => {
  const url = Array.isArray(product.media) ? product.media[0].url : ''
  return (
    <>
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
        {JSON.parse(product.description as any)?.blocks[0]?.data?.text}
      </p>
      <p className="mt-1 text-sm font-medium text-skin-secondary">
        {`$${product.pricing?.priceRange?.start?.net?.amount}`}
      </p>
    </>
  )
}

export default Card
