import { useState } from 'react'
import { useUI } from '@components/ui/context'
import { Loading } from '@components/Icons/Common'
import { useAuth } from '@saleor/sdk'

const LoginModal = () => {
  const { setModalView, closeModal } = useUI()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { login } = useAuth()

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    setLoading(true)
    const { data } = await login({
      email,
      password,
    })
    setLoading(false)
    if (data?.tokenCreate?.errors[0]) {
      // Unable to sign in.
      setMessage((data?.tokenCreate?.errors as any)[0].message)
    } else {
      closeModal()
    }
  }

  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="pb-6 px-4 sm:rounded-lg sm:px-10">
        {message && (
          <div className="text-skin-error border border-skin-error mb-6 p-3">
            {message}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
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

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-skin-white bg-skin-accent hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent"
            >
              {loading && <Loading />}
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-skin-secondary-muted text-center">
          {"Don't have an account? "}
          <button
            onClick={() => setModalView('SIGNUP_VIEW')}
            className="font-medium text-skin-accent hover:text-skin-accent cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginModal
