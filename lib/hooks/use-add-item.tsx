import { useUI } from '@components/ui/context'
import { ANONYMOUS_EMAIL } from '@lib/const'
import {
  useAddProductToCartMutation,
  useCheckoutByTokenQuery,
  useCreateCheckoutMutation,
} from '@saleor/api'
import { useRouter } from 'next/router'

function useAddItem(productVariantId: string) {
  const router = useRouter()
  const { checkoutToken, setCheckoutToken } = useUI()
  const [addProductToCart] = useAddProductToCartMutation()
  const [createCheckout] = useCreateCheckoutMutation()
  const { data: checkoutData } = useCheckoutByTokenQuery({
    variables: { checkoutToken },
    skip: !checkoutToken || !process.browser,
  })

  let addItemHandler

  // If checkout is already existing, add products
  if (!!checkoutData?.checkout) {
    let errorMessage = ''
    addItemHandler = async (navigate?: boolean) => {
      try {
        const { data: addToCartData } = await addProductToCart({
          variables: {
            checkoutToken: checkoutToken,
            variantId: productVariantId,
          },
        })
        const errors = addToCartData?.checkoutLinesAdd?.errors
        if (Array.isArray(errors) && errors.length > 0) {
          errorMessage = `${(errors as any)[0].code}: ${
            (errors as any)[0].message
          }`
        } else if (navigate) {
          router.push('/cart')
        }
      } catch (errors: any) {
        errorMessage = errors.toString()
      }
      return errorMessage
    }
  } else {
    let errorMessage = ''
    addItemHandler = async (navigate?: boolean) => {
      try {
        const { data: createCheckoutData } = await createCheckout({
          variables: {
            channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
            email: ANONYMOUS_EMAIL,
            lines: [
              {
                quantity: 1,
                variantId: productVariantId,
              },
            ],
          },
        })
        const errors = createCheckoutData?.checkoutCreate?.errors
        if (Array.isArray(errors) && errors.length > 0) {
          errorMessage = `${(errors as any)[0].code}: ${
            (errors as any)[0].message
          }`
        } else if (createCheckoutData?.checkoutCreate?.checkout?.token) {
          setCheckoutToken(createCheckoutData?.checkoutCreate?.checkout?.token)
          if (navigate) router.push('/cart')
        }
      } catch (errors: any) {
        errorMessage = errors.toString()
      }
      return errorMessage
    }
  }

  return addItemHandler
}

export default useAddItem
