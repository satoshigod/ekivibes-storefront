"use server"

import { HttpTypes } from "@medusajs/types"
import { listProducts } from "./products"

// Extraccion/filtrado de productos por marca (metadata.brand).
// Soporta la arquitectura multi-tienda Ekivibes / Hit-Air Colombia.
const BRAND_KEY = "brand"

const brandOf = (p: HttpTypes.StoreProduct): string | undefined =>
  (p.metadata?.[BRAND_KEY] as string | undefined)?.toString()

const filterByBrand = (
  products: HttpTypes.StoreProduct[],
  brand: string
): HttpTypes.StoreProduct[] =>
  products.filter((p) => brandOf(p)?.toLowerCase() === brand.toLowerCase())

// Solo productos Hit-Air (chalecos airbag, cartuchos CO2, repuestos).
export const getHitAirProducts = async ({
  countryCode,
  limit = 100,
}: {
  countryCode: string
  limit?: number
}): Promise<HttpTypes.StoreProduct[]> => {
  const { response } = await listProducts({ countryCode, queryParams: { limit } })
  return filterByBrand(response.products, "Hit-Air")
}

// Catalogo de Ekivibes. Si el despliegue esta acotado a una marca
// (NEXT_PUBLIC_BRAND_FILTER, ej. Hit-Air Colombia) se respeta ese filtro;
// de lo contrario devuelve el catalogo completo.
export const getEkivibesProducts = async ({
  countryCode,
  limit = 100,
}: {
  countryCode: string
  limit?: number
}): Promise<HttpTypes.StoreProduct[]> => {
  const { response } = await listProducts({ countryCode, queryParams: { limit } })
  const brand = process.env.NEXT_PUBLIC_BRAND_FILTER
  return brand ? filterByBrand(response.products, brand) : response.products
}
