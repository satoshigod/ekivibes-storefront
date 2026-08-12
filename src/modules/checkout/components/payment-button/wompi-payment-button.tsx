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

    const sessionData = session?.data
    const amountInCents = sessionData?.amount || 0  // ya viene en centavos desde Medusa
    const currency = (sessionData?.currency_code || "COP").toUpperCase()
    const reference = `${cartId}_${Date.now()}`

    // Wompi exige una firma de integridad SHA256 generada en el servidor
    let signature: string
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
    } catch (err: any) {
      setSubmitting(false)
      setErrorMessage(
        err?.message || "No se pudo iniciar el pago. Intenta de nuevo."
      )
      return
    }

    const checkout = new window.WidgetCheckout({
      currency,
      amountInCents: amountInCents,
      reference,
      publicKey: sessionData?.public_key || process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      redirectUrl: `${window.location.origin}/order/confirmed`,
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
