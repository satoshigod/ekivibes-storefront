import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { normalizeSpanishText } from "@lib/util/normalize-spanish-text"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {normalizeSpanishText(product.title)}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {normalizeSpanishText(product.description)}
        </Text>
        {(product.metadata?.official_brand_url as string) && (
          <a
            href={product.metadata!.official_brand_url as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline w-fit"
          >
            Ver especificaciones tecnicas en Hit-Air Colombia
          </a>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
