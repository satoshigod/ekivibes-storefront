import { Badge } from "@medusajs/ui"

const PagoTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">Attention:</span> For testing purposes
      only.
    </Badge>
  )
}

export default PagoTest
