import React, { Fragment } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useUI } from '@components/ui/context'
import EmptyCart from '@components/Icons/EmptyCart'
import { useCheckoutByTokenQuery } from '@saleor/api'
import CartItem from './CartItem'

const CartSlider = () => {
  const { displaySidebar: show, closeSidebar, checkoutToken } = useUI()
  const { data } = useCheckoutByTokenQuery({
    fetchPolicy: 'network-only',
    variables: { checkoutToken: checkoutToken },
    skip: !checkoutToken || !process.browser,
  })

  const lineItems = data?.checkout?.lines || []
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-hidden"
        onClose={closeSidebar}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 text-skin-primary bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-skin-primary shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-skin-secondary">
                        Services
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-skin-secondary-muted hover:text-skin-secondary-muted"
                          onClick={() => closeSidebar()}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {lineItems.length > 0 ? (
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-skin-secondary-muted"
                          >
                            {lineItems.map((product: any) => (
                              <CartItem key={product.id} {...{ product }} />
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-12 h-full w-full">
                        <span className="text-xl font-semibold text-center text-skin-secondary-muted">
                          Empty Cart
                        </span>
                        <div className="">
                          <EmptyCart className="w-full h-full" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-skin-secondary-muted py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-skin-secondary">
                      <p>Subtotal</p>
                      <p>
                        {data?.checkout?.subtotalPrice?.net.localizedAmount}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-skin-secondary-muted">
                      Taxes calculated at checkout
                    </p>
                    <div className="mt-6">
                      <Link href="/checkout">
                        <a
                          className={`${
                            lineItems.length === 0
                              ? 'pointer-events-none bg-skin-primary-muted text-skin-secondary-muted'
                              : 'bg-skin-accent hover:bg-skin-accent-hover text-skin-primary'
                          } flex justify-center items-center px-6 py-3 rounded-md shadow-sm text-base font-medium`}
                        >
                          Checkout
                        </a>
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-skin-secondary-muted">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="text-skin-accent font-medium hover:text-skin-accent"
                          onClick={() => closeSidebar()}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CartSlider
