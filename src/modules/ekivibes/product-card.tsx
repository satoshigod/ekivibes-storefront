import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function EkivibesProductCard({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const { cheapestPrice } = getProductPrice({ product })
  const brand = product.metadata?.brand as string | undefined

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="card">
      <div className="card-img">
        {product.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.thumbnail} alt={product.title} />
        ) : (
          <span>🦺</span>
        )}
      </div>
      <div className="card-body">
        {brand && <div className="card-brand">{brand}</div>}
        <div className="card-name">{product.title}</div>
        {cheapestPrice && (
          <div>
            <span className="price">{cheapestPrice.calculated_price}</span>
            {cheapestPrice.price_type === "sale" && (
              <span className="price-old">{cheapestPrice.original_price}</span>
            )}
          </div>
        )}
      </div>
    </LocalizedClientLink>
  )
}
