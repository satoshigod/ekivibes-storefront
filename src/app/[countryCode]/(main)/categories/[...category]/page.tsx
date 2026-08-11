export const dynamic = "force-dynamic"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle } from "@lib/data/categories"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

// params.category -> siempre string[] no vacio (o null)
function normalizeCategory(raw: unknown): string[] | null {
  if (Array.isArray(raw)) {
    const arr = raw.filter(
      (v): v is string => typeof v === "string" && v.length > 0
    )
    return arr.length ? arr : null
  }
  if (typeof raw === "string" && raw.length > 0) {
    return [raw]
  }
  return null
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const category = normalizeCategory(params.category)

  if (!category) {
    return { title: "Categoría | Ekivibes" }
  }

  const productCategory = await getCategoryByHandle(category).catch(() => null)

  if (!productCategory) {
    return { title: "Categoría | Ekivibes" }
  }

  const title = productCategory.name

  return {
    title: `${title} | Ekivibes`,
    description: productCategory.description ?? `${title} en Ekivibes Colombia.`,
    alternates: {
      canonical: category.join("/"),
    },
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const category = normalizeCategory(params.category)

  if (!category) {
    notFound()
  }

  const productCategory = await getCategoryByHandle(category).catch(() => null)

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
