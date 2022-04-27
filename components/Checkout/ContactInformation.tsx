import React, { useEffect, useState } from 'react'
import { Loading } from '@components/Icons/Common'
import {
  useCheckoutByTokenQuery,
  useCheckoutEmailUpdateMutation,
} from '@saleor/api'
import { useUI } from '@components/ui/context'

function getEmail(customer: any, checkoutData: any) {
  if (customer && customer.email) {
    return customer.email
  }
  if (checkoutData && checkoutData.checkout && checkoutData.checkout.email) {
    return checkoutData.checkout.email
  }
  return ''
}

const ContactInformation = ({ customer }: any) => {
  const { checkoutToken } = useUI()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState('')
  const { data: checkoutData } = useCheckoutByTokenQuery({
    variables: { checkoutToken },
    skip: !checkoutToken || !process.browser,
  })
  const [email, setEmail] = useState(getEmail(customer, checkoutData))
  const [emailUpdate] = useCheckoutEmailUpdateMutation()

  useEffect(() => {
    if (customer && customer.email) {
      setEmail(customer.email)
      setDisabled(true)
    }
  }, [customer])

  const attachEmailAddress = async (evt: React.SyntheticEvent<EventTarget>) => {
    evt.preventDefault()
    setLoading(true)
    const { data: attachEmailData } = await emailUpdate({
      variables: {
        token: checkoutToken,
        email,
      },
    })
    setLoading(false)
    const errors = attachEmailData?.checkoutEmailUpdate?.errors
    if (Array.isArray(errors) && errors.length > 0) {
      setMessage(`${(errors as any)[0].code}: ${(errors as any)[0].message}`)
    } else {
      setDisabled(true)
      setMessage('')
    }
  }

  function handleClick(e) {
    e.preventDefault();
    setDisabled(false);
    }
  return (
    <form onSubmit={attachEmailAddress} className="px-2 py-6 md:py-10">
      <div className="bg-skin-primary-muted rounded-lg p-6 flex items-center sm:p-10">
        <div className="max-w-sm mx-auto">
          <h3 className="font-semibold text-skin-secondary">
            Enter your email address
          </h3>
          <p className="mt-2 text-sm text-skin-secondary-muted">
            The contact information will be used while creating this order
          </p>
          {message && (
            <div className="text-skin-error border border-skin-error mt-3 p-3 break-all">
              {message}
            </div>
          )}
          <div className="mt-4 sm:mt-6 sm:flex">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="text"
              autoComplete="email"
              required
              value={email}
              disabled={disabled}
              onChange={(evt) => setEmail(evt.target.value)}
              className="appearance-none min-w-0 w-full bg-skin-white text-skin-black border border-skin-secondary-muted rounded-md disabled:bg-skin-primary-muted disabled:text-skin-secondary-muted shadow-sm py-2 px-4 placeholder-skin-secondary-muted focus:outline-none focus:border-skin-accent focus:ring-1 focus:ring-skin-accent"
            />
            <div className="mt-3 sm:flex-shrink-0 sm:mt-0 sm:ml-4">
              {disabled ? (
                <button
                 onClick={handleClick}
                  className="w-full bg-skin-accent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-skin-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-skin-accent"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-skin-accent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-skin-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-skin-accent"
                >
                  {loading && <Loading />}
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ContactInformation
