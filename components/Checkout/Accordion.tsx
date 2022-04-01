import { motion, AnimatePresence } from 'framer-motion'
import CheckoutContact from './ContactInformation'
import CheckoutSelectService from './CheckoutSelectService'
import CheckoutCalendar from './CheckoutCalendar'
import CheckoutBilling from './BillingInformation'
import { ACCORDION_TABS, useUI } from '@components/ui/context'
import { ACCORDION_IDS, LABEL_MAPPINGS } from '@lib/const'

const COMPONENT_MAPPINGS: { [key in ACCORDION_TABS]: any } = {
  CONTACT_INFO: CheckoutContact,
  SELECT_PRODUCTS: CheckoutSelectService,
  DATE_AND_SLOT: CheckoutCalendar,
  BILLING_INFO: CheckoutBilling,
}

const Accordion = ({
  tabKey,
  expanded,
  setExpanded,
  products,
  customer,
  cartItems,
}: any) => {
  const isOpen = tabKey === expanded
  const Component: any = COMPONENT_MAPPINGS[tabKey as ACCORDION_TABS]

  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? '#EC4899' : '#0EA5E9' }}
        onClick={() => setExpanded(tabKey)}
        className={`${
          isOpen ? '' : 'mb-5'
        } flex items-center px-4 rounded-xl h-10 text-skin-white cursor-pointer`}
      >
        <p className="font-bold">{(LABEL_MAPPINGS as any)[tabKey]}</p>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Component {...{ customer, products, cartItems }} />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

const Container = ({ products, customer, cartItems }: any) => {
  const { accordionTab, setAccordionTab } = useUI()

  return (
    <div className="lg:py-2 lg:col-span-1 xl:col-span-3">
      {ACCORDION_IDS.map((tabKey) => (
        <Accordion
          key={tabKey}
          tabKey={tabKey}
          expanded={accordionTab}
          setExpanded={setAccordionTab}
          {...{ products, customer, cartItems }}
        />
      ))}
    </div>
  )
}

export default Container
