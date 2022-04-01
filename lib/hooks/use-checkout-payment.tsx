import { useCheckoutPaymentCreateMutation } from '@saleor/api'

const DUMMY_CREDIT_CARD_GATEWAY = 'mirumee.payments.dummy'

function useCheckoutPayment(token: any, data: any) {
  const [checkoutPaymentMutation] = useCheckoutPaymentCreateMutation()

  const completePayment = async () => {
    let errorMessage = ''
    try {
      const { data: paymentCreateData } = await checkoutPaymentMutation({
        variables: {
          checkoutToken: token,
          paymentInput: {
            gateway: DUMMY_CREDIT_CARD_GATEWAY,
            amount: (data as any).checkout.totalPrice?.gross.amount,
            token: '1234-1234-1234',
          },
        },
      })
      const paymentErrors = paymentCreateData?.checkoutPaymentCreate?.errors
      if (Array.isArray(paymentErrors) && paymentErrors.length > 0) {
        errorMessage = `${(paymentErrors as any)[0].code}: ${
          (paymentErrors as any)[0].message
        }`
      }
    } catch (err: any) {
      errorMessage = err.toString()
    }
    return errorMessage
  }

  return completePayment
}

export default useCheckoutPayment
