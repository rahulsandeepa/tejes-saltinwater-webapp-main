import Link from 'next/link'
import Image from 'next/image'
import { MenuIcon, PencilAltIcon, UserIcon } from '@heroicons/react/outline'
import SubHeader from './SubHeader'
import Popover from './Popover'
import CartDisplay from './CartDisplay'
import { useUI } from '@components/ui/context'
import Profile from './ProfileMenu'
import { useAuthState } from '@saleor/sdk'

const MainHeader = ({ products }: any) => {
  const { user: customer } = useAuthState()
  const { setModalView, openModal, openSidebar, setSidebarView } = useUI()

  const openMobileMenu = () => {
    openSidebar()
    setSidebarView('MOBILE_MENU')
  }

  return (
    <header className="sticky top-0 z-20">
      <nav aria-label="Top">
        <SubHeader />

        <div className="bg-skin-primary shadow-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
              <div className="hidden lg:flex-1 lg:flex lg:items-center">
                <Link href="/">
                  <a>
                    <span className="sr-only">Workflow</span>
                    <div className="mt-4 relative h-20 w-56">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src="/Logo.png"
                        alt="Salt In Water"
                      />
                    </div>
                  </a>
                </Link>
              </div>

              {/* Mobile menu and search (lg-) */}
              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 p-2  text-skin-secondary"
                  onClick={openMobileMenu}
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Logo (lg-) */}
              <Link href="/">
                <a href="#" className="lg:hidden ml-6">
                  <span className="sr-only">Workflow</span>
                  <div className="mt-4 h-16 w-48 relative">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src="/Logo.png"
                      alt="Salt In Water"
                    />
                  </div>
                </a>
              </Link>

              <div className="flex items-center space-x-6 md:space-x-10">
                <Popover {...{ products }} />
                <Link href="/blog">
                  <a
                    href="#"
                    className="hidden md:flex flex-col items-center text-sm font-medium  text-skin-secondary"
                  >
                    <PencilAltIcon className="flex-shrink-0 h-6 w-6  text-skin-secondary" />
                    Blog
                  </a>
                </Link>

                <div className="flex items-center">
                  <CartDisplay />
                </div>

                {customer && customer.email ? (
                  <Profile {...{ customer }} />
                ) : (
                  <div
                    onClick={() => {
                      openModal()
                      setModalView('LOGIN_VIEW')
                    }}
                    className="group flex flex-col items-center cursor-pointer"
                  >
                    <UserIcon
                      className="flex-shrink-0 h-6 w-6  text-skin-secondary group-hover:text-skin-secondary-hover"
                      aria-hidden="true"
                    />
                    <p className=" text-skin-secondary text-sm hidden sm:block">
                      Profile
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default MainHeader
