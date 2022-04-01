import OrderEntry from './OrderEntry'

export default function OrderHistory({ orders }: any) {
  const orderResults = Array.isArray(orders) ? orders : []
  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto lg:max-w-4xl">
          <h1 className="text-2xl font-neuton font-extrabold tracking-tight text-skin-secondary sm:text-3xl">
            Order history
          </h1>
          <p className="mt-2 text-base text-skin-secondary-muted">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="sr-only">Recent orders</h2>
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
          {orderResults.length === 0 ? (
            <div className="max-w-2xl mx-auto lg:max-w-4xl py-32 border border-skin-secondary">
              <p className="text-center text-xl font-bold font-neuton text-skin-secondary">
                No Orders found
              </p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orderResults.map((order) => (
                <OrderEntry key={order.number} {...{ order }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
