import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PRODUCT_IMAGES } from "@modules/ekivibes/product-images-data"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Las imagenes de Medusa apuntan a localhost y no cargan en produccion:
  // usamos las locales mapeadas por handle.
  const local = product.handle
    ? PRODUCT_IMAGES[product.handle]?.thumbnail
    : undefined
  const remote = product.thumbnail || undefined
  const src =
    remote && !remote.includes("localhost") ? remote : local || "/imgs/kbb.jpg"

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="ekv-card group"
    >
      <div data-testid="product-wrapper">
        <div className="ekv-card-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={product.title} loading="lazy" />
        </div>
        <div className="ekv-card-body">
          <p className="ekv-card-title" data-testid="product-title">
            {product.title}
          </p>
          <div className="ekv-card-price">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
