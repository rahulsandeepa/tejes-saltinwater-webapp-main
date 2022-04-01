import React from 'react'
import Image from 'next/image'
import {
  AcademicCapIcon,
  CalendarIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  PhoneOutgoingIcon,
} from '@heroicons/react/outline'
import Dots from '@components/Icons/Dots'

const transferFeatures = [
  {
    id: 1,
    name: 'Schedule',
    description:
      "Call us, text us, email us, or contact us online to schedule. We can make recommendations on an IV package that's right for you!",
    icon: CalendarIcon,
  },
  {
    id: 2,
    name: 'We visit you',
    description:
      'An IV specialist will come to you. We can typically be at your door in 1 hour or less, but this may vary based on IV specialist availability.',
    icon: AcademicCapIcon,
  },
  {
    id: 3,
    name: 'We administer IV',
    description:
      'The IV specialist will administer your IV to provide hydration & support. Treatment typically takes 45-60 minutes',
    icon: LightningBoltIcon,
  },
]
const communicationFeatures = [
  {
    id: 1,
    name: 'Online',
    description:
      'You may Book Online to schedule your mobile IV therapy, seek treatment advice, and have your questions answered.',
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: 'Phone',
    description:
      'You may also Text/Call Now to schedule your mobile IV therapy, seek treatment advice, and have your questions answered.',
    icon: PhoneOutgoingIcon,
  },
]

const Preview = () => {
  return (
    <section
      aria-labelledby="category-heading"
      className="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8"
    >
      <div className="text-skin-primary overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <Dots
            dotColor="text-skin-light"
            dotClasses="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          />

          <div className="relative text-center">
            <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-skin-secondary sm:text-4xl">
              Colorado & South Florida
            </h2>
            <h3 className="mt-4 text-xl font-medium text-skin-secondary">
              Regular Hours 8:00 AM to 10:00 PM
            </h3>
            <p className="max-w-3xl mx-auto text-base text-skin-secondary-muted">
              7 days a week—Book Online After Hours 24/7 based on
              availability—Check availability
            </p>
            <h3 className="mt-4 text-xl font-medium text-skin-secondary">
              After-hours
            </h3>
            <p className="max-w-3xl mx-auto text-base text-skin-secondary-muted">
              service requires a $100 after-hours fee.
            </p>
          </div>

          <div className="relative mt-12 text-center sm:text-left lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <h3 className="text-2xl font-extrabold text-skin-secondary tracking-tight sm:text-3xl">
                In-home & Mobile IV Therapy Trusted in Colorado.
              </h3>
              <p className="mt-3 text-base text-skin-secondary-muted">
                It is time to feel your very best with IV drip hydration in
                Colorado. We deliver vitamins, antioxidants and nutrients your
                body needs to feel better right to your doorstep. If you are
                looking for the perfect mobile IV therapy spa for all your
                health and wellness needs, we are here for you. Salt in Water
                provides 24/7 in-home and mobile IV treatments directly to you
                no matter where you are. We take pride in calling ourselves one
                of the most trusted mobile IV therapy providers because all our
                IVs are always administered by registered nurses and paramedics
                so that our customers can receive the best quality care in any
                place they are comfortable in, whether it is their home, any
                event, office or even a hotel. Our therapy programs are designed
                in such a way to address a multiple variety of health conditions
                like weight management, low energy, hangovers, dehydration,
                nausea, jet lag and many other ailments.
              </p>

              <dl className="mt-10 space-y-10">
                {transferFeatures.map((item) => (
                  <div key={item.id} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-skin-accent text-skin-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-skin-secondary">
                        {item.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-skin-secondary-muted">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <div className="relative sm:rounded-md overflow-hidden w-96 mx-auto h-120">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src="https://images.unsplash.com/photo-1585960691786-a593e76d3847?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>

          <Dots
            dotColor="text-skin-light"
            dotClasses="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
          />

          <div className="relative text-center sm:text-left mt-12 sm:mt-16 lg:mt-24">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="lg:col-start-2">
                <h3 className="text-2xl font-extrabold text-skin-secondary tracking-tight sm:text-3xl">
                  About Salt In Water in-home and mobile IV treatment.
                </h3>
                <p className="mt-3 text-base text-skin-secondary-muted">
                  Save your time and energy and let the Salt In Water team bring
                  our in-home and mobile IV treatment services to you, right to
                  your doorstep. Salt In Water is based in Colorado and
                  comprises Healthcare experts and professionals who will give
                  you the best treatment services as soon as possible. The best
                  part? You do not even have to leave the comfort of your home,
                  office or your hotel room. No matter what your body requires,
                  whether you are facing dehydration, jet lag, migraine or you
                  are suffering from cold and flu, our IV treatment is the best
                  choice to nourish your body with fluids, healthy vitamins and
                  minerals and give you that wellness and beauty you are craving
                  for.
                </p>

                <dl className="mt-10 space-y-10">
                  {communicationFeatures.map((item) => (
                    <div key={item.id} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-skin-accent text-skin-white">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-skin-secondary">
                          {item.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-skin-secondary-muted">
                        {item.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                <div className="relative sm:rounded-md overflow-hidden w-120 h-80 mx-auto">
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Preview
