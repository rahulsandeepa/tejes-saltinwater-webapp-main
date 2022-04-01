import React, { ReactNode } from 'react'
import Image from 'next/image'
import { footerNavigation } from '@utils/constants'
import IconButton from './IconButton'

const Footer = () => {
  return (
    <footer className="text-skin-primary" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="relative h-24 w-72">
              <Image
                layout="fill"
                objectFit="cover"
                src="/BigLogo.png"
                alt="Salt In Water"
              />
            </div>
            <p className="text-skin-secondary-muted text-base">
              In-home & Mobile IV Therapy by Salt in Water is one of the fastest
              and most effective ways to nourish your body and aid your health.
              Mobile IV Therapy in Colorado.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <IconButton
                  href={item.href}
                  key={item.name}
                  title={item.name}
                  buttonClasses="text-skin-secondary-muted hover:text-skin-secondary-muted"
                >
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </IconButton>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 xl:mt-0 xl:col-span-2">
            <div>
              <h3 className="text-sm font-bold text-skin-secondary-muted tracking-wider uppercase">
                Useful Links
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {footerNavigation.explore.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-base text-skin-secondary-muted hover:text-skin-secondary-hover"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid col-span-2 grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-skin-secondary-muted tracking-wider uppercase">
                  IV Therapy
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.therapy.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-skin-secondary-muted hover:text-skin-secondary-hover"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <h3 className="text-sm font-bold text-skin-secondary-muted tracking-wider uppercase">
                  Contact
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.contact.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-skin-secondary-muted hover:text-skin-secondary-hover"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-skin-primary-muted py-8">
          <p className="text-base text-skin-secondary-muted xl:text-center">
            Copyright 2020 <Em>Salt in Water IV Therapy</Em> All Rights
            Reserved. <Em>Privacy Policy</Em> | <Em>Terms of Service</Em>
          </p>
        </div>
      </div>
    </footer>
  )
}

const Em = ({ children }: { children: ReactNode }) => {
  return <span className="text-skin-accent">{children}</span>
}

export default Footer
