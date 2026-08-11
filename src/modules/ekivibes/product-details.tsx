import PRODUCT_DETAILS from "./product-details-data"

// Renderiza la seccion "Detalles del producto" (diagramas + tablas) del sitio Ekivibes
// para el producto cuyo handle coincida. Si no hay match, no renderiza nada.
export default function EkivibesProductDetails({ handle }: { handle?: string }) {
  const html = handle ? PRODUCT_DETAILS[handle] : undefined
  if (!html) {
    return null
  }
  return (
    <div className="content-container">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
