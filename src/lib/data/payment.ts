"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getCartId, getCacheTag } from "./cookies"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"

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
 * Inyecta transaction_id en la sesión de pago de Wompi ANTES de completar el carrito.
 *
 * Medusa v2 Store API NO tiene PATCH/PUT para una sesión existente.
 * La única forma de pasar datos extra al provider es re-crear la sesión con
 * initiatePaymentSession (provider_id + data) — Medusa reemplaza la sesión
 * activa y el campo `data` queda disponible en authorizePayment().
 *
 * @param cart       - El objeto StoreCart completo (necesitamos payment_collection.id)
 * @param providerId - El provider id, e.g. "pp_wompi_wompi" o "wompi"
 * @param extraData  - Datos a inyectar, e.g. { transaction_id: "wompi_tx_123" }
 */
export async function reinitPaymentSessionWithData(
  cart: HttpTypes.StoreCart,
  providerId: string,
  extraData: Record<string, unknown>
): Promise<void> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  // Preservar los datos existentes de la sesión activa y añadir los nuevos
  const existingSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.provider_id === providerId || s.provider_id?.includes("wompi")
  )
  const mergedData = {
    ...(existingSession?.data as Record<string, unknown> | undefined ?? {}),
    ...extraData,
  }

  console.log("[reinitPaymentSession] provider:", providerId, "| extra:", JSON.stringify(extraData))

  await sdk.store.payment.initiatePaymentSession(
    cart,
    { provider_id: providerId, data: mergedData },
    {},
    headers
  )

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)

  console.log("[reinitPaymentSession] sesión re-creada con transaction_id OK")
}
