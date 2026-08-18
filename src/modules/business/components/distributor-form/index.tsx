"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import {
  submitDistributorRegistration,
  BusinessRegistrationState,
} from "@lib/data/business-registration"

const initialState: BusinessRegistrationState = { success: false, error: null }

const textareaClasses =
  "block w-full px-4 py-3 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover text-ui-fg-base txt-compact-medium resize-none"

export default function DistributorRegistrationForm() {
  const [state, formAction] = useActionState(submitDistributorRegistration, initialState)

  if (state.success) {
    return (
      <div className="ekv-form-success">
        <h3>¡Gracias por tu interés!</h3>
        <p>
          Revisaremos las condiciones y la disponibilidad en tu zona, y te contactaremos en
          máximo 2 días hábiles.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-y-4">
      <Input label="Nombre" name="contactName" required />
      <Input label="Tienda o negocio (opcional)" name="companyName" />

      <div className="ekv-form-grid">
        <Input label="Correo electrónico" name="email" type="email" required />
        <Input label="Teléfono / WhatsApp" name="phone" type="tel" required />
      </div>

      <Input label="Ciudad" name="city" required />

      <textarea
        name="message"
        placeholder="Cuéntanos sobre tu negocio y tu zona (opcional)"
        rows={4}
        className={textareaClasses}
      />

      {/* Honeypot: campo oculto, invisible para personas, atractivo para bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <ErrorMessage error={state.error} data-testid="distributor-registration-error" />

      <SubmitButton className="w-full md:w-auto md:self-start">
        Enviar solicitud
      </SubmitButton>
    </form>
  )
}
