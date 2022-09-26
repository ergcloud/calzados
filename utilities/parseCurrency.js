export const parseCurrency = value => {
  if (!isNaN(value)) {
    value = parseInt(value)
  }

  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
}
