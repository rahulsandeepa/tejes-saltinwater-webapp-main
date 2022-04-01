import React, { useEffect } from 'react'
import Calendar from 'react-calendar'
import { morning, afternoon, evening } from '@lib/const'
import { useUI } from '@components/ui/context'
import {
  useCheckoutByTokenQuery,
  useUpdateCheckoutMetadataMutation,
} from '@saleor/api'

const CalendarComp = () => {
  const {
    checkoutToken,
    checkoutDate,
    checkoutSlot,
    setCheckoutDate,
    setCheckoutSlot,
  } = useUI()
  const { data: checkoutData } = useCheckoutByTokenQuery({
    variables: { checkoutToken },
    skip: !checkoutToken || !process.browser,
  })

  const [updateCheckoutMetadata] = useUpdateCheckoutMetadataMutation()

  useEffect(() => {
    if (checkoutSlot && checkoutData?.checkout?.id) {
      updateCheckoutMetadata({
        variables: {
          id: checkoutData?.checkout?.id,
          input: [
            { key: 'date', value: checkoutDate.toString() },
            { key: 'time', value: checkoutSlot },
          ],
        },
      })
    }
  }, [checkoutDate, checkoutSlot])

  return (
    <div className="md:py-5 sm:px-0">
      <div className="xl:grid xl:grid-cols-3 xl:gap-6">
        <div className="xl:col-span-1">
          <h3 className="text-lg font-semibold leading-6 text-skin-secondary">
            Select date
          </h3>
          <p className="mt-1 text-sm text-skin-secondary-muted">
            Decide when you want to schedule an appointment
          </p>
        </div>
        <div className="mt-5 xl:mt-0 md:col-span-2 text-skin-black">
          <Calendar onChange={setCheckoutDate} value={checkoutDate} />
        </div>
        <div className="mt-5 xl:mt-0 xl:col-span-1">
          <h3 className="text-lg font-semibold leading-6 text-skin-secondary">
            Select time slot
          </h3>
          <p className="mt-1 text-sm text-skin-secondary-muted">
            Decide when you want to schedule an appointment
          </p>
        </div>
        <div className="mt-5 xl:mt-0 md:col-span-2 space-y-6">
          <h2 className="text-lg font-medium leading-6 text-skin-secondary">
            You can schedule an appointment between 1 hour and 180 days ahead of
            time
          </h2>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold leading-6 text-skin-secondary">
              Morning
            </h3>
            <div className="flex flex-wrap gap-3">
              {morning.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setCheckoutSlot(date)}
                  className={`${
                    checkoutSlot === date
                      ? 'bg-skin-secondary text-skin-primary'
                      : 'bg-skin-accent text-skin-white'
                  } inline-flex items-center px-3.5 py-1.5 rounded-md text-base font-semibold`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold leading-6 text-skin-secondary">
              Afternoon
            </h3>
            <div className="flex flex-wrap gap-3">
              {afternoon.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setCheckoutSlot(date)}
                  className={`${
                    checkoutSlot === date
                      ? 'bg-skin-secondary text-skin-primary'
                      : 'bg-skin-accent text-skin-white'
                  } inline-flex items-center px-3.5 py-1.5 rounded-md text-base font-semibold`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold leading-6 text-skin-secondary">
              Evening
            </h3>
            <div className="flex flex-wrap gap-3">
              {evening.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setCheckoutSlot(date)}
                  className={`${
                    checkoutSlot === date
                      ? 'bg-skin-secondary text-skin-primary'
                      : 'bg-skin-accent text-skin-white'
                  } inline-flex items-center px-3.5 py-1.5 rounded-md text-base font-semibold`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarComp
