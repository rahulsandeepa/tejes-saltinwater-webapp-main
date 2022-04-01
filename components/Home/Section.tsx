import React from 'react'
import Image from 'next/image'

const Section = () => {
  return (
    <section
      aria-labelledby="comfort-heading"
      className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
    >
      <div className="relative rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full object-center">
            <Image
              layout="fill"
              objectFit="cover"
              src="https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1478&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="relative bg-skin-black bg-opacity-10 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
          <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
            <h2
              id="comfort-heading"
              className="text-3xl font-black uppercase font-exo tracking-tight text-skin-white sm:text-4xl"
            >
              Happy Customers
            </h2>
            <p className="mt-3 text-xl text-skin-white">
              IV HYDRATION THERAPY CUSTOMERS REPORT FEELING RELAXED, CALM, AND
              REFRESHED.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section
