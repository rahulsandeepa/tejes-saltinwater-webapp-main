import { useUI } from '@components/ui/context'
import { useCheckoutBillingAddressUpdateMutation } from '@saleor/api'

function useBillingAddress() {
  const { checkoutToken } = useUI()
  const [checkoutBillingAddressUpdate] =
    useCheckoutBillingAddressUpdateMutation({})

  const updateBillingAddress = async (address: any) => {
    let errorMessage = ''
    try {
      const { data } = await checkoutBillingAddressUpdate({
        variables: {
          address,
          token: checkoutToken,
        },
      })
      const errors = data?.checkoutBillingAddressUpdate?.errors
      if (Array.isArray(errors) && errors.length > 0) {
        errorMessage = `${(errors as any)[0].code}: ${
          (errors as any)[0].field
        }: ${(errors as any)[0].message}`
      }
    } catch (errors: any) {
      errorMessage = errors.toString()
    }
    return errorMessage
  }

  return updateBillingAddress
}

export default useBillingAddress
