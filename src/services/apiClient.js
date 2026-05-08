/** Simula latencia de red. */
export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

/** Respuesta estandarizada tipo API REST (lista para fetch real). */
export function ok(data, status = 200) {
  return { data, error: null, status }
}

export function fail(error, status = 400) {
  return { data: null, error: String(error), status }
}
