import { HttpTypes } from "@medusajs/types"

// Reemplaza localhost:9000 por el backend real de Railway en URLs de imagenes
function fixImageUrl(url?: string | null): string | undefined {
  if (!url) return undefined
  return url.replace(
    /https?:\/\/localhost:9000/g,
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "https://ekivibes-production.up.railway.app"
  )
}

import { Container } from "@medusajs/ui"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {!!fixImageUrl(image.url) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fixImageUrl(image.url)!}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-rounded"
                  alt={`Product image ${index + 1}`}
                  loading={index <= 2 ? "eager" : "lazy"}
                />
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
