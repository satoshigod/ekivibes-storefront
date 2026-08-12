import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Pago from "@modules/checkout/components/payment"
import Revisión from "@modules/checkout/components/review"
import Envío from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="ekv-steps">
      <Addresses cart={cart} customer={customer} />

      <Envío cart={cart} availableEnvíoMethods={shippingMethods} />

      <Pago cart={cart} availablePagoMethods={paymentMethods} />

      <Revisión cart={cart} />
    </div>
  )
}
