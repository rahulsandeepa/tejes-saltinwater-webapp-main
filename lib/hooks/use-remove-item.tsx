import { useUI } from '@components/ui/context'
import { useRemoveProductFromCheckoutMutation } from '@saleor/api'

function useRemoveItem(lineID: any) {
  const [removeProductFromCheckout] = useRemoveProductFromCheckoutMutation()
  const { checkoutToken } = useUI()
  const removeItem = async (): Promise<string> => {
    let errorMessage = ''
    try {
      const data = await removeProductFromCheckout({
        variables: {
          checkoutToken: checkoutToken,
          lineId: lineID,
        },
      })
      if (data.errors) {
        errorMessage = `${(data.errors as any)[0].code}: ${
          (data.errors as any)[0].message
        }`
      }
    } catch (errors: any) {
      errorMessage = errors.toString()
    }
    return errorMessage
  }
  return removeItem
}

export default useRemoveItem
