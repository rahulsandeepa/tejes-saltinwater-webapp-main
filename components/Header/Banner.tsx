import React from 'react'
import Link from 'next/link'
import Treatment from '../Icons/Treatment'

const Banner = () => {
  return (
    <div className="relative pt-10 sm:pt-16 lg:pt-6 pb-32 lg:pb-12 overflow-hidden">
      <div className="absolute pb-16 inset-0 -skew-y-6 origin-top-left bg-banner from-skin-accent to-skin-accent-thick w-full h-full"></div>
      <div className="relative mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="mx-auto max-w-md px-2 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div className="lg:py-12">
              <h1 className="text-4xl font-black font-exo tracking-tight text-skin-primary sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl">
                <span className="block">In-Home & Mobile</span>
                <span className="block text-skin-secondary">IV Therapy</span>
              </h1>
              <p className="mt-3 text-lg text-skin-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Why leave your house when you can get your IV cocktail right in the comfort of your home?
             
              Salt in Water in home and mobile IV therapy brings you the best combination of fluids,
               vitamins and specialized infusions to help provide necessary hydration 
              to your body and work towards repairing and renewing it.
              </p>
              <div className="my-8">
                <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                  <div className="sm:flex justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link href="/catalog">
                        <a className="w-full flex items-center justify-center px-8 py-3 border border-skin-secondary-muted text-base font-semibold rounded-md text-skin-primary bg-skin-secondary hover:bg-skin-secondary-hover md:py-4 md:text-lg md:px-10">
                          Book Online
                        </a>
                      </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-skin-primary-muted text-base font-semibold rounded-md text-skin-secondary bg-skin-primary hover:bg-skin-primary-muted md:py-4 md:text-lg md:px-10"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                  <p className="mt-3 text-base text-skin-white sm:mt-4">
                    You may book online text now call now to schedule your
                    mobile IV therapy, seek treatment advice, and have your{' '}
                    <a href="#" className="border-b border-skin-white">
                      questions answered
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 py-6">
            <div className="w-full md:w-1/2 mx-auto px-4 lg:w-full lg:h-full">
              {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
              <Treatment className="w-full h-full my-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
