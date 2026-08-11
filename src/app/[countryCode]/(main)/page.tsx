--> PARAMETRO CATEGORY ENVIADO: undefined
--> ERROR EN GETCATEGORYBYHANDLE: TypeError: Cannot read properties of undefined (reading 'join')
```

### El diagnóstico exacto:
1. **Next.js recibe `category` como `undefined`**[cite: 3].
2. La función `getCategoryByHandle` intenta hacer un `.join('/')` sobre esa variable[cite: 3]. Al ser `undefined`, el código falla en el servidor con un `TypeError` y devuelve `null`[cite: 3].
3. Al recibir `null`, la página ejecuta el `notFound()` que muestra la pantalla "Page not found"[cite: 3].

Esto ocurre porque en Next.js 15 los parámetros de ruta (`params`) son **promesas** y si el arreglo `category` llega vacío o la función `getCategoryByHandle` espera un *array* obligatorio y recibe `undefined`, colapsa.

---

### La Solución Definitiva

Debemos validar que `category` exista y convertirlo siempre en un arreglo antes de pasarlo a `getCategoryByHandle`.

Reemplaza **todo** el contenido de `src/app/[countryCode]/(main)/categories/[...category]/page.tsx` en GitHub con este código corregido:

```tsx
export const dynamic = "force-dynamic"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle } from "@lib/data/categories"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{
    category: string[]
    countryCode: string
  }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const params = await props.params
    const categoryArray = Array.isArray(params?.category)
      ? params.category
      : params?.category
      ? [params.category]
      : []

    if (categoryArray.length === 0) {
      return { title: "Categoría | Ekivibes" }
    }

    const res = await getCategoryByHandle(categoryArray)

    if (!res || !res.product_categories || res.product_categories.length === 0) {
      return { title: "Categoría | Ekivibes" }
    }

    const title = res.product_categories.map((c: any) => c.name).join(" | ")

    return {
      title: `${title} | Ekivibes`,
      description: `${title} en Ekivibes Colombia`,
    }
  } catch (error) {
    return { title: "Categoría | Ekivibes" }
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams
  const { category, countryCode } = params

  // Aseguramos que la variable siempre sea un arreglo válido de strings
  const categoryArray = Array.isArray(category)
    ? category
    : category
    ? [category]
    : []

  if (categoryArray.length === 0) {
    notFound()
  }

  const res = await getCategoryByHandle(categoryArray).catch(() => null)

  if (!res || !res.product_categories || res.product_categories.length === 0) {
    notFound()
  }

  const currentCategory = res.product_categories[res.product_categories.length - 1]

  return (
    <CategoryTemplate
      category={currentCategory}
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
