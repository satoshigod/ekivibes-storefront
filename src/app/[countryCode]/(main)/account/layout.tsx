import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"
import CuentaLayout from "@modules/account/templates/account-layout"

export default async function CuentaPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <CuentaLayout customer={customer}>
      {customer ? dashboard : login}
      <Toaster />
    </CuentaLayout>
  )
}
