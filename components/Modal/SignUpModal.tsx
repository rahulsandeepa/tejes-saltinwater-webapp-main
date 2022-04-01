import { useState } from 'react'
import { Loading } from '@components/Icons/Common'
import { useUI } from '@components/ui/context'
import { useAuth } from '@saleor/sdk'

const SignUpModal = () => {
  const { register } = useAuth()
  const { closeModal, setModalView } = useUI()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')
    const { data } = await register({
      email,
      password,
      redirectUrl: `${window.location.host})/account/confirm`,
    })
    if (data?.accountRegister?.errors.length) {
      setMessage((data?.accountRegister?.errors as any)[0].message)
    } else {
      closeModal()
    }
    setLoading(false)
  }

  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="pb-6 px-4 sm:rounded-lg sm:px-10">
        {message && (
          <div className="text-skin-error border border-skin-error mb-6 p-3">
            {message}
          </div>
        )}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-skin-secondary-muted"
            >
              First Name
            </label>
            <div className="mt-1">
              <input
                id="firstName"
                name="firstName"
                type="firstName"
                autoComplete="firstName"
                required
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-skin-primary-muted rounded-md shadow-sm placeholder-skin-primary-muted focus:outline-none focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-skin-secondary-muted"
            >
              Last Name
            </label>
            <div className="mt-1">
              <input
                id="lastName"
                name="lastName"
                type="lastName"
                autoComplete="lastName"
                required
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-skin-primary-muted rounded-md shadow-sm placeholder-skin-primary-muted focus:outline-none focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-skin-secondary-muted"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-skin-primary-muted rounded-md shadow-sm placeholder-skin-primary-muted focus:outline-none focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-skin-secondary-muted"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-skin-primary-muted rounded-md shadow-sm placeholder-skin-primary-muted focus:outline-none focus:ring-skin-accent focus:border-skin-accent sm:text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-skin-white bg-skin-accent hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent"
            >
              {loading && <Loading />}
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-2 text-sm text-skin-secondary-muted text-center">
          {'Do you have an account? '}
          <a
            onClick={() => setModalView('LOGIN_VIEW')}
            className="font-medium text-skin-accent hover:text-skin-accent cursor-pointer"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUpModal
