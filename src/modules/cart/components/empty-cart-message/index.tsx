import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCarritoMessage = () => {
  return (
    <div
      className="py-20 px-6 flex flex-col justify-center items-center text-center max-w-2xl mx-auto"
      data-testid="empty-cart-message"
    >
      <Heading level="h1" className="text-3xl-regular mb-3">
        Tu carrito está vacío
      </Heading>
      <Text className="text-base-regular mb-8 max-w-[32rem] text-ui-fg-subtle">
        Todavía no has agregado ningún producto. Explora nuestros chalecos
        airbag Hit-Air y accesorios para equitación.
      </Text>
      <div className="flex flex-col small:flex-row gap-3 items-center">
        <InteractiveLink href="/store">Ver todos los productos</InteractiveLink>
        <InteractiveLink href="/categories/chalecos-airbag">
          Ver chalecos airbag
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCarritoMessage
