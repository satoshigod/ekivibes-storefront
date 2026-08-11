import SkeletonButton from "@modules/skeletons/components/skeleton-button"
import SkeletonCarritoTotals from "@modules/skeletons/components/skeleton-cart-totals"

const SkeletonOrderSummary = () => {
  return (
    <div className="grid-cols-1">
      <SkeletonCarritoTotals header={false} />
      <div className="mt-4">
        <SkeletonButton />
      </div>
    </div>
  )
}

export default SkeletonOrderSummary
