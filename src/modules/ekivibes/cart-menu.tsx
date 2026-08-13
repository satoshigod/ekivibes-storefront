"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type MiniItem = {
  id: string
  title: string
  variant: string
  quantity: number
  unit_price: number
  thumbnail?: string | null
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

/**
 * Carrito del header: contador siempre visible + mini-carrito que se
 * despliega unos segundos al agregar un producto.
 */
export default function CartMenu() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<MiniItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [checkoutStep, setCheckoutStep] = useState("address")
  const [open, setOpen] = useState(false)
  const timerRef = useRef<number | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const load = async () => {
    try {
      const res = await fetch("/api/cart-count", { cache: "no-store" })
      const data = await res.json()
      setCount(Number(data?.count) || 0)
      setItems(Array.isArray(data?.items) ? data.items : [])
      setSubtotal(Number(data?.subtotal) || 0)
      setCheckoutStep(data?.checkout_step || "address")
    } catch {
      // silencioso
    }
  }

  const openTemporarily = () => {
    setOpen(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setOpen(false), 5000)
  }

  useEffect(() => {
    load()

    const onUpdated = async () => {
      await load()
      openTemporarily()
    }

    window.addEventListener("ekv:cart-updated", onUpdated)
    window.addEventListener("ekv:cart-updated-silent", load)
    window.addEventListener("focus", load)

    try {
      if (sessionStorage.getItem("ekv:open-cart") === "1") {
        sessionStorage.removeItem("ekv:open-cart")
        onUpdated()
      }
    } catch {}

    return () => {
      window.removeEventListener("ekv:cart-updated", onUpdated)
      window.removeEventListener("ekv:cart-updated-silent", load)
      window.removeEventListener("focus", load)
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    load()
    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Extraer el countryCode del pathname (/co/...) para construir la URL correcta
  const countryCode = pathname.split("/")[1] || "co"

  const handleCheckout = () => {
    setOpen(false)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    router.push(`/${countryCode}/checkout?step=${checkoutStep}`)
  }

  return (
    <div
      className="ekv-cart-menu"
      onMouseEnter={() => {
        if (count > 0) {
          if (timerRef.current) window.clearTimeout(timerRef.current)
          setOpen(true)
        }
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <LocalizedClientLink href="/cart" className="ic ekv-cart-link">
        <span>Carrito</span>
        {count > 0 && (
          <span
            className="ekv-cart-badge"
            aria-label={`${count} productos en el carrito`}
            data-testid="cart-count-badge"
          >
            {count}
          </span>
        )}
      </LocalizedClientLink>

      {open && count > 0 && (
        <div className="ekv-mini-cart" role="dialog" aria-label="Resumen del carrito">
          <div className="ekv-mini-cart-header">
            Agregado a tu carrito
          </div>

          <div className="ekv-mini-cart-items">
            {items.slice(0, 4).map((item) => (
              <div key={item.id} className="ekv-mini-cart-item">
                {item.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.thumbnail} alt={item.title} />
                ) : (
                  <div className="ekv-mini-cart-thumb-empty" />
                )}
                <div className="ekv-mini-cart-info">
                  <p className="ekv-mini-cart-title">{item.title}</p>
                  {item.variant && (
                    <p className="ekv-mini-cart-variant">{item.variant}</p>
                  )}
                  <p className="ekv-mini-cart-qty">
                    {item.quantity} × {formatCOP(item.unit_price)}
                  </p>
                </div>
              </div>
            ))}
            {items.length > 4 && (
              <p className="ekv-mini-cart-more">
                y {items.length - 4} producto(s) más
              </p>
            )}
          </div>

          <div className="ekv-mini-cart-subtotal">
            <span>Subtotal</span>
            <strong>{formatCOP(subtotal)}</strong>
          </div>

          <div className="ekv-mini-cart-actions">
            <LocalizedClientLink href="/cart" className="ekv-btn-secondary">
              Ver carrito
            </LocalizedClientLink>
            <button
              onClick={handleCheckout}
              className="ekv-btn-primary"
            >
              Ir a pagar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
