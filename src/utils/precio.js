/** Convierte "$ 30.000" o similar a pesos (entero). */
export function parsePrecioCOP(valorStr) {
  const digits = String(valorStr).replace(/\D/g, '')
  return parseInt(digits, 10) || 0
}

export function formatPrecioCOP(valor) {
  return `$ ${Number(valor).toLocaleString('es-CO')}`
}
