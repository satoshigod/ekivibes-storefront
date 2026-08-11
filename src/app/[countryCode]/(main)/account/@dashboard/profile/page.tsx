import { Metadata } from "next"

import PerfilTeléfono from "@modules/account//components/profile-phone"
import PerfilBillingDirección from "@modules/account/components/profile-billing-address"
import PerfilCorreo electrónico from "@modules/account/components/profile-email"
import PerfilName from "@modules/account/components/profile-name"
import PerfilContraseña from "@modules/account/components/profile-password"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Perfil",
  description: "Ver y editar tu perfil de Ekivibes.",
}

export default async function Perfil() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Perfil</h1>
        <p className="text-base-regular">
          View and update your profile information, including your name, email,
          and phone number. You can also update your billing address, or change
          your password.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <PerfilName customer={customer} />
        <Divider />
        <PerfilCorreo electrónico customer={customer} />
        <Divider />
        <PerfilTeléfono customer={customer} />
        <Divider />
        {/* <PerfilContraseña customer={customer} />
        <Divider /> */}
        <PerfilBillingDirección customer={customer} regions={regions} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
;``
