"use client"

import React, { useEffect, useActionState } from "react";

import Input from "@modules/common/components/input"

import CuentaInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
// import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.TiendaCustomer
}

const PerfilCorreo electrónico: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  // TODO: It seems we don't support updating emails now?
  const updateCustomerCorreo electrónico = (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      email: formData.get("email") as string,
    }

    try {
      // await updateCustomer(customer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useActionState(updateCustomerCorreo electrónico, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full">
      <CuentaInfo
        label="Correo electrónico"
        currentInfo={`${customer.email}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
        data-testid="account-email-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={customer.email}
            data-testid="email-input"
          />
        </div>
      </CuentaInfo>
    </form>
  )
}

export default PerfilCorreo electrónico
