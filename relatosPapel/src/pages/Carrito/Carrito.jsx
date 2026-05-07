import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CabeceraTienda from '../../components/CabeceraTienda.jsx'
import CarritoVacio from '../../components/CarritoVacio.jsx'
import LineaItemCarrito from '../../components/LineaItemCarrito.jsx'
import ResumenPedido from '../../components/ResumenPedido.jsx'
import { useAuth } from '../../context/useAuth.js'
import { useCart } from '../../context/useCart.js'
import '../Tienda/TiendaPage.css'
import './Carrito.css'

export default function Carrito() {
  const navigate = useNavigate()
  const { usuario, logout } = useAuth()
  const { items, removeItem, setCantidad, subtotal } = useCart()

  useEffect(() => {
    if (!usuario) {
      navigate('/login', { replace: true })
    }
  }, [usuario, navigate])

  if (!usuario) {
    return null
  }

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  const envio = 0
  const total = subtotal + envio

  return (
    <div className="tienda">
      <CabeceraTienda usuario={usuario} onLogout={handleLogout} />

      <div className="carrito-pagina">
        <main className="carrito-principal">
          <h1 className="carrito-titulo">Carrito de compras</h1>

          {items.length === 0 ? (
            <CarritoVacio />
          ) : (
            <ul className="carrito-lista">
              {items.map((item) => (
                <LineaItemCarrito
                  key={item.idLibro}
                  item={item}
                  onCambiarCantidad={setCantidad}
                  onEliminar={removeItem}
                />
              ))}
            </ul>
          )}
        </main>

        {items.length > 0 ? (
          <ResumenPedido
            variant="carrito"
            Tag="aside"
            idTitulo="resumen-titulo"
            subtotal={subtotal}
            total={total}
          >
            <p>
              <button
                type="button"
                onClick={() => navigate('/tienda/checkout')}
              >
                Finalizar compra
              </button>
            </p>
            <p>
              <Link to="/tienda">Continuar comprando</Link>
            </p>
          </ResumenPedido>
        ) : null}
      </div>
    </div>
  )
}
