import { useState } from 'react'
import { Loading } from '@components/Icons/Common'
import { useUI } from '@components/ui/context'
import {
  useCheckoutComplete,
  useCheckoutPayment,
  useOrderValidation,
  useApplyVoucher,
  useRemoveVoucher,
} from '@lib/hooks'
import CheckoutCartItem from './CartItem'

const OrderSummary = ({ data, token, cartItems }: any) => {
  const { checkoutDate, checkoutSlot } = useUI()
  const [message, setMessage] = useState('')
  const [couponCode, setCoupon] = useState('')
  const [loading, setLoading] = useState(false)
  const [voucherLoading, setVoucherLoading] = useState(false)
  const [removeVoucherLoading, setRemoveVoucherLoading] = useState(false)
  const [validationHandler, validationError]: any = useOrderValidation()
  const applyVoucher = useApplyVoucher()
  const removeVoucher = useRemoveVoucher()
  const completeCheckoutHandler = useCheckoutComplete(token)
  const completePayment = useCheckoutPayment(token, data)

  const completeCheckout = async () => {
    setMessage('')
    if (validationError) {
      validationHandler()
      setMessage(validationError)
      return
    }

    setLoading(true)
    const paymentError = await completePayment()
    if (paymentError) {
      setLoading(false)
      setMessage(paymentError)
    }

    const [successHandler, orderError]: any = await completeCheckoutHandler()
    setLoading(false)
    if (orderError) {
      setMessage(orderError)
    } else {
      successHandler()
    }
  }

  const addVoucherCode = async () => {
    setVoucherLoading(true)
    setMessage('')
    const voucherError = await applyVoucher(couponCode)
    setVoucherLoading(false)
    if (voucherError) {
      setMessage(voucherError)
    } else {
      setCoupon('')
    }
  }

  const removeVoucherCode = async (couponCodeVoucher: string) => {
    setRemoveVoucherLoading(true)
    setMessage('')
    const voucherError = await removeVoucher(couponCodeVoucher)
    setRemoveVoucherLoading(false)
    if (voucherError) {
      setMessage(voucherError)
    } else {
      setCoupon('')
    }
  }

  return (
    <div className="lg:py-2 mt-10 lg:mt-0 lg:col-span-1 xl:col-span-2">
      <h2 className="text-lg font-medium text-skin-secondary">Order summary</h2>

      <div className="mt-4 bg-skin-primary-thick border border-skin-primary-muted rounded-lg shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul role="list" className="divide-y divide-skin-primary-muted">
          {cartItems.map((line: any) => (
            <CheckoutCartItem key={line?.id || ''} {...{ line }} />
          ))}
        </ul>
        <dl className="text-skin-secondary border-t border-skin-primary-muted py-6 px-4 space-y-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium text-skin-secondary">
              {data?.checkout?.subtotalPrice?.net.localizedAmount}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Taxes</dt>
            <dd className="text-sm font-medium text-skin-secondary">
              {data?.checkout?.subtotalPrice?.tax.localizedAmount}
            </dd>
          </div>
          {data?.checkout?.voucherCode && (
            <div className="flex items-center justify-between">
              <dt className="text-sm">
                Discount
                <span className="ml-3 inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-skin-accent-light text-skin-accent-thick">
                  {data?.checkout?.voucherCode}
                  {removeVoucherLoading ? (
                    <div className="ml-2">
                      <Loading />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeVoucherCode(data?.checkout?.voucherCode)}
                      className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-skin-accent-thick focus:outline-none focus:bg-skin-accent focus:text-white"
                    >
                      <span className="sr-only">Remove large option</span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  )}
                </span>
              </dt>
              <dd className="text-sm font-medium text-skin-secondary">
                -{data?.checkout?.discount?.localizedAmount}
              </dd>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-skin-primary-muted pt-6">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium text-skin-secondary">
              {data?.checkout?.totalPrice?.gross.localizedAmount}
            </dd>
          </div>
        </dl>
        {checkoutDate != '' && checkoutSlot != '' && (
          <div className="border-t border-skin-primary-muted flex items-center justify-between text-skin-secondary py-6 px-4 sm:px-6">
            <dt className="text-base font-medium">Order Timings</dt>
            <dd className="text-base font-medium">
              {`${new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'medium',
              }).format(checkoutDate)}, ${checkoutSlot}`}
            </dd>
          </div>
        )}

        <div className="px-6 my-3 sm:flex">
          <label htmlFor="couponCode" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="couponCode"
            id="couponCode"
            value={couponCode}
            onChange={(evt) => setCoupon(evt.target.value)}
            className="block w-full py-3 text-base text-skin-black rounded-md placeholder-skin-secondary-muted shadow-sm focus:ring-skin-accent-thick focus:border-skin-accent-thring-skin-accent-thick sm:flex-1 border-gray-300"
            placeholder="Enter Coupon Code"
          />
          <button
            onClick={addVoucherCode}
            className="mt-3 w-full px-6 py-3 text-base font-medium rounded-md text-white bg-skin-secondary shadow-sm hover:bg-skin-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
          >
            {voucherLoading && <Loading />}
            Apply Coupon
          </button>
        </div>

        {message && (
          <div className="col-span-2 text-center text-skin-error border border-skin-error p-3 break-all m-4 sm:m-6">
            {message}
          </div>
        )}

        <div className="border-t border-skin-primary-muted py-6 px-4 sm:px-6">
          <button
            onClick={completeCheckout}
            className="w-full inline-flex justify-center bg-skin-accent rounded-md shadow-sm py-3 px-4 text-base font-medium text-skin-white hover:bg-skin-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-skin-accent-hover focus:ring-skin-accent"
          >
            {loading && <Loading />}
            Confirm order
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
