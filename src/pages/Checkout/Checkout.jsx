import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CabeceraTienda from '../../components/CabeceraTienda.jsx'
import ResumenPedido from '../../components/ResumenPedido.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { useCart } from '../../hooks/useCart.js'
import { getUserDetail } from '../../services/userService.js'
import { purchaseBook } from '../../services/purchaseService.js'
import '../Tienda/TiendaPage.css'
import './Checkout.css'

export default function Checkout() {
  const navigate = useNavigate()
  const { usuario, logout } = useAuth()
  const { items, subtotal, clearCart } = useCart()
  const [metodoPago, setMetodoPago] = useState('paypal')
  const [cupon, setCupon] = useState('')
  const [detalleUsuario, setDetalleUsuario] = useState(null)
  const [cargandoPerfil, setCargandoPerfil] = useState(true)
  const [errorPerfil, setErrorPerfil] = useState(null)
  const [confirmando, setConfirmando] = useState(false)
  const [errorCompra, setErrorCompra] = useState(null)

  useEffect(() => {
    if (!usuario) {
      navigate('/login', { replace: true })
    }
  }, [usuario, navigate])

  useEffect(() => {
    if (usuario && items.length === 0) {
      navigate('/tienda/carrito', { replace: true })
    }
  }, [usuario, items.length, navigate])

  useEffect(() => {
    if (!usuario?.userId) return
    let cancelado = false
    ;(async () => {
      setCargandoPerfil(true)
      setErrorPerfil(null)
      const res = await getUserDetail(usuario.userId)
      if (cancelado) return
      if (res.error) {
        setErrorPerfil(res.error)
        setDetalleUsuario(null)
      } else {
        setDetalleUsuario(res.data)
      }
      setCargandoPerfil(false)
    })()
    return () => {
      cancelado = true
    }
  }, [usuario])

  if (!usuario || items.length === 0) {
    return null
  }

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  async function handleConfirmarCompra() {
    setErrorCompra(null)
    setConfirmando(true)
    let ultimoPedidoId = null
    try {
      for (const line of items) {
        for (let q = 0; q < line.cantidad; q++) {
          const res = await purchaseBook(usuario.userId, line.idLibro)
          if (res.error) {
            setErrorCompra(res.error)
            return
          }
          ultimoPedidoId = res.data.id
        }
      }
      clearCart()
      navigate('/tienda/compra-exitosa', { replace: true, state: { total, itemsCount: items.length, numeroOrden: ultimoPedidoId } })
    } finally {
      setConfirmando(false)
    }
  }

  const envio = 0
  const total = subtotal + envio

  return (
    <div className="tienda">
      <CabeceraTienda usuario={usuario} onLogout={handleLogout} />

      <div className="checkout-pagina">
        <main className="checkout-principal">
          <h1 className="checkout-titulo">Finalizar compra</h1>

          <section className="checkout-bloque" aria-labelledby="checkout-contacto">
            <h2 id="checkout-contacto" className="checkout-bloque__titulo">
              Información de contacto
            </h2>
            {cargandoPerfil ? (
              <p role="status">Cargando datos de contacto…</p>
            ) : errorPerfil ? (
              <p role="alert">No se pudieron cargar los datos: {errorPerfil}</p>
            ) : detalleUsuario ? (
              <>
                <p>
                  <strong>Nombre:</strong> {detalleUsuario.nombre}
                </p>
                <p>
                  <strong>Correo:</strong> {usuario.correo}
                </p>
                <p>
                  <strong>Teléfono:</strong> {detalleUsuario.telefono}
                </p>
              </>
            ) : null}
          </section>

          <section className="checkout-bloque" aria-labelledby="checkout-envio">
            <h2 id="checkout-envio" className="checkout-bloque__titulo">
              Dirección de envío
            </h2>
            {detalleUsuario && !cargandoPerfil && !errorPerfil ? (
              <>
                <p>
                  <strong>Dirección:</strong> {detalleUsuario.direccion}
                </p>
                <p>
                  <strong>Ciudad:</strong> {detalleUsuario.ciudad}
                </p>
              </>
            ) : null}
          </section>

          <section className="checkout-bloque" aria-labelledby="checkout-pago">
            <h2 id="checkout-pago" className="checkout-bloque__titulo">
              Método de pago
            </h2>
            <fieldset className="checkout-pago__opciones">
              <legend className="tienda-sr-only">Elegir método de pago</legend>
              <label className="checkout-pago__label">
                <input
                  type="radio"
                  name="metodo-pago"
                  value="paypal"
                  checked={metodoPago === 'paypal'}
                  onChange={() => setMetodoPago('paypal')}
                  disabled={confirmando}
                />
                <span>PayPal</span>
              </label>
              <label className="checkout-pago__label">
                <input
                  type="radio"
                  name="metodo-pago"
                  value="tarjeta"
                  checked={metodoPago === 'tarjeta'}
                  onChange={() => setMetodoPago('tarjeta')}
                  disabled={confirmando}
                />
                <span>Tarjeta de crédito o débito</span>
              </label>
            </fieldset>
          </section>

          {errorCompra ? (
            <p className="checkout-error-compra" role="alert">
              {errorCompra}
            </p>
          ) : null}

          <p className="checkout-confirmar">
            <button
              type="button"
              onClick={handleConfirmarCompra}
              disabled={confirmando || cargandoPerfil || !!errorPerfil}
            >
              {confirmando ? 'Procesando…' : 'Confirmar compra'}
            </button>
          </p>
        </main>

        <aside className="checkout-lateral">
          <ResumenPedido
            variant="checkout"
            Tag="section"
            idTitulo="checkout-resumen-titulo"
            subtotal={subtotal}
            total={total}
          />
          <section className="checkout-cupon" aria-labelledby="checkout-cupon-titulo">
            <h2 id="checkout-cupon-titulo" className="checkout-cupon__titulo">
              Cupón
            </h2>
            <p>
              <label htmlFor="checkout-cupon-input" className="tienda-sr-only">
                Código de cupón
              </label>
              <input
                id="checkout-cupon-input"
                type="text"
                value={cupon}
                onChange={(e) => setCupon(e.target.value)}
                placeholder="Código"
                disabled={confirmando}
              />
            </p>
            <p>
              <button type="button" disabled={confirmando}>
                Validar
              </button>
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}
