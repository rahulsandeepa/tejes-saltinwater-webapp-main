import CheckoutListItem from './ListItem'

const CheckoutSelectService = ({ products, cartItems }: any) => (
  <div
    role="list"
    className="px-2 py-6 md:py-10 grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 text-sm font-medium"
  >
    {products!.map((product: any) => (
      <CheckoutListItem key={product.id} {...{ product, cartItems }} />
    ))}
  </div>
)
export default CheckoutSelectService
