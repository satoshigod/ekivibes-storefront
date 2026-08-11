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
