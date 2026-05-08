import purchasesSeed from './purchases.json'
import booksData from '../utils/mockBooks.json'
import { delay, ok, fail } from './apiClient.js'
import { parsePrecioCOP } from '../utils/precio.js'

const STORAGE_KEY = 'relatos-purchases-dynamic'

function leerPedidosDinamicos() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function guardarPedidosDinamicos(lista) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
}

function todosLosPedidos() {
  return [...purchasesSeed.orders, ...leerPedidosDinamicos()]
}

function precioLibro(bookId) {
  const b = booksData.books.find((x) => x.id === Number(bookId))
  return b ? parsePrecioCOP(b.precio) : 0
}

function nuevoIdPedido() {
  const n = Math.floor(100 + Math.random() * 900)
  return `PED-2026-${n}`
}

function fechaHoyColombia() {
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date())
}

function ordenarPorFechaDesc(lista) {
  return [...lista].sort((a, b) => {
    const [da, ma, ya] = a.fecha.split('/').map(Number)
    const [db, mb, yb] = b.fecha.split('/').map(Number)
    const ta = new Date(ya, ma - 1, da).getTime()
    const tb = new Date(yb, mb - 1, db).getTime()
    return tb - ta
  })
}

/** GET /users/:userId/purchases */
export async function getPurchaseHistory(userId) {
  await delay(360)
  const filtrados = todosLosPedidos().filter((o) => o.userId === userId)
  return ok(ordenarPorFechaDesc(filtrados))
}

/**
 * POST /purchases (un libro — simula compra unitaria)
 * @returns {import('./apiClient.js').ok} data: pedido creado
 */
export async function purchaseBook(userId, bookId) {
  await delay(400)
  const unit = precioLibro(bookId)
  if (!unit) {
    return fail('Libro no disponible para compra', 404)
  }
  const pedido = {
    id: nuevoIdPedido(),
    userId,
    fecha: fechaHoyColombia(),
    total: unit,
    estado: 'Procesando',
  }
  const extra = leerPedidosDinamicos()
  extra.push(pedido)
  guardarPedidosDinamicos(extra)
  return ok(pedido)
}
