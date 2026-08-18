"use client"

import { useActionState, useState } from "react"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import {
  submitBusinessRegistration,
  BusinessRegistrationState,
} from "@lib/data/business-registration"

const BUSINESS_TYPES = [
  "Club de equitación o salto",
  "Caballeriza / centro ecuestre",
  "Escuela o academia de equitación",
  "Federación departamental o nacional",
  "Tienda o revendedor de equipamiento ecuestre",
  "Organizador de eventos o competencias",
  "Otro",
]

const VOLUME_RANGES = [
  "1 a 5 unidades al año",
  "6 a 20 unidades al año",
  "21 a 50 unidades al año",
  "Más de 50 unidades al año",
  "Aún no lo sé",
]

const initialState: BusinessRegistrationState = { success: false, error: null }

const selectClasses =
  "block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover text-ui-fg-base txt-compact-medium"

const textareaClasses =
  "block w-full px-4 py-3 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover text-ui-fg-base txt-compact-medium resize-none"

export default function BusinessRegistrationForm() {
  const [state, formAction] = useActionState(submitBusinessRegistration, initialState)
  const [accepted, setAccepted] = useState(false)

  if (state.success) {
    return (
      <div className="ekv-form-success">
        <h3>¡Gracias! Recibimos tu solicitud</h3>
        <p>
          Nuestro equipo revisará la información de tu empresa u organización y te contactará
          en máximo 2 días hábiles al correo o teléfono que nos compartiste.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-y-4">
      <div className="ekv-form-grid">
        <Input label="Nombre de la empresa u organización" name="companyName" required />
        <Input label="NIT o RUT (opcional)" name="taxId" />
      </div>

      <div className="ekv-form-grid">
        <Input label="Nombre del contacto" name="contactName" required />
        <Input label="Cargo (opcional)" name="contactRole" />
      </div>

      <div className="ekv-form-grid">
        <Input label="Correo electrónico" name="email" type="email" required />
        <Input label="Teléfono / WhatsApp" name="phone" type="tel" required />
      </div>

      <div className="ekv-form-grid">
        <Input label="Ciudad" name="city" required />
        <Input label="Departamento (opcional)" name="department" />
      </div>

      <div className="ekv-form-grid">
        <select name="businessType" required defaultValue="" className={selectClasses}>
          <option value="" disabled>
            Tipo de organización
          </option>
          {BUSINESS_TYPES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select name="estimatedVolume" defaultValue="" className={selectClasses}>
          <option value="">Volumen estimado de compra (opcional)</option>
          {VOLUME_RANGES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="message"
        placeholder="Cuéntanos más sobre tu grupo, escuela o club (opcional)"
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

      <label className="ekv-form-check">
        <input
          type="checkbox"
          name="consent"
          required
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span>
          Acepto ser contactado por Ekivibes y el tratamiento de mis datos para gestionar esta
          solicitud.
        </span>
      </label>

      <ErrorMessage error={state.error} data-testid="business-registration-error" />

      <SubmitButton className="w-full md:w-auto md:self-start">
        Enviar solicitud
      </SubmitButton>
    </form>
  )
}
