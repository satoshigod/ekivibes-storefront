"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getCartId } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const listCartPaymentMethods = async (regionId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("payment_providers")),
  }

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        method: "GET",
        query: { region_id: regionId },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ payment_providers }) =>
      payment_providers.sort((a, b) => {
        return a.id > b.id ? 1 : -1
      })
    )
    .catch(() => {
      return null
    })
}

/**
 * Actualiza la sesión de pago activa con datos adicionales del proveedor.
 * Para Wompi: se llama con { transaction_id } ANTES de completar el carrito.
 */
export async function updatePaymentSession(
  paymentCollectionId: string,
  paymentSessionId: string,
  data: Record<string, unknown>
) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch(
      `/store/payment-collections/${paymentCollectionId}/payment-sessions/${paymentSessionId}`,
      {
        method: "POST",
        headers,
        body: { data },
      }
    )
    .catch((err) => {
      console.error("[updatePaymentSession] error:", err?.message || err)
      throw err
    })
}
