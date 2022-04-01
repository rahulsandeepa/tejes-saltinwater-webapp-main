import { useUI } from '@components/ui/context'
import { ANONYMOUS_EMAIL } from '@lib/const'
import { useCheckoutByTokenQuery } from '@saleor/api'

function useOrderValidation() {
  const { checkoutToken, checkoutDate, checkoutSlot, setAccordionTab } = useUI()
  const { data: checkoutData } = useCheckoutByTokenQuery({
    variables: { checkoutToken },
    skip: !checkoutToken || !process.browser,
  })
  if (checkoutData && checkoutData.checkout?.email === ANONYMOUS_EMAIL) {
    return [
      () => setAccordionTab('CONTACT_INFO'),
      'Please enter a valid email address',
    ]
  }
  if (!checkoutDate || !checkoutSlot) {
    return [
      () => setAccordionTab('DATE_AND_SLOT'),
      'Please select checkout date & time slot',
    ]
  }
  return [null, '']
}

export default useOrderValidation
