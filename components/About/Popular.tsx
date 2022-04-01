import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@saleor/api'

export default function Popular({ products }: any) {
  return (
    <div className="relative bg-skin-primary">
      {/* Background image and overlap */}
      <div
        aria-hidden="true"
        className="hidden absolute inset-0 sm:flex sm:flex-col"
      >
        <div className="flex-1 relative w-full bg-skin-secondary">
          <div className="absolute inset-0 overflow-hidden">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                layout="fill"
                objectFit="cover"
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1706&q=80"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-skin-black opacity-50" />
        </div>
        <div className="w-full bg-skin-primary h-32 md:h-40 lg:h-48" />
      </div>

      <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col sm:hidden"
        >
          <div className="flex-1 relative w-full bg-skin-secondary">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                layout="fill"
                objectFit="cover"
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1706&q=80"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-skin-black opacity-50" />
          </div>
          <div className="w-full bg-skin-white h-48" />
        </div>
        <div className="relative py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-skin-white sm:text-5xl md:text-6xl">
            Popular IV Fluids
          </h1>
          <div className="mt-4 sm:mt-6">
            <Link href="/">
              <a className="inline-block bg-skin-accent rounded-md py-3 px-8 font-medium text-skin-white hover:bg-skin-accent-hover">
                Shop Catalog
              </a>
            </Link>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="collection-heading"
        className="-mt-96 relative sm:mt-0"
      >
        <h2 id="collection-heading" className="sr-only">
          Collections
        </h2>
        <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
          {products?.map((product: Product) => {
            const url = Array.isArray(product.media) ? product.media[0].url : ''
            return (
              <div
                key={product.name}
                className="group relative h-96 bg-skin-white rounded-lg shadow-xl sm:h-auto sm:aspect-w-4 sm:aspect-h-5"
              >
                <div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={url || '/product-img-placeholder.png'}
                        alt={product.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-skin-black opacity-50" />
                  </div>
                  <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                    <div>
                      <p aria-hidden="true" className="text-sm text-skin-black">
                        Shop the collection
                      </p>
                      <h3 className="mt-1 font-semibold text-skin-black">
                        <Link href={`/product/${product.slug}`}>
                          <a>
                            <span className="absolute inset-0" />
                            {product.name}
                          </a>
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
