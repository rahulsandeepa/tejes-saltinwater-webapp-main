import React, { useState } from 'react'
import Image from 'next/image'
import { RadioGroup } from '@headlessui/react'
import { classNames } from '@lib/util'
import { services } from '@utils/constants'
import { Loading } from '@components/Icons/Common'
import { useAddItem } from '@lib/hooks'

const locations = ['Colorado', 'Florida']

const Overview = ({ product }: any) => {
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState(locations[0])
  const [loading, setLoading] = useState(false)
  const addItem = useAddItem((product.variants as any[])[0].id)

  const addToCart = async (navigate?: boolean) => {
    setLoading(true)
    const errorMessage = await addItem(navigate)
    setLoading(false)
    setMessage(errorMessage)
  }

  const url = Array.isArray(product.media) ? product.media[0].url : ''

  return (
    <div className="pt-12">
      <section aria-labelledby="features-heading" className="relative">
        <div className="relative h-full w-full aspect-w-3 aspect-h-2 overflow-hidden sm:aspect-w-5 lg:aspect-none lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-16">
          <Image
            layout="fill"
            objectFit="cover"
            src={url || '/product-img-placeholder.png'}
            alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
          />
        </div>

        <div className="max-w-2xl mx-auto pt-16 pb-12 px-4 sm:px-6 lg:max-w-7xl lg:pt-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:col-start-2">
            <h2
              id="features-heading"
              className="font-medium text-skin-secondary-muted"
            >
              {product.name}
            </h2>
            <p className="mt-2 text-5xl font-neuton font-extrabold text-skin-secondary tracking-tight">
              {`${product.name} IV Therapy`}
            </p>
            <p className="mt-3 text-3xl text-skin-secondary">
              {product.pricing?.priceRange?.start?.gross.localizedAmount}
            </p>
            <p
              className="mt-6 text-lg text-skin-secondary-muted"
              dangerouslySetInnerHTML={{
                __html: JSON.parse(product.description as any)?.blocks[0]?.data
                  ?.text,
              }}
            />

            <div className="mt-6">
              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="block text-sm font-medium text-skin-secondary-muted">
                  Select Location
                </RadioGroup.Label>
                <div className="flex rounded-md -space-x-px">
                  {locations.map((location, locationIdx) => (
                    <RadioGroup.Option
                      key={location}
                      value={location}
                      className={({ checked }) =>
                        classNames(
                          locationIdx === 0
                            ? 'rounded-tl-md rounded-bl-md'
                            : '',
                          locationIdx === locations.length - 1
                            ? 'rounded-tr-md rounded-br-md'
                            : '',
                          checked
                            ? 'bg-skin-accent border-skin-accent z-10'
                            : 'border-skin-secondary-muted',
                          'relative border p-4 flex cursor-pointer focus:outline-none'
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <span
                            className={classNames(
                              checked
                                ? 'bg-skin-accent-thick border-transparent'
                                : 'bg-skin-white border-skin-black',
                              active
                                ? 'ring-2 ring-offset-2 ring-skin-accent'
                                : '',
                              'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                            )}
                            aria-hidden="true"
                          >
                            <span className="rounded-full bg-skin-white w-1.5 h-1.5" />
                          </span>
                          <div className="ml-3 flex flex-col">
                            <RadioGroup.Label
                              as="span"
                              className={classNames(
                                checked
                                  ? 'text-skin-white'
                                  : 'text-skin-secondary',
                                'block text-sm font-medium'
                              )}
                            >
                              {location}
                            </RadioGroup.Label>
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {message && (
              <div className="text-skin-error border border-skin-error mt-6 p-3 break-all">
                {message}
              </div>
            )}
            <div className="mt-8 flex flex-col sm:flex-row">
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={() => addToCart()}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-skin-white bg-skin-accent hover:bg-skin-accent-hover"
                >
                  {loading && <Loading />}
                  Add to Cart
                </button>
              </div>
              {/* <div className="ml-3 inline-flex">
                <button
                  onClick={() => addToCart(true)}
                  className="inline-flex items-center justify-center border border-skin-accent px-5 py-3 text-base font-medium rounded-md text-skin-accent bg-skin-primary hover:bg-skin-primary-muted"
                >
                  {loading && <Loading />}
                  Buy Now
                </button>
              </div> */}
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-y-10 gap-x-8 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium text-skin-secondary">Targets</dt>
                <dd className="mt-2 text-skin-secondary-muted">
                  {product.name}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-skin-secondary">Ingredients</dt>
                <dd className="mt-2 text-skin-secondary-muted">
                  {product.name}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium text-skin-secondary">Services</dt>
                <dd className="mt-2 prose prose-sm text-skin-secondary-muted">
                  <ul role="list">
                    {services.map((item: any) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Overview
