export const currencyParse = (value: number | null | undefined): string => {
  const currency = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })

  const formatted = currency.format(value || 0)

  return formatted
}