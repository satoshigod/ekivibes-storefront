import { Metadata } from "next"

import { listCarritoOptions, retrieveCarrito } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { TiendaCarritoShippingOption } from "@medusajs/types"
import CarritoMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/ekivibes/footer"
import Nav from "@modules/ekivibes/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCarrito()
  let shippingOptions: TiendaCarritoShippingOption[] = []

  if (cart) {
    const { shipping_options } = await listCarritoOptions()

    shippingOptions = shipping_options
  }

  return (
    <>
      <Nav />
      {customer && cart && (
        <CarritoMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
    </>
  )
}
