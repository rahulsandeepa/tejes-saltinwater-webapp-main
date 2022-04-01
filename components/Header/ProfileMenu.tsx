import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '@lib/util'
import { useRouter } from 'next/router'
import { useAuth } from '@saleor/sdk'
import { useApolloClient } from '@apollo/client'
import { useUI } from '@components/ui/context'

const userNavigation = ['Your Profile', 'Sign out']

const Profile = ({ customer }: any) => {
  const client = useApolloClient()
  const { setCheckoutToken } = useUI()
  const router = useRouter()
  const { logout } = useAuth()

  const clickHandler = async (item: string) => {
    if (item === 'Sign out') {
      await logout()
      await setCheckoutToken('')
      await client.resetStore()
      router.push('/')
    } else {
      router.push('/profile')
    }
  }
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent">
          <span className="sr-only">Open user menu</span>
          <div className="h-10 w-10 text-xl text-skin-white font-semibold font-neuton flex items-center justify-center rounded-full relative overflow-hidden uppercase bg-banner from-skin-accent to-skin-accent-thick">
            {`${customer.firstName.substr(0, 1)}${customer.lastName.substr(
              0,
              1
            )}`}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-skin-primary ring-1 ring-skin-primary-muted ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item}>
              {({ active }) => (
                <div
                  onClick={() => clickHandler(item)}
                  className={classNames(
                    active ? 'bg-skin-primary-muted' : '',
                    'block px-4 py-2 text-sm text-skin-secondary cursor-pointer'
                  )}
                >
                  {item}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Profile
