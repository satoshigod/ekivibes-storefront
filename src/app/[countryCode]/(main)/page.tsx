export const dynamic = "force-dynamic"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
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
  const params = await props.params
  const { category } = params
  const { product_categories } = await getCategoryByHandle(category)

  const title = product_categories
    .map((c) => c.name)
    .join(" | ")

  return {
    title: `${title} | Ekivibes`,
    description: `${title} en Ekivibes Colombia`,
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams
  const { category, countryCode } = params

  const { product_categories } = await getCategoryByHandle(category)

  if (!product_categories) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={product_categories[product_categories.length - 1]}
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
