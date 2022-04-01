import React from 'react'
import { ShoppingBagIcon } from '@heroicons/react/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useUI } from '@components/ui/context'
import { useCheckoutByTokenQuery } from '@saleor/api'

const CartDisplay = () => {
  const { openSidebar, setSidebarView, checkoutToken } = useUI()
  const { data } = useCheckoutByTokenQuery({
    variables: { checkoutToken: checkoutToken },
    skip: !process.browser,
  })

  const openCartSlider = () => {
    openSidebar()
    setSidebarView('CART_VIEW')
  }

  const itemsCount = (data?.checkout?.lines || []).length
  return (
    <div
      onClick={openCartSlider}
      className="cursor-pointer group rounded-md flex flex-col items-center relative"
    >
      <ShoppingBagIcon
        className="flex-shrink-0 h-6 w-6  text-skin-secondary"
        aria-hidden="true"
      />
      <p className="hidden sm:block  text-skin-secondary text-sm">Cart</p>
      {itemsCount > 0 && (
        <AnimatePresence>
          <motion.span
            key={itemsCount}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.72,
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
            className="bottom-3 md:bottom-6 left-3 md:left-4 text-base font-bold bg-skin-accent text-skin-primary absolute rounded-full px-2"
          >
            {itemsCount}
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  )
}

export default CartDisplay
