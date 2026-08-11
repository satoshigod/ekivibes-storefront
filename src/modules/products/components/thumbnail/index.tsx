import { Container, clx } from "@medusajs/ui"
import React from "react"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import { PRODUCT_IMAGES } from "@modules/ekivibes/product-images-data"

function resolveImage(url?: string | null, handle?: string | null, index = 0): string | undefined {
  if (url && !url.includes("localhost")) return url
  if (handle && PRODUCT_IMAGES[handle]) {
    return PRODUCT_IMAGES[handle].images[index] || PRODUCT_IMAGES[handle].thumbnail
  }
  return undefined
}

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  handle?: string | null
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail, images, size = "small", isFeatured, className, handle,
  "data-testid": dataTestid,
}) => {
  const initialImage = resolveImage(thumbnail, handle) || resolveImage(images?.[0]?.url, handle)

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden p-4 bg-ui-bg-subtle shadow-elevation-card-rest rounded-large group-hover:shadow-elevation-card-hover transition-shadow ease-in-out duration-150",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      {initialImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={initialImage}
          alt="Thumbnail"
          className="absolute inset-0 w-full h-full object-contain object-center"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full absolute inset-0 flex items-center justify-center">
          <PlaceholderImage size={size === "small" ? 16 : 24} />
        </div>
      )}
    </Container>
  )
}

export default Thumbnail
