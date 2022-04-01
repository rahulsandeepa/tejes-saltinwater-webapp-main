import React, { Fragment } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChatIcon, GlobeIcon, PhoneIcon } from '@heroicons/react/outline'
import { Facebook, Instagram, Twitter } from '../Icons/Common'
import { useUI } from '@components/ui/context'
import { ThemeSwitch } from '@components/common'

const MobileMenu = ({ products }: any) => {
  const { displaySidebar: show, closeSidebar } = useUI()
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={closeSidebar}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-skin-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-sm w-full bg-skin-primary shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-skin-secondary"
                onClick={() => closeSidebar()}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <div className="px-4 py-6 space-y-3">
              <div className="flex items-center space-x-3">
                <p
                  id="desktop-featured-heading"
                  className="text-lg font-medium text-skin-secondary"
                >
                  IV Therapy
                </p>
                <Link href="/catalog">
                  <a className="text-sm underline font-medium text-skin-secondary-muted">
                    (View All)
                  </a>
                </Link>
              </div>
              <ul
                role="list"
                aria-labelledby="desktop-featured-heading"
                className="grid grid-cols-2 gap-2"
              >
                {products.map((product: any) => (
                  <li key={product.name} className="flex">
                    <Link href={`/product/${product.slug}`}>
                      <a className="text-sm text-skin-secondary">
                        {product.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-sm text-skin-secondary flex items-center border-t border-skin-secondary-muted py-6 px-4 space-x-6">
              <span>Switch Theme</span>
              <ThemeSwitch />
            </div>

            <div className="text-sm text-skin-secondary border-t border-skin-secondary-muted py-6 px-4 space-y-6">
              <a href="#" className="-m-2 p-2 flex items-center">
                <GlobeIcon className="w-5 h-5 block flex-shrink-0" />
                <span className="ml-2 block">Book Online</span>
              </a>
              <a href="#" className="-m-2 p-2 flex items-center">
                <ChatIcon className="w-5 h-5 block flex-shrink-0" />
                <span className="ml-2 block">Text Now</span>
              </a>
              <a href="#" className="-m-2 p-2 flex items-center">
                <PhoneIcon className="w-5 h-5 block flex-shrink-0" />
                <span className="ml-2 block">Call Now</span>
              </a>
            </div>

            <div className="border-t border-b border-skin-secondary-muted py-6 px-4 space-y-6">
              <div className="flex items-center space-x-6">
                <a
                  href="https://www.facebook.com/profile.php?id=100073664904930"
                  className="text-sm font-medium text-skin-secondary hover:text-skin-secondary-hover"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://mobile.twitter.com/SALTINWATER1"
                  className="text-sm font-medium text-skin-secondary hover:text-skin-secondary-hover"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/tejes.saltinwater/"
                  className="text-sm font-medium text-skin-secondary hover:text-skin-secondary-hover"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileMenu
