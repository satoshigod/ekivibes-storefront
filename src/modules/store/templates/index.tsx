import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"

const TiendaTemplate = ({
  sortBy, page, countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col py-6 content-container" data-testid="category-container">
      {/* Título + filtros en fila horizontal */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold" data-testid="store-page-title">
          Todos los productos
        </h1>
        <RefinementList sortBy={sort} />
      </div>
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts sortBy={sort} page={pageNumber} countryCode={countryCode} />
      </Suspense>
    </div>
  )
}

export default TiendaTemplate
