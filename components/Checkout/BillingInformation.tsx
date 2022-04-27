import { useState } from 'react'
import { Loading } from '@components/Icons/Common'
import { CountryCode } from '@saleor/api'
import { useAuthState } from '@saleor/sdk'
import { useBillingAddress } from '@lib/hooks'

function getValue(customer: any, attribute: any) {
  if (customer && customer[attribute]) {
    return customer[attribute]
  }
  return ''
}

const BillingInformation = () => {
  const { user: customer } = useAuthState()
  const updateBillingAddress = useBillingAddress()
  const [disabled, setDisabled] = useState(false)
  const [firstName, setFirstName] = useState(getValue(customer, 'firstName'))
  const [lastName, setLastName] = useState(getValue(customer, 'lastName'))
  const [companyName, setCompanyName] = useState('')
  const [streetAddress1, setStreetAddress1] = useState('')
  const [streetAddress2, setStreetAddress2] = useState('')
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [countryArea, setCountryArea] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const updateAddress = async (evt: React.SyntheticEvent<EventTarget>) => {
    evt.preventDefault()
    setLoading(true)
    const errorMessage = await updateBillingAddress({
      firstName,
      lastName,
      streetAddress1,
      city: 'NEW YORK',
      phone,
      countryArea: 'NJ',
      country: CountryCode.Us,
      postalCode: '07052',
    })
    setLoading(false)
    if (errorMessage) {
      setMessage(errorMessage)
    } else {
      setDisabled(true)
    }
  }
  
  function handleClick(e) {
    e.preventDefault();
    setDisabled(false);
    }

  return (
    <form onSubmit={updateAddress} className="px-2 py-6 md:py-10">
      <h2 className="text-lg font-medium text-skin-secondary">
        Billing information
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 text-skin-black">
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            First name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="first-name"
              name="first-name"
              autoComplete="given-name"
              disabled={disabled}
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            Last name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="last-name"
              name="last-name"
              autoComplete="family-name"
              disabled={disabled}
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            Company
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="company"
              id="company"
              disabled={disabled}
              value={companyName}
              onChange={(evt) => setCompanyName(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="address"
              id="address"
              autoComplete="street-address"
              disabled={disabled}
              value={streetAddress1}
              onChange={(evt) => setStreetAddress1(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="apartment"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            Apartment, suite, etc.
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="apartment"
              id="apartment"
              disabled={disabled}
              value={streetAddress2}
              onChange={(evt) => setStreetAddress2(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            City
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="city"
              id="city"
              autoComplete="address-level2"
              disabled={disabled}
              value={city}
              onChange={(evt) => setCity(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            Country
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="country"
              id="country"
              autoComplete="country"
              disabled={disabled}
              value={countryArea}
              onChange={(evt) => setCountryArea(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            Phone
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="phone"
              id="phone"
              autoComplete="address-level1"
              disabled={disabled}
              value={phone}
              onChange={(evt) => setPhone(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-skin-secondary-muted"
          >
            Postal code
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              autoComplete="postal-code"
              disabled={disabled}
              value={postalCode}
              onChange={(evt) => setPostalCode(evt.target.value)}
              className="block w-full border-skin-primary-muted rounded-md shadow-sm focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
            />
          </div>
        </div>
        {message && (
          <div className="col-span-2 text-center text-skin-error border border-skin-error p-3 break-all">
            {message}
          </div>
        )}
        {disabled ? (
          <button
            onClick={handleClick}
            className="col-span-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-skin-white bg-skin-accent hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent"
          >
            Edit
          </button>
        ) : (
          <button
            type="submit"
            className="col-span-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-skin-white bg-skin-accent hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent"
          >
            {loading && <Loading />}
            Save
          </button>
        )}
      </div>
    </form>
  )
}

export default BillingInformation
