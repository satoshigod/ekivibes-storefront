import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PRODUCT_IMAGES } from "@modules/ekivibes/product-images-data"

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

// Orden natural de tallas para equipamiento (no alfabetico)
const ORDEN_TALLAS = ["2XS", "XS", "S", "M", "L", "XL", "2XL"]

const ordenarTallas = (tallas: string[]) =>
  [...tallas].sort((a, b) => {
    const ia = ORDEN_TALLAS.indexOf(a)
    const ib = ORDEN_TALLAS.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  // Las imagenes de Medusa apuntan a localhost y no cargan en produccion.
  const mapped = product.handle ? PRODUCT_IMAGES[product.handle] : undefined
  const remote = product.thumbnail || undefined
  const principal =
    remote && !remote.includes("localhost")
      ? remote
      : mapped?.thumbnail || "/imgs/kbb.jpg"

  // Segunda imagen para el hover (solo si existe una distinta)
  const alterna = (mapped?.images || []).find(
    (img) => img && img !== mapped?.thumbnail
  )

  const variants = product.variants || []

  // Las tallas son el dato que mas se consulta en equipamiento de proteccion:
  // un padre necesita saber de un vistazo si hay para su hijo.
  const tallas = ordenarTallas(
    Array.from(
      new Set(
        variants
          .map((v) => v.title?.trim())
          .filter((t): t is string => !!t && t.toLowerCase() !== "default variant")
      )
    )
  )

  const agotado =
    variants.length > 0 &&
    variants.every(
      (v) =>
        v.manage_inventory &&
        !v.allow_backorder &&
        (v.inventory_quantity ?? 0) <= 0
    )

  // "Desde" solo si los precios realmente difieren entre variantes.
  // En Hit-Air todas las tallas del mismo chaleco valen igual, asi que
  // decir "Desde" sugeriria una opcion mas barata que no existe.
  const preciosDistintos =
    new Set(
      variants
        .map((v) => (v as any).calculated_price?.calculated_amount)
        .filter((p) => p !== undefined && p !== null)
    ).size > 1

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="ekv-card"
    >
      <article data-testid="product-wrapper">
        <div className="ekv-card-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="ekv-card-img"
            src={principal}
            alt={product.title}
            loading="lazy"
          />
          {alterna && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className="ekv-card-img ekv-card-img-alt"
              src={alterna}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
          )}
          {agotado && <span className="ekv-card-flag">Agotado</span>}
        </div>

        <div className="ekv-card-body">
          <h3 className="ekv-card-title" data-testid="product-title">
            {product.title}
          </h3>

          {tallas.length > 0 && (
            <ul className="ekv-card-sizes" aria-label="Tallas disponibles">
              {tallas.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}

          {cheapestPrice && (
            <p className="ekv-card-price" data-testid="price">
              {preciosDistintos && <span className="ekv-card-from">Desde </span>}
              {formatCOP(cheapestPrice.calculated_price_number)}
            </p>
          )}
        </div>
      </article>
    </LocalizedClientLink>
  )
}
