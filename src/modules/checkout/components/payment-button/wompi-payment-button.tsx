"use client"

import React, { useState } from "react"
import { reinitPaymentSessionWithData } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"

// `placeOrder` (server action, en @lib/data/cart) llama a `redirect()` de
// Next.js cuando el pedido se completa. `redirect()` funciona lanzando un
// error especial (digest que empieza con "NEXT_REDIRECT") que el
// framework intercepta para hacer la navegación real. Si ese error se
// captura con un `catch`/`finally` genérico como si fuera un error normal,
// Next.js no completa la redirección de inmediato — el componente vuelve
// a su estado normal (el botón "Pagar" reaparece un instante) antes de
// que la navegación termine de asentarse. Por eso el checkout "parpadea"
// de vuelta a la pantalla de pago después de un pago aprobado.
export const isNextRedirectError = (err: unknown): boolean =>
  typeof (err as any)?.digest === "string" &&
  (err as any).digest.startsWith("NEXT_REDIRECT")

interface WompiPagoButtonProps {
  cart: HttpTypes.StoreCart
  session: {
    id: string
    provider_id: string
    data: {
      amount: number
      currency_code: string
      public_key: string
      env: string
    }
  }
  cartId: string
  onPagoCompletado: () => Promise<void>
}

export const WompiPagoButton: React.FC<WompiPagoButtonProps> = ({
  cart,
  session,
  cartId,
  onPagoCompletado,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePago = async () => {
    setErrorMessage(null)

    if (!window.WidgetCheckout) {
      setErrorMessage(
        "El servicio de pagos de Wompi se está cargando. Por favor, intenta de nuevo en unos segundos."
      )
      return
    }

    setSubmitting(true)

    const countryPrefix = window.location.pathname.split("/")[1]
      ? `/${window.location.pathname.split("/")[1]}`
      : ""

    const sessionData = session?.data
    // COP en Medusa v2 viene en pesos enteros; Wompi espera centavos → ×100
    const amountInCents = Math.round((sessionData?.amount || 0) * 100)
    const currency = (sessionData?.currency_code || "COP").toUpperCase()
    // Referencia única por intento para evitar "token ya usado" en reintentos
    const unique = `${Date.now()}${Math.random().toString(36).slice(2, 8)}`
    const sessionId = session?.id || cartId
    const reference = `${sessionId}_${unique}`

    // Generar firma de integridad en servidor
    let signature: string
    let signedAmount = amountInCents
    let signedCurrency = currency
    try {
      const res = await fetch("/api/wompi/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, amountInCents, currency }),
      })
      const data = await res.json()
      if (!res.ok || !data?.signature) {
        throw new Error(data?.error || "No se pudo generar la firma de integridad")
      }
      signature = data.signature
      signedAmount = data.amountInCents
      signedCurrency = data.currency
      console.log("[Wompi] firma generada | env:", data?.debug?.secretEnv,
                  "| llave:", (sessionData?.public_key || "").slice(0, 9),
                  "| monto:", data.amountInCents, "| moneda:", data.currency)
    } catch (err: any) {
      setSubmitting(false)
      setErrorMessage(err?.message || "No se pudo iniciar el pago. Intenta de nuevo.")
      return
    }

    const checkout = new window.WidgetCheckout({
      currency: signedCurrency,
      amountInCents: signedAmount,
      reference,
      publicKey: sessionData?.public_key || process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      redirectUrl: `${window.location.origin}${countryPrefix}/order/confirmed`,
      signature: { integrity: signature },
    })

    checkout.open(async (result: any) => {
      const transaction = result?.transaction

      if (transaction?.status === "APPROVED") {
        // transaction.id es el ID de Wompi (e.g. "166198-1738363241-74381")
        const transactionId = transaction.id ?? transaction.transaction_id ?? reference

        // ── PASO 2: re-crear sesión con transaction_id para que authorizePayment lo reciba ──
        try {
          console.log("[Wompi] Paso 2 – re-inicializando sesión con transaction_id:", transactionId)
          await reinitPaymentSessionWithData(
            cart,
            session.provider_id,          // e.g. "pp_wompi_wompi"
            { transaction_id: String(transactionId) }
          )
          console.log("[Wompi] Paso 2 completado – sesión actualizada")
        } catch (reinitErr: any) {
          // Si falla el reinit, intentamos igual con completeCart.
          // El provider tiene fallback por referencia en findApprovedByReference.
          console.warn("[Wompi] Paso 2 falló – continuando con completeCart de todas formas:",
            reinitErr?.message || reinitErr)
        }

        // ── PASO 3: completar carrito SOLO después del Paso 2 ──
        try {
          console.log("[Wompi] Paso 3 – completando carrito")
          await onPagoCompletado()
          // Si onPagoCompletado() resuelve sin redirigir (caso raro), reactivamos el botón.
          setSubmitting(false)
        } catch (err: any) {
          if (isNextRedirectError(err)) {
            // No es un error real: es la señal de Next.js para navegar a
            // la pantalla de confirmación. Se deja seguir su curso sin
            // tocar el estado del botón, para que la redirección se
            // complete sin el parpadeo de vuelta a "Pagar con Wompi".
            return
          }
          setErrorMessage(
            "El pago fue aprobado por Wompi, pero hubo un problema al confirmar el pedido. Contacta a soporte."
          )
          setSubmitting(false)
        }
      } else {
        setSubmitting(false)
        if (transaction?.status === "DECLINED") {
          setErrorMessage("El pago fue rechazado. Intenta con otro medio de pago.")
        } else if (transaction?.status === "ERROR") {
          setErrorMessage("Ocurrió un error al procesar el pago con Wompi.")
        }
      }
    })
  }

  return (
    <div className="w-full flex flex-col gap-y-2">
      <button
        type="button"
        onClick={handlePago}
        disabled={submitting}
        className="w-full bg-black text-white font-medium py-3 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
      >
        {submitting ? "Procesando..." : "Pagar con Wompi (Nequi, PSE, Tarjeta)"}
      </button>

      {errorMessage && (
        <span className="text-sm text-rose-600 font-medium">{errorMessage}</span>
      )}
    </div>
  )
}
