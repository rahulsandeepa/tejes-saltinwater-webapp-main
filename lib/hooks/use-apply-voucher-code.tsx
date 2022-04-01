import { useUI } from '@components/ui/context'
import { useCheckoutAddPromoCodeMutation } from '@saleor/api'

function useApplyVoucher() {
  const { checkoutToken } = useUI()
  const [addPromoCode] = useCheckoutAddPromoCodeMutation()
  let addCouponHandler = async (promoCode: string): Promise<string> => {
    let errorMessage = ''
    try {
      const { data } = await addPromoCode({
        variables: {
          checkoutToken: checkoutToken,
          promoCode: promoCode,
        },
      })
      const errors = data?.checkoutAddPromoCode?.errors
      if (Array.isArray(errors) && errors.length > 0) {
        errorMessage = `${(errors as any)[0].message}`
      }
    } catch (errors: any) {
      errorMessage = errors.toString()
    }
    return errorMessage
  }
  return addCouponHandler
}

export default useApplyVoucher
