import { CalendarIcon, RefreshIcon, TruckIcon } from '@heroicons/react/outline'

const Perks = () => {
  return (
    <div className="max-w-7xl py-12 mx-auto divide-y divide-gray-200 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x">
      <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
        <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
          <CalendarIcon className="flex-shrink-0 h-8 w-8 text-skin-secondary" />
          <div className="ml-4 flex-auto flex flex-col-reverse">
            <h3 className="font-medium text-skin-secondary">
              10-year all-inclusive warranty
            </h3>
            <p className="text-sm text-skin-secondary-muted">
              We’ll replace it with a new one
            </p>
          </div>
        </div>
      </div>
      <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
        <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
          <RefreshIcon className="flex-shrink-0 h-8 w-8 text-skin-secondary" />
          <div className="ml-4 flex-auto flex flex-col-reverse">
            <h3 className="font-medium text-skin-secondary">
              Free shipping on returns
            </h3>
            <p className="text-sm text-skin-secondary-muted">
              Send it back for free
            </p>
          </div>
        </div>
      </div>
      <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
        <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
          <TruckIcon className="flex-shrink-0 h-8 w-8 text-skin-secondary" />
          <div className="ml-4 flex-auto flex flex-col-reverse">
            <h3 className="font-medium text-skin-secondary">
              Free, contactless delivery
            </h3>
            <p className="text-sm text-skin-secondary-muted">
              The shipping is on us
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perks
