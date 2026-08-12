"use client"

import React, { useState } from "react"

interface WompiPagoButtonProps {
  session: {
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

    // La app usa rutas con prefijo de pais (/co/...)
    const countryPrefix = window.location.pathname.split("/")[1]
      ? `/${window.location.pathname.split("/")[1]}`
      : ""

    const sessionData = session?.data
    // El peso colombiano NO tiene decimales en Medusa v2: amount viene en
    // pesos (1750000 = $1.750.000). Wompi espera centavos, asi que x100.
    // Sin esto Wompi cobraba $17.500 en vez de $1.750.000.
    const amountInCents = Math.round((sessionData?.amount || 0) * 100)
    const currency = (sessionData?.currency_code || "COP").toUpperCase()
    // Referencia unica por intento: Wompi rechaza reusar una referencia
    // ("El token de aceptacion ya fue usado") si se reintenta el pago.
    const unique = `${Date.now()}${Math.random().toString(36).slice(2, 8)}`
    // La referencia empieza con el session_id porque es el unico dato que
    // el backend tiene garantizado al autorizar el pago (Medusa no le pasa
    // el cart_id al provider). Asi puede buscar la transaccion en Wompi.
    const sessionId = session?.id || cartId
    const reference = `${sessionId}_${unique}`

    // Wompi exige una firma de integridad SHA256 generada en el servidor
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
      // Diagnostico: el ambiente del secreto debe coincidir con el de la llave publica
      console.log("[Wompi] ambiente del secreto:", data?.debug?.secretEnv,
                  "| llave publica:", (sessionData?.public_key || "").slice(0, 9),
                  "| monto firmado:", data.amountInCents,
                  "| moneda:", data.currency)
    } catch (err: any) {
      setSubmitting(false)
      setErrorMessage(
        err?.message || "No se pudo iniciar el pago. Intenta de nuevo."
      )
      return
    }

    const checkout = new window.WidgetCheckout({
      currency: signedCurrency,
      amountInCents: signedAmount,
      reference,
      publicKey: sessionData?.public_key || process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      // Fallback para medios que sacan al usuario del sitio (PSE, Nequi).
      // La orden se crea en onPagoCompletado(), que redirige a la
      // confirmacion con el ID real. Aqui solo volvemos al checkout.
      redirectUrl: `${window.location.origin}${countryPrefix}/order/confirmed`,
      signature: { integrity: signature },
    })

    checkout.open(async (result: any) => {
      const transaction = result?.transaction

      if (transaction?.status === "APPROVED") {
        try {
          await onPagoCompletado()
        } catch (err: any) {
          setErrorMessage(
            "El pago fue aprobado por Wompi, pero hubo un problema al confirmar el pedido. Contactoa a soporte."
          )
        } finally {
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
