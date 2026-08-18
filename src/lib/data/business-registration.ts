"use server"

import { sdk } from "@lib/config"

export type BusinessRegistrationState = {
  success: boolean
  error: string | null
}

export async function submitBusinessRegistration(
  _prevState: BusinessRegistrationState | null,
  formData: FormData
): Promise<BusinessRegistrationState> {
  const payload = {
    store: "ekivibes",
    companyName: formData.get("companyName") as string,
    taxId: (formData.get("taxId") as string) || undefined,
    contactName: formData.get("contactName") as string,
    contactRole: (formData.get("contactRole") as string) || undefined,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    city: formData.get("city") as string,
    department: (formData.get("department") as string) || undefined,
    businessType: formData.get("businessType") as string,
    estimatedVolume: (formData.get("estimatedVolume") as string) || undefined,
    message: (formData.get("message") as string) || undefined,
    website: (formData.get("website") as string) || undefined, // honeypot
  }

  try {
    const res = await sdk.client.fetch<{ success?: boolean; message?: string }>(
      "/store/business-registration",
      {
        method: "POST",
        body: payload,
      }
    )

    if (!res?.success) {
      return { success: false, error: res?.message || "No pudimos enviar tu solicitud. Intenta de nuevo." }
    }

    return { success: true, error: null }
  } catch (error: any) {
    const message =
      error?.message || "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp."
    return { success: false, error: message }
  }
}
