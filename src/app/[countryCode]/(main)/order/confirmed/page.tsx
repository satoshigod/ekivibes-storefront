import { placeOrder } from "@lib/data/cart"
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
    } catch (e: any) {
      errorMsg = "No se pudo verificar el pago con Wompi."
    }
  } else {
    errorMsg = "No se recibió el identificador de la transacción."
  }

  // Si el pago fue aprobado, completamos el carrito.
  // placeOrder() hace su propio redirect a /[cc]/order/[id]/confirmed,
  // por eso no va dentro de un try/catch que atrape el redirect de Next.
  if (status === "APPROVED") {
    await placeOrder()
  }

  const aprobadoPeroSinOrden = status === "APPROVED"
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
