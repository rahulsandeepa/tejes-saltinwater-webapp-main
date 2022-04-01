import React, { useEffect } from 'react'
import { MobileMenu, MainHeader } from '@components/Header'
import Footer from './Footer'
import { useRouter } from 'next/dist/client/router'
import { useUI } from '@components/ui/context'
import CartSlider from '@components/Header/CartSlider'
import Modal from '@components/Modal'
import FeatureBar from './FeatureBar'
import { useAcceptCookies } from '@lib/hooks'

const Layout = ({ children, pageProps: { products = [] } }: any) => {
  const router = useRouter()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { closeSidebar, closeModal, sidebarView, displayModal } = useUI()

  useEffect(() => {
    const handleStop = () => {
      closeSidebar()
      closeModal()
    }

    router.events.on('routeChangeComplete', handleStop)

    return () => {
      router.events.off('routeChangeComplete', handleStop)
    }
  }, [router])

  return (
    <>
      <div className="relative antialiased text-skin-primary selection:bg-skin-selection selection:text-skin-primary">
        {sidebarView === 'MOBILE_MENU' && <MobileMenu {...{ products }} />}

        {sidebarView === 'CART_VIEW' && <CartSlider />}
        {/* Navigation */}
        <MainHeader {...{ products }} />

        {displayModal && <Modal />}

        {children}
        <Footer />
      </div>
      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <button
            type="button"
            onClick={() => onAcceptCookies()}
            className="inline-flex items-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-skin-white bg-skin-accent hover:bg-skin-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skin-accent"
          >
            Accept cookies
          </button>
        }
      />
    </>
  )
}

export default Layout
