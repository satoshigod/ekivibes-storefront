import { retrieveCart } from "@lib/data/cart"
import CarritoDropdown from "../cart-dropdown"

export default async function CarritoButton() {
  const cart = await retrieveCart().catch(() => null)

  return <CarritoDropdown cart={cart} />
}
