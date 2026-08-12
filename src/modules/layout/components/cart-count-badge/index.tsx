"use client"

import { useEffect, useState } from "react"

/**
 * Contador de productos del carrito.
 *
 * Se resuelve en el cliente a proposito: el nav es un server component
 * y la revalidacion no se refleja ahi, por lo que el badge quedaba en cero
 * aunque el carrito tuviera productos.
 */
const CartCountBadge = () => {
  const [count, setCount] = useState<number>(0)

  const fetchCount = async () => {
    try {
      const res = await fetch("/api/cart-count", { cache: "no-store" })
      const data = await res.json()
      setCount(Number(data?.count) || 0)
    } catch {
      // silencioso: el badge simplemente no aparece
    }
  }

  useEffect(() => {
    fetchCount()

    const onUpdated = () => fetchCount()
    window.addEventListener("ekv:cart-updated", onUpdated)

    // Al volver a la pestaña, resincronizar por si cambio en otra ventana
    const onFocus = () => fetchCount()
    window.addEventListener("focus", onFocus)

    return () => {
      window.removeEventListener("ekv:cart-updated", onUpdated)
      window.removeEventListener("focus", onFocus)
    }
  }, [])

  if (count <= 0) return null

  return (
    <span
      className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#A8935E] text-white text-xs font-medium leading-none"
      aria-label={`${count} productos en el carrito`}
      data-testid="cart-count-badge"
    >
      {count}
    </span>
  )
}

export default CartCountBadge
