import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

/**
 * Devuelve la cantidad de unidades en el carrito.
 * El contador del header lo consume desde el cliente, para no depender
 * de la revalidacion de server components (que no se refleja en el nav).
 */
export async function GET() {
  try {
    const cookieStore = await cookies()
    const cartId = cookieStore.get("_medusa_cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ count: 0, items: [], subtotal: 0 })
    }

    const backend =
      process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
    const pk = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

    const res = await fetch(
      `${backend}/store/carts/${cartId}?fields=*items,+subtotal`,
      {
        headers: { "x-publishable-api-key": pk },
        cache: "no-store",
      }
    )

    if (!res.ok) {
      return NextResponse.json({ count: 0 })
    }

    const json = await res.json()
    const rawItems = json?.cart?.items ?? []
    const count = rawItems.reduce(
      (acc: number, item: any) => acc + (item.quantity || 0),
      0
    )

    const items = rawItems.map((item: any) => ({
      id: item.id,
      title: item.product_title || item.title,
      variant: item.variant_title || "",
      quantity: item.quantity || 0,
      unit_price: item.unit_price || 0,
      thumbnail: item.thumbnail || null,
    }))

    const subtotal = json?.cart?.subtotal ?? 0

    return NextResponse.json({ count, items, subtotal })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
