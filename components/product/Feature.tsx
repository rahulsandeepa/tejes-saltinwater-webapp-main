import React from 'react'

const Feature = ({ product }: any) => {
  return (
    <div className="bg-banner from-skin-accent to-skin-accent-thick">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="px-4 md:px-20 text-3xl font-extrabold text-skin-primary sm:text-4xl">
          <span className="block">{product.name} IV Therapy</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-skin-primary-muted">
          {JSON.parse(product.description as any)?.blocks[0]?.data?.text}
        </p>
        <a
          href="#"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-skin-secondary bg-skin-primary sm:w-auto"
        >
          {`Book ${product.name}`}
        </a>
      </div>
    </div>
  )
}

export default Feature
