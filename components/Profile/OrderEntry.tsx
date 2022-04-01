import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { classNames } from '@lib/util'
import OrderProductEntry from './OrderProductEntry'

const OrderEntry = ({ order }: any) => {
  return (
    <div className=" border-t border-b border-skin-primary-muted shadow-sm sm:rounded-lg sm:border">
      <h3 className="sr-only">
        Order placed on <time dateTime={order.created}>{order.created}</time>
      </h3>

      <div className="flex items-center p-4 border-b border-skin-primary-muted sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
        <dl className="flex-1 grid grid-cols-2 gap-x-6 text-base sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div>
            <dt className="font-medium text-skin-secondary">Number</dt>
            <dd className="mt-1 text-skin-secondary-muted">{order.number}</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="font-medium text-skin-secondary">Date placed</dt>
            <dd className="mt-1 text-skin-secondary-muted">
              <time dateTime={order.created}>
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'short',
                }).format(new Date(order.created))}
              </time>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-skin-secondary">Total amount</dt>
            <dd className="mt-1 font-medium text-skin-secondary">
              {order.total.net.amount}
            </dd>
          </div>
        </dl>

        <Menu as="div" className="relative flex justify-end lg:hidden">
          <div className="flex items-center">
            <Menu.Button className="-m-2 p-2 flex items-center text-skin-secondary-muted">
              <span className="sr-only">Options for order {order.number}</span>
              <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-bottom-right bg-skin-primary absolute right-0 mt-2 w-40 rounded-md shadow-lg  ring-1 ring-skin-primary-muted ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active
                          ? 'bg-skin-primary-muted text-skin-secondary'
                          : 'text-skin-secondary-muted',
                        'block px-4 py-2 text-base'
                      )}
                    >
                      View
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active
                          ? 'bg-skin-primary-muted text-skin-secondary'
                          : 'text-skin-secondary-muted',
                        'block px-4 py-2 text-base'
                      )}
                    >
                      Invoice
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
          <a
            href="#"
            className="flex items-center justify-center  py-2 px-2.5 border border-skin-primary-muted rounded-md shadow-sm text-base font-medium text-skin-secondary hover:bg-skin-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent"
          >
            <span>View Order</span>
            <span className="sr-only">{order.number}</span>
          </a>
        </div>
      </div>

      {/* Products */}
      <h4 className="sr-only">Items</h4>
      <ul role="list" className="divide-y divide-skin-primary-muted">
        {order.lines.map((line: any, index: number) => (
          <OrderProductEntry key={line?.id || index} {...{ line, order }} />
        ))}
      </ul>
    </div>
  )
}

export default OrderEntry
