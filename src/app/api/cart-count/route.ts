import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PRODUCT_IMAGES } from "@modules/ekivibes/product-images-data"

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
      `${backend}/store/carts/${cartId}?fields=*items,*items.product,+subtotal`,
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

    const items = rawItems.map((item: any) => {
      // Las thumbnails de Medusa apuntan a localhost:9000 y no cargan
      // en produccion: usamos las imagenes locales mapeadas por handle.
      const handle = item?.product?.handle || item?.product_handle
      const local = handle ? PRODUCT_IMAGES[handle]?.thumbnail : undefined
      const remote: string | undefined = item.thumbnail || undefined
      const usable =
        remote && !remote.includes("localhost") ? remote : local || null

      return {
        id: item.id,
        title: item.product_title || item.title,
        variant: item.variant_title || "",
        quantity: item.quantity || 0,
        unit_price: item.unit_price || 0,
        thumbnail: usable,
      }
    })

    const subtotal = json?.cart?.subtotal ?? 0

    return NextResponse.json({ count, items, subtotal })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
