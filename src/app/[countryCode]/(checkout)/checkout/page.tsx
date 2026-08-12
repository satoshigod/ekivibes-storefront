import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PagoWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutResumen from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="ekv-checkout-page">
      <div className="ekv-checkout-main">
        <PagoWrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </PagoWrapper>
      </div>
      <div className="ekv-checkout-aside">
        <CheckoutResumen cart={cart} />
      </div>
    </div>
  )
}
