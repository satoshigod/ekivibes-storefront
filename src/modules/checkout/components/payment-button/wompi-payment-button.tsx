"use client"

import React, { useState } from "react"

interface WompiPaymentButtonProps {
  session: {
    data: {
      amount: number
      currency_code: string
      public_key: string
      env: string
    }
  }
  cartId: string
  onPaymentCompleted: () => Promise<void>
}

export const WompiPaymentButton: React.FC<WompiPaymentButtonProps> = ({
  session,
  cartId,
  onPaymentCompleted,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = () => {
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

    const checkout = new window.WidgetCheckout({
      currency: (sessionData?.currency_code || "COP").toUpperCase(),
      amountInCents: amountInCents,
      reference: `${cartId}_${Date.now()}`,
      publicKey: sessionData?.public_key || process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      redirectUrl: `${window.location.origin}/order/confirmed`,
    })

    checkout.open(async (result: any) => {
      const transaction = result?.transaction

      if (transaction?.status === "APPROVED") {
        try {
          await onPaymentCompleted()
        } catch (err: any) {
          setErrorMessage(
            "El pago fue aprobado por Wompi, pero hubo un problema al confirmar el pedido. Contacta a soporte."
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
        onClick={handlePayment}
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
