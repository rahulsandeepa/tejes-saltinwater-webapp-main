import Link from 'next/link'
import React, { Fragment, useEffect, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { classNames } from '@lib/util'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'
import { Product } from '@saleor/api'

const Popup = ({ products }: any) => {
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement>()

  useEffect(() => {
    const closePopOver = () => {}

    router.events.on('routeChangeComplete', closePopOver)

    return () => {
      router.events.off('routeChangeComplete', closePopOver)
    }
  }, [router.asPath])
  const handleClickPanel = () => (buttonRef.current as any)?.click()
  return (
    <Popover.Group className="hidden lg:block">
      <Popover className="flex">
        {({ open }) => (
          <>
            <div className="relative flex">
              <Popover.Button
                ref={buttonRef as React.RefObject<HTMLButtonElement>}
                className={classNames(
                  open
                    ? 'border-skin-accent text-skin-accent'
                    : 'border-skin-secondary-muted text-skin-secondary hover:text-skin-secondary-hover',
                  'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                )}
              >
                IV Therapy
                <ChevronDownIcon className="ml-1 w-4 h-4 block flex-shrink-0" />
              </Popover.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                tabIndex={0}
                role="button"
                onClick={handleClickPanel}
                onKeyDown={handleClickPanel}
                className="absolute top-full inset-x-0 text-skin-secondary-muted sm:text-sm"
              >
                <div
                  className="absolute inset-0 top-1/2 bg-skin-primary shadow-header"
                  aria-hidden="true"
                />

                <div className="relative bg-skin-primary">
                  <div className="max-w-7xl mx-auto px-8">
                    <div className="py-8">
                      <Link href="/catalog">
                        <a className="text-lg font-medium text-skin-secondary">
                          View All
                        </a>
                      </Link>
                      <ul
                        role="list"
                        aria-labelledby="desktop-featured-heading"
                        className="mt-6 grid grid-cols-4 gap-6"
                      >
                        {products.map((product: Product) => (
                          <li key={product.id} className="flex">
                            <Link href={`/product/${product.slug}`}>
                              <a className="hover:text-skin-secondary-hover">
                                {product.name}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </Popover.Group>
  )
}

export default Popup
