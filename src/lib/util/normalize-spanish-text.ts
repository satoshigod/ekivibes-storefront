/**
 * src/lib/util/normalize-spanish-text.ts
 *
 * En el backend de Medusa se evita la letra "ñ" en título/descripción de
 * producto (convención operativa de Ivan — evita problemas de codificación
 * en el pipeline de scripts). Esta función corrige esa falta de ñ SOLO para
 * mostrar en el front end de Ekivibes, sin tocar los datos de Medusa.
 *
 * Cubre "nino(s)" -> "niño(s)" en cualquier capitalización, como palabra
 * completa (para no afectar sustrings dentro de otras palabras).
 */
const REPLACEMENTS: [RegExp, string][] = [
  [/\bninos\b/g, "niños"],
  [/\bNinos\b/g, "Niños"],
  [/\bNINOS\b/g, "NIÑOS"],
  [/\bnino\b/g, "niño"],
  [/\bNino\b/g, "Niño"],
  [/\bNINO\b/g, "NIÑO"],
]

export function normalizeSpanishText(text?: string | null): string {
  if (!text) return ""
  let result = text
  for (const [pattern, replacement] of REPLACEMENTS) {
    result = result.replace(pattern, replacement)
  }
  return result
}
