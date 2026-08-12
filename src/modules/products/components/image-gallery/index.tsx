"use client"
import { HttpTypes } from "@medusajs/types"
import { useCallback, useEffect, useState } from "react"
import { PRODUCT_IMAGES } from "@modules/ekivibes/product-images-data"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  handle?: string | null
}

const ImageGallery = ({ images, handle }: ImageGalleryProps) => {
  const validMedusa = images.filter((i) => i.url && !i.url.includes("localhost"))
  const localImgs =
    handle && PRODUCT_IMAGES[handle] ? PRODUCT_IMAGES[handle].images : []

  // Filtrar vacios: el mapeo trae "" en algunas posiciones y eso
  // generaba una miniatura en blanco y la imagen principal rota.
  const displayImages = (
    validMedusa.length > 0 ? validMedusa.map((i) => i.url!) : localImgs
  ).filter((src): src is string => !!src && src.trim() !== "")

  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [origen, setOrigen] = useState("50% 50%")
  const [visor, setVisor] = useState(false)

  const total = displayImages.length

  const anterior = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  )
  const siguiente = useCallback(() => setActive((i) => (i + 1) % total), [total])

  // El zoom sigue al cursor dentro del marco
  const moverLupa = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    setOrigen(`${x}% ${y}%`)
  }

  // Teclado en el visor: flechas para navegar, Esc para cerrar
  useEffect(() => {
    if (!visor) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisor(false)
      if (e.key === "ArrowLeft") anterior()
      if (e.key === "ArrowRight") siguiente()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [visor, anterior, siguiente])

  if (!total) return null

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Imagen principal */}
      <div
        className="ekv-gallery-main relative w-full bg-ui-bg-subtle rounded-large overflow-hidden"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={moverLupa}
        onClick={() => setVisor(true)}
        role="button"
        tabIndex={0}
        aria-label="Ampliar imagen"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setVisor(true)
        }}
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

        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                anterior()
              }}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow text-lg"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                siguiente()
              }}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow text-lg"
            >
              ›
            </button>
          </>
        )}

        <span className="ekv-gallery-hint">Clic para ampliar</span>
      </div>

      {/* Miniaturas */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                i === active ? "border-[#A8935E]" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}

      {/* Visor ampliado */}
      {visor && (
        <div
          className="ekv-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
          onClick={() => setVisor(false)}
        >
          <button
            className="ekv-lightbox-close"
            onClick={() => setVisor(false)}
            aria-label="Cerrar"
          >
            ✕
          </button>

          <div
            className="ekv-lightbox-stage"
            onClick={(e) => e.stopPropagation()}
          >
            {total > 1 && (
              <button
                className="ekv-lightbox-nav ekv-lightbox-prev"
                onClick={anterior}
                aria-label="Imagen anterior"
              >
                ‹
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[active]}
              alt="Producto ampliado"
              className="ekv-lightbox-img"
            />

            {total > 1 && (
              <button
                className="ekv-lightbox-nav ekv-lightbox-next"
                onClick={siguiente}
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            )}
          </div>

          {total > 1 && (
            <div
              className="ekv-lightbox-thumbs"
              onClick={(e) => e.stopPropagation()}
            >
              {displayImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  className={i === active ? "is-active" : ""}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}

          <p className="ekv-lightbox-counter">
            {active + 1} / {total}
          </p>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
