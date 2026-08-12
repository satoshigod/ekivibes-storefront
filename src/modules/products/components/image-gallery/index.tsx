"use client"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { PRODUCT_IMAGES } from "@modules/ekivibes/product-images-data"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  handle?: string | null
}

const ImageGallery = ({ images, handle }: ImageGalleryProps) => {
  const validMedusa = images.filter(i => i.url && !i.url.includes("localhost"))
  const localImgs = handle && PRODUCT_IMAGES[handle] ? PRODUCT_IMAGES[handle].images : []
  const displayImages = validMedusa.length > 0
    ? validMedusa.map(i => i.url!)
    : localImgs

  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [origen, setOrigen] = useState("50% 50%")

  // El zoom sigue al cursor dentro del mismo marco: permite inspeccionar
  // costuras, cartucho y hebillas sin perder la vista general.
  const moverLupa = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    setOrigen(`${x}% ${y}%`)
  }

  if (!displayImages.length) return null

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Imagen principal */}
      <div
        className="ekv-gallery-main relative w-full bg-ui-bg-subtle rounded-large overflow-hidden"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={moverLupa}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayImages[active]}
          alt="Producto"
          className="ekv-gallery-img w-full h-full object-contain object-center"
          style={{
            transform: zoom ? "scale(2)" : "scale(1)",
            transformOrigin: origen,
          }}
        />
        {/* Flechas si hay más de 1 */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={() => setActive(i => (i - 1 + displayImages.length) % displayImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow text-lg"
            >‹</button>
            <button
              onClick={() => setActive(i => (i + 1) % displayImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow text-lg"
            >›</button>
          </>
        )}
      </div>
      {/* Miniaturas horizontales */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                i === active ? "border-[#A8935E]" : "border-transparent"
              } bg-ui-bg-subtle`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
