"use client"

import { isManual, isStripeLike } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"
import { WompiPagoButton } from "./wompi-payment-button"

type PagoButtonProps = {
  cart: HttpTypes.TiendaCarrito
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
  cart: HttpTypes.TiendaCarrito
  notReady: boolean
  session: any
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPagoCompletado = async () => {
    await placeOrder().catch((err) => {
      setErrorMessage(err.message)
    })
  }

  if (notReady) {
    return <Button disabled>Realizar pedido</Button>
  }

  return (
    <>
      <WompiPagoButton
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
  cart: HttpTypes.TiendaCarrito
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPagoCompletado = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
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
      .confirmCardPago(session?.data.client_secret as string, {
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

const ManualTestPagoButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPagoCompletado = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
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
