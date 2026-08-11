import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import { PRODUCT_IMAGES } from "@modules/ekivibes/product-images-data"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  handle?: string | null
}

const ImageGallery = ({ images, handle }: ImageGalleryProps) => {
  // Use Medusa images if they have valid URLs, otherwise fall back to /public/imgs/
  const validMedusa = images.filter(i => i.url && !i.url.includes("localhost"))
  const localImgs = handle && PRODUCT_IMAGES[handle] ? PRODUCT_IMAGES[handle].images : []
  const displayImages = validMedusa.length > 0
    ? validMedusa.map(i => i.url)
    : localImgs

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {displayImages.map((url, index) => (
          <Container
            key={index}
            className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              className="absolute inset-0 w-full h-full object-contain object-center rounded-rounded"
              alt={`Product image ${index + 1}`}
              loading={index <= 2 ? "eager" : "lazy"}
            />
          </Container>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
