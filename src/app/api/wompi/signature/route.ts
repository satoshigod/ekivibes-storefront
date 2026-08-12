import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * Genera la firma de integridad que exige Wompi.
 * Formula: SHA256(referencia + montoEnCentavos + moneda + secretoDeIntegridad)
 * El secreto NUNCA sale del servidor.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const reference = String(body.reference || "").trim()
    // Debe ser entero: sin decimales ni separadores
    const amountInCents = Math.round(Number(body.amountInCents))
    const currency = String(body.currency || "COP").trim().toUpperCase()

    // Espacios o saltos de linea al copiar el secreto rompen la firma
    const secret = (process.env.WOMPI_INTEGRITY_SECRET || "").trim()

    if (!secret) {
      return NextResponse.json(
        { error: "WOMPI_INTEGRITY_SECRET no está configurado en el servidor" },
        { status: 500 }
      )
    }

    if (!reference || !Number.isFinite(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        { error: "Datos inválidos: reference o amountInCents" },
        { status: 400 }
      )
    }

    const raw = `${reference}${amountInCents}${currency}${secret}`
    const signature = crypto.createHash("sha256").update(raw).digest("hex")

    // Diagnostico: NO expone el secreto, solo a que ambiente pertenece
    const env = secret.startsWith("test_")
      ? "test"
      : secret.startsWith("prod_")
      ? "prod"
      : "desconocido"

    return NextResponse.json({
      signature,
      amountInCents,
      currency,
      reference,
      debug: { secretEnv: env, secretLength: secret.length },
    })
  } catch (e: any) {
    return NextResponse.json(
      { error: "No se pudo generar la firma", detail: e?.message },
      { status: 500 }
    )
  }
}
