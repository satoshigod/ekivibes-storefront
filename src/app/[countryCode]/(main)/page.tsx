import { Metadata } from "next"
import EkivibesHome from "@modules/ekivibes/home"

export const metadata: Metadata = {
  title: "Ekivibes | Equitaci\u00f3n & Chalecos Airbag Hit-Air",
  description:
    "Tienda de equitaci\u00f3n en Colombia. Chalecos airbag Hit-Air, accesorios y repuestos originales.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  return <EkivibesHome countryCode={countryCode} />
}
