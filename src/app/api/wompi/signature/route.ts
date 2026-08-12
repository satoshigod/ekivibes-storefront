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
    const { reference, amountInCents, currency } = await req.json()

    const secret = process.env.WOMPI_INTEGRITY_SECRET

    if (!secret) {
      return NextResponse.json(
        { error: "WOMPI_INTEGRITY_SECRET no está configurado en el servidor" },
        { status: 500 }
      )
    }

    if (!reference || !amountInCents || !currency) {
      return NextResponse.json(
        { error: "Faltan datos: reference, amountInCents o currency" },
        { status: 400 }
      )
    }

    const raw = `${reference}${amountInCents}${currency}${secret}`
    const signature = crypto.createHash("sha256").update(raw).digest("hex")

    return NextResponse.json({ signature })
  } catch (e: any) {
    return NextResponse.json(
      { error: "No se pudo generar la firma", detail: e?.message },
      { status: 500 }
    )
  }
}
