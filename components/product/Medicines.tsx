import React from 'react'
import { LightningBoltIcon } from '@heroicons/react/outline'
import { medicines } from '@utils/constants'
import Dots from '@components/Icons/Dots'

const Medicines = ({ product }: any) => {
  return (
    <div className="text-skin-primary overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Dots
          dotColor="text-skin-light"
          dotClasses="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
        />

        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-skin-secondary sm:text-4xl">
              {product.sectionTitle || 'Safe and Enhanced Brain Function'}
            </h2>
            <p className="text-xl font-bold text-skin-secondary-muted">
              {product.sectionSubTitle || 'The Brain Boost'} - Key Medicines
            </p>
          </div>
          <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
            {medicines.map((feature: any) => (
              <div key={feature.name}>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-skin-accent text-skin-white">
                    <LightningBoltIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-skin-secondary">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 text-base text-skin-secondary-muted">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Medicines
