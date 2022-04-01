import React from 'react'
import { Disclosure } from '@headlessui/react'
import { classNames } from '@lib/util'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import { faqs } from '@utils/constants'

const Faq = () => {
  return (
    <div className="w-full text-skin-primary max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-extrabold tracking-tight text-skin-secondary sm:text-4xl">
        FAQ
      </h2>
      <div className="mt-8 border-t border-b divide-y divide-skin-primary-muted">
        {faqs.map((faq: any) => (
          <Disclosure as="div" key={faq.title}>
            {({ open }) => (
              <>
                <h3>
                  <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                    <span
                      className={classNames(
                        open
                          ? 'text-skin-accent font-semibold'
                          : 'text-skin-secondary font-medium',
                        'text-lg'
                      )}
                    >
                      {faq.title}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusSmIcon
                          className="block h-6 w-6 text-skin-accent group-hover:text-skin-accent-hover"
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusSmIcon
                          className="block h-6 w-6 text-skin-secondary group-hover:text-skin-secondary-muted"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel
                  as="div"
                  className="pb-6 text-skin-secondary-muted prose"
                >
                  {faq.desc}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}

export default Faq
