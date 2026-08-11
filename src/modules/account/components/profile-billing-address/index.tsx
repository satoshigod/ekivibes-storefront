"use client"

import React, { useEffect, useMemo, useActionState } from "react"

import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"

import CuentaInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { addCustomerDirección, updateCustomerDirección } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.TiendaCustomer
  regions: HttpTypes.TiendaRegion[]
}

const PerfilBillingDirección: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  const [successState, setSuccessState] = React.useState(false)

  const billingDirección = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  const initialState: Record<string, any> = {
    isDefaultBilling: true,
    isDefaultShipping: false,
    error: false,
    success: false,
  }

  if (billingDirección) {
    initialState.addressId = billingDirección.id
  }

  const [state, formAction] = useActionState(
    billingDirección ? updateCustomerDirección : addCustomerDirección,
    initialState
  )

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  const currentInfo = useMemo(() => {
    if (!billingDirección) {
      return "No billing address"
    }

    const country =
      regionOptions?.find(
        (country) => country?.value === billingDirección.country_code
      )?.label || billingDirección.country_code?.toUpperCase()

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <span>
          {billingDirección.first_name} {billingDirección.last_name}
        </span>
        <span>{billingDirección.company}</span>
        <span>
          {billingDirección.address_1}
          {billingDirección.address_2 ? `, ${billingDirección.address_2}` : ""}
        </span>
        <span>
          {billingDirección.postal_code}, {billingDirección.city}
        </span>
        <span>{country}</span>
      </div>
    )
  }, [billingDirección, regionOptions])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <input type="hidden" name="addressId" value={billingDirección?.id} />
      <CuentaInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="Nombre"
              name="first_name"
              defaultValue={billingDirección?.first_name || undefined}
              required
              data-testid="billing-first-name-input"
            />
            <Input
              label="Apellido"
              name="last_name"
              defaultValue={billingDirección?.last_name || undefined}
              required
              data-testid="billing-last-name-input"
            />
          </div>
          <Input
            label="Company"
            name="company"
            defaultValue={billingDirección?.company || undefined}
            data-testid="billing-company-input"
          />
          <Input
            label="Teléfono"
            name="phone"
            type="phone"
            autoComplete="phone"
            required
            defaultValue={billingDirección?.phone ?? customer?.phone ?? ""}
            data-testid="billing-phone-input"
          />
          <Input
            label="Dirección"
            name="address_1"
            defaultValue={billingDirección?.address_1 || undefined}
            required
            data-testid="billing-address-1-input"
          />
          <Input
            label="Apartment, suite, etc."
            name="address_2"
            defaultValue={billingDirección?.address_2 || undefined}
            data-testid="billing-address-2-input"
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Código postal"
              name="postal_code"
              defaultValue={billingDirección?.postal_code || undefined}
              required
              data-testid="billing-postcal-code-input"
            />
            <Input
              label="Ciudad"
              name="city"
              defaultValue={billingDirección?.city || undefined}
              required
              data-testid="billing-city-input"
            />
          </div>
          <Input
            label="Departamento"
            name="province"
            defaultValue={billingDirección?.province || undefined}
            data-testid="billing-province-input"
          />
          <NativeSelect
            name="country_code"
            defaultValue={billingDirección?.country_code || undefined}
            required
            data-testid="billing-country-code-select"
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option?.value}>
                  {option?.label}
                </option>
              )
            })}
          </NativeSelect>
        </div>
      </CuentaInfo>
    </form>
  )
}

export default PerfilBillingDirección
