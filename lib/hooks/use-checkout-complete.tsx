import { useUI } from '@components/ui/context'
import { useCheckoutCompleteMutation } from '@saleor/api'
import { useRouter } from 'next/router'

function useCheckoutComplete(token: string) {
  const router = useRouter()
  const { setCheckoutToken } = useUI()
  const [checkoutCompleteMutation] = useCheckoutCompleteMutation()

  const orderSuccessHandler = (order: any) => () => {
    setCheckoutToken(null)

    // redirect to the order details page
    if (order) {
      router.push({
        pathname: '/order/[token]',
        query: { token: order.toString() },
      })
    }
  }

  const completeCheckout = async () => {
    let errorMessage = ''
    try {
      const { data: completeData } = await checkoutCompleteMutation({
        variables: {
          checkoutToken: token,
        },
      })
      const errors = completeData?.checkoutComplete?.errors
      if (Array.isArray(errors) && errors.length > 0) {
        errorMessage = `${(errors as any)[0].code}: ${
          (errors as any)[0].message
        }`
      } else if (completeData?.checkoutComplete?.order) {
        return [orderSuccessHandler(completeData?.checkoutComplete?.order), '']
      }
    } catch (errors: any) {
      errorMessage = errors.toString()
    }
    return [null, errorMessage]
  }
  return completeCheckout
}

export default useCheckoutComplete
