import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"

const TiendaTemplate = ({
  sortBy, page, countryCode, title, intro,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  title?: string
  intro?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="ekv-catalog" data-testid="category-container">
      {/* Título + filtros en fila horizontal */}
      <div className="ekv-catalog-head flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="ekv-catalog-title" data-testid="store-page-title">
            {title || "Todos los productos"}
          </h1>
          {intro && (
            <p className="ekv-catalog-intro text-sm text-ui-fg-subtle mt-2 max-w-2xl">
              {intro}
            </p>
          )}
        </div>
        <RefinementList sortBy={sort} />
      </div>
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts sortBy={sort} page={pageNumber} countryCode={countryCode} />
      </Suspense>
    </div>
  )
}

export default TiendaTemplate
