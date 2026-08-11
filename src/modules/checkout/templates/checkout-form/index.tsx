import { listCarritoEnvíoMethods } from "@lib/data/fulfillment"
import { listCarritoPagoMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Pago from "@modules/checkout/components/payment"
import Revisión from "@modules/checkout/components/review"
import Envío from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.TiendaCarrito | null
  customer: HttpTypes.TiendaCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCarritoEnvíoMethods(cart.id)
  const paymentMethods = await listCarritoPagoMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      <Envío cart={cart} availableEnvíoMethods={shippingMethods} />

      <Pago cart={cart} availablePagoMethods={paymentMethods} />

      <Revisión cart={cart} />
    </div>
  )
}
