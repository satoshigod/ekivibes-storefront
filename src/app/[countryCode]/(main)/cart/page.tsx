import { retrieveCarrito } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CarritoTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Carrito",
  description: "View your cart",
}

export default async function Carrito() {
  const cart = await retrieveCarrito().catch((error) => {
    console.error(error)
    return notFound()
  })

  const customer = await retrieveCustomer()

  return <CarritoTemplate cart={cart} customer={customer} />
}
