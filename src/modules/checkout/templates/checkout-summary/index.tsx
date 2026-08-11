import { Heading } from "@medusajs/ui"

import ProductosPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CarritoTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutResumen = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          Tu carrito
        </Heading>
        <Divider className="my-6" />
        <CarritoTotals totals={cart} />
        <ProductosPreviewTemplate cart={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutResumen
