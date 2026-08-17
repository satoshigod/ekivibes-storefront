import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
  locale = "es-CO",
}: ConvertToLocaleParams) => {
  if (!currency_code || isEmpty(currency_code)) {
    return amount.toString()
  }

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency_code,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)

  // Sanitización cosmética visual: fuerza "$" en vez del código ISO
  // (algunos motores JS no resuelven un narrowSymbol para "COP").
  // No altera `amount` ni `currency_code`, solo el string renderizado.
  return formatted.replace(/COP\s?/, "$ ").trim()
}
