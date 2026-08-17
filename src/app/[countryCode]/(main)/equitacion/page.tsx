import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import TiendaTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Equitación | Hit-Air Colombia",
  description:
    "Chalecos y accesorios Hit-Air para equitación, disponibles a través de Ekivibes, distribuidor exclusivo de Hit-Air en Colombia.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

// Página de destino cuando alguien hace clic en "Equitación" desde el sitio
// Hit-Air Colombia (moto). Muestra el catálogo de Ekivibes, que es
// exclusivamente ecuestre — no se filtra nada adicional porque no hace falta.
// No reemplaza ni modifica /store; es una ruta adicional con su propio título.
export default async function EquitacionPage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams

  return (
    <TiendaTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      title="Equipamiento de Equitación Hit-Air"
      intro="Chalecos y accesorios Hit-Air para jinetes, disponibles a través de Ekivibes, distribuidor exclusivo de Hit-Air en Colombia."
    />
  )
}
