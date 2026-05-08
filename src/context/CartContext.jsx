import { useCallback, useMemo, useState } from 'react'
import { CartContext } from './cartContext.js'
import { parsePrecioCOP } from '../utils/precio.js'

const STORAGE_KEY = 'relatos-cart'

function readCart() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCart(items) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)

  const updateItems = useCallback((updater) => {
    setItems((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      writeCart(next)
      return next
    })
  }, [])

  const addItem = useCallback(
    ({ idLibro, titulo, autor, imagen, precio }) => {
      const precioUnitario = parsePrecioCOP(precio)
      updateItems((prev) => {
        const i = prev.findIndex((x) => x.idLibro === idLibro)
        if (i >= 0) {
          const next = [...prev]
          next[i] = {
            ...next[i],
            cantidad: next[i].cantidad + 1,
          }
          return next
        }
        return [
          ...prev,
          {
            idLibro,
            titulo,
            autor,
            imagen,
            precioUnitario,
            cantidad: 1,
          },
        ]
      })
    },
    [updateItems],
  )

  const removeItem = useCallback(
    (idLibro) => {
      updateItems((prev) => prev.filter((x) => x.idLibro !== idLibro))
    },
    [updateItems],
  )

  const setCantidad = useCallback(
    (idLibro, cantidad) => {
      const n = Math.max(0, Math.floor(Number(cantidad)) || 0)
      updateItems((prev) => {
        if (n === 0) return prev.filter((x) => x.idLibro !== idLibro)
        return prev.map((x) =>
          x.idLibro === idLibro ? { ...x, cantidad: n } : x,
        )
      })
    },
    [updateItems],
  )

  const clearCart = useCallback(() => {
    updateItems([])
  }, [updateItems])

  const totalArticulos = useMemo(
    () => items.reduce((s, x) => s + x.cantidad, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((s, x) => s + x.precioUnitario * x.cantidad, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      setCantidad,
      clearCart,
      totalArticulos,
      subtotal,
    }),
    [items, addItem, removeItem, setCantidad, clearCart, totalArticulos, subtotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
