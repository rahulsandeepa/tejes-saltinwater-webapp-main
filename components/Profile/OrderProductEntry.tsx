import Link from 'next/link'
import Image from 'next/image'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'

const OrderProductEntry = ({ order, line }: any) => {
  return (
    <li className="p-4 sm:p-6">
      <div className="flex items-center sm:items-start">
        <div className="flex-shrink-0 w-20 h-20 bg-skin-primary-muted rounded-lg overflow-hidden sm:w-40 sm:h-40">
          <div className="w-full h-full object-center relative">
            <Image
              layout="fill"
              objectFit="cover"
              src={line?.thumbnail?.url || '/product-img-placeholder.png'}
              alt={line?.productName}
            />
          </div>
        </div>
        <div className="flex-1 ml-6 text-base">
          <div className="font-medium text-skin-secondary sm:flex sm:justify-between">
            <h5>{line?.productName}</h5>
            <p className="mt-2 sm:mt-0">{`$120`}</p>
          </div>
          <p className="hidden text-skin-secondary-muted sm:block sm:mt-2">
            {line?.productName}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:flex sm:justify-between">
        <div className="flex items-center">
          <CheckCircleIcon
            className="w-5 h-5 text-skin-accent"
            aria-hidden="true"
          />
          <p className="ml-2 text-base font-medium text-skin-secondary-muted">
            Placed on{' '}
            <time dateTime={order.created}>
              {new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'full',
              }).format(new Date(order.created))}
            </time>
          </p>
        </div>

        <div className="mt-6 border-t border-skin-primary-muted pt-4 flex items-center space-x-4 divide-x divide-skin-primary-muted text-base font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
          <div className="text-skin-accent flex justify-center items-center space-x-2">
            <Link href={`/order/${order.token}`}>
              <a className="font-semibold" target="_blank">
                View order details
              </a>
            </Link>
            <ExternalLinkIcon className="h-5 w-5" />
          </div>
          <div className="flex-1 pl-4 flex justify-center">
            <a
              href="#"
              className="text-skin-accent whitespace-nowrap hover:text-skin-accent"
            >
              Buy again
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default OrderProductEntry
