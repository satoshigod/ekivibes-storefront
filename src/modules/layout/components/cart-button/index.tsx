import { retrieveCarrito } from "@lib/data/cart"
import CarritoDropdown from "../cart-dropdown"

export default async function CarritoButton() {
  const cart = await retrieveCarrito().catch(() => null)

  return <CarritoDropdown cart={cart} />
}
