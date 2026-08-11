export const dynamic = "force-dynamic"

import { Metadata } from "next"
import EkivibesHome from "@modules/ekivibes/home"

export const metadata: Metadata = {
  title: "Ekivibes | Equitación & Chalecos Airbag Hit-Air",
  description:
    "Tienda de equitación en Colombia. Chalecos airbag Hit-Air, accesorios y repuestos originales.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  return <EkivibesHome countryCode={countryCode} />
}
