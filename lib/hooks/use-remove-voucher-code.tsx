import { useUI } from '@components/ui/context'
import { useCheckoutRemovePromoCodeMutation } from '@saleor/api'

function useApplyVoucher() {
  const { checkoutToken } = useUI()
  const [removePromoCode] = useCheckoutRemovePromoCodeMutation()
  let removeCouponHandler = async (promoCode: string): Promise<string> => {
    let errorMessage = ''
    try {
      const { data } = await removePromoCode({
        variables: {
          checkoutToken: checkoutToken,
          promoCode: promoCode,
        },
      })
      const errors = data?.checkoutRemovePromoCode?.errors
      if (Array.isArray(errors) && errors.length > 0) {
        errorMessage = `${(errors as any)[0].message}`
      }
    } catch (errors: any) {
      errorMessage = errors.toString()
    }
    return errorMessage
  }
  return removeCouponHandler
}

export default useApplyVoucher
