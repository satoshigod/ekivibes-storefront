import { initiatePaymentSession, placeOrder, retrieveCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ id?: string; env?: string }>
}

/**
 * Página de retorno de Wompi.
 *
 * Cuando el cliente paga con PSE, Nequi o cualquier medio que lo saca del
 * sitio, Wompi lo devuelve aquí con ?id=<transaccion>. En ese flujo el
 * callback del widget nunca corre, así que hay que verificar la transacción
 * y completar el carrito desde el servidor.
 */
export default async function WompiReturnPage({ params, searchParams }: Props) {
  const { countryCode } = await params
  const { id: transactionId } = await searchParams

  let status: string | null = null
  let errorMsg: string | null = null
  let cartId: string | null = null

  if (transactionId) {
    const wompiEnv = (process.env.NEXT_PUBLIC_WOMPI_ENV || "test").toLowerCase()
    const apiBase =
      wompiEnv === "prod" || wompiEnv === "production"
        ? "https://production.wompi.co"
        : "https://sandbox.wompi.co"

    try {
      const res = await fetch(`${apiBase}/v1/transactions/${transactionId}`, {
        cache: "no-store",
      })
      const json = await res.json()
      status = json?.data?.status ?? null
      // La referencia tiene el formato cart_<id>_<sufijoUnico>.
      // De ahi sacamos el carrito: la cookie no llega en el redirect
      // porque venimos de un dominio externo (Wompi).
      const reference: string = json?.data?.reference ?? ""
      const match = reference.match(/^(cart_[A-Za-z0-9]+)_/)
      cartId = match ? match[1] : reference || null
    } catch (e: any) {
      errorMsg = "No se pudo verificar el pago con Wompi."
    }
  } else {
    errorMsg = "No se recibió el identificador de la transacción."
  }

  // Si el pago fue aprobado, completamos el carrito.
  // placeOrder() hace su propio redirect a /[cc]/order/[id]/confirmed.
  // OJO: en Next.js redirect() lanza una excepcion especial (NEXT_REDIRECT)
  // que NO debe ser atrapada, hay que relanzarla.
  if (status === "APPROVED") {
    try {
      // El provider solo autoriza la sesion si recibe wompi_status APPROVED.
      // En el flujo de redirect ese dato nunca llego, asi que reinicializamos
      // la sesion de pago con el resultado ya confirmado por Wompi.
      if (cartId) {
        const cart = await retrieveCart(
          cartId,
          "*payment_collection,*payment_collection.payment_sessions"
        )
        const providerId =
          (cart as any)?.payment_collection?.payment_sessions?.[0]?.provider_id

        if (cart && providerId) {
          await initiatePaymentSession(cart as any, {
            provider_id: providerId,
            data: {
              wompi_status: "APPROVED",
              transaction_id: transactionId,
            },
          } as any)
        }
      }

      await placeOrder(cartId || undefined)
    } catch (e: any) {
      const digest = typeof e?.digest === "string" ? e.digest : ""
      if (digest.startsWith("NEXT_REDIRECT")) {
        throw e // redirect legitimo, dejarlo pasar
      }
      console.error("[wompi-return] placeOrder fallo:", e?.message || e)
      errorMsg =
        "Tu pago fue aprobado, pero no pudimos generar el pedido automáticamente. " +
        "Guarda este número de transacción y contáctanos: " +
        (transactionId || "")
    }
  }

  const aprobadoPeroSinOrden = status === "APPROVED" && !errorMsg
  const rechazado = status === "DECLINED" || status === "ERROR"
  const pendiente = status === "PENDING"

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 py-24 px-6 text-center">
      {pendiente && (
        <>
          <h1 className="text-2xl font-semibold">Pago en proceso</h1>
          <p className="text-ui-fg-subtle max-w-md">
            Tu pago está siendo procesado por Wompi. Apenas se confirme
            recibirás el correo con el detalle de tu pedido.
          </p>
        </>
      )}

      {rechazado && (
        <>
          <h1 className="text-2xl font-semibold">El pago no se completó</h1>
          <p className="text-ui-fg-subtle max-w-md">
            La transacción fue rechazada. No se realizó ningún cobro. Puedes
            intentar con otro medio de pago.
          </p>
          <LocalizedClientLink href="/cart" className="text-ui-fg-interactive">
            Volver al carrito
          </LocalizedClientLink>
        </>
      )}

      {(errorMsg || (!status && !errorMsg)) && (
        <>
          <h1 className="text-2xl font-semibold">No pudimos verificar el pago</h1>
          <p className="text-ui-fg-subtle max-w-md">
            {errorMsg || "Intenta de nuevo en unos minutos."} Si el dinero fue
            debitado, escríbenos y lo revisamos.
          </p>
          <LocalizedClientLink href="/cart" className="text-ui-fg-interactive">
            Volver al carrito
          </LocalizedClientLink>
        </>
      )}

      {aprobadoPeroSinOrden && (
        <>
          <h1 className="text-2xl font-semibold">Pago aprobado</h1>
          <p className="text-ui-fg-subtle max-w-md">
            Tu pago fue aprobado. Estamos generando tu pedido.
          </p>
        </>
      )}
    </div>
  )
}
