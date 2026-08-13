"use client"

import { isManual, isStripeLike } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"
import { WompiPagoButton } from "./wompi-payment-button"

// `placeOrder` (server action) llama a `redirect()` de Next.js cuando el
// pedido se completa. `redirect()` funciona lanzando un error especial
// (digest que empieza con "NEXT_REDIRECT") que el framework intercepta
// para hacer la navegación real. Si ese error se captura con un simple
// `.catch()` como si fuera un error normal, Next.js nunca completa la
// redirección de inmediato — el componente vuelve a su estado normal
// (el botón "Pagar" reaparece un instante) antes de que la navegación
// termine de asentarse. Por eso el checkout "parpadea" de vuelta a la
// pantalla de pago después de un pago aprobado.
const isNextRedirectError = (err: unknown): boolean =>
  typeof (err as any)?.digest === "string" &&
  (err as any).digest.startsWith("NEXT_REDIRECT")

type PagoButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PagoButton: React.FC<PagoButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case paymentSession?.provider_id === "wompi" ||
      paymentSession?.provider_id?.includes("wompi"):
      return (
        <WompiPagoButtonWrapper
          notReady={notReady}
          cart={cart}
          session={paymentSession}
        />
      )
    case isStripeLike(paymentSession?.provider_id):
      return (
        <StripePagoButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPagoButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      return <Button disabled>Selecciona un método de pago</Button>
  }
}

const WompiPagoButtonWrapper = ({
  cart,
  notReady,
  session,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  session: any
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPagoCompletado = async () => {
    try {
      await placeOrder()
    } catch (err: any) {
      if (isNextRedirectError(err)) {
        // No es un error real: es la señal de Next.js para navegar a la
        // pantalla de confirmación. Se relanza sin tocar el estado del
        // componente para que la redirección se complete de una.
        throw err
      }
      setErrorMessage(err.message)
    }
  }

  if (notReady) {
    return <Button disabled>Realizar pedido</Button>
  }

  return (
    <>
      {/* Pasamos el cart completo para que reinitPaymentSessionWithData
          pueda acceder a payment_collection.id y payment_sessions */}
      <WompiPagoButton
        cart={cart}
        session={session}
        cartId={cart.id}
        onPagoCompletado={onPagoCompletado}
      />
      <ErrorMessage
        error={errorMessage}
        data-testid="wompi-payment-error-message"
      />
    </>
  )
}

const StripePagoButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPagoCompletado = async () => {
    try {
      await placeOrder()
      // Si placeOrder() resuelve sin redirigir (caso raro), reactivamos el botón.
      setSubmitting(false)
    } catch (err: any) {
      if (isNextRedirectError(err)) {
        throw err
      }
      setErrorMessage(err.message)
      setSubmitting(false)
    }
  }
  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePago = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent
          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPagoCompletado()
          }
          setErrorMessage(error.message || null)
          return
        }
        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPagoCompletado()
        }
        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePago}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Realizar pedido
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPagoButton = ({
  notReady,
  "data-testid": dataTestId,
}: {
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPagoCompletado = async () => {
    try {
      await placeOrder()
      // Si placeOrder() resuelve sin redirigir (caso raro), reactivamos el botón.
      setSubmitting(false)
    } catch (err: any) {
      if (isNextRedirectError(err)) {
        throw err
      }
      setErrorMessage(err.message)
      setSubmitting(false)
    }
  }

  const handlePago = () => {
    setSubmitting(true)
    onPagoCompletado()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePago}
        size="large"
        data-testid="submit-order-button"
      >
        Realizar pedido
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PagoButton
