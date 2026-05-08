import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CabeceraTienda from '../../components/CabeceraTienda.jsx'
import { useAuth } from '../../context/useAuth.js'
import { getPurchaseHistory } from '../../services/purchaseService.js'
import { formatPrecioCOP } from '../../utils/precio.js'
import '../Tienda/TiendaPage.css'
import './Perfil.css'

const MAX_PEDIDOS = 5

export default function Perfil() {
  const navigate = useNavigate()
  const { usuario, logout } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!usuario) {
      navigate('/login', { replace: true })
    }
  }, [usuario, navigate])

  useEffect(() => {
    if (!usuario?.userId) return
    let cancelado = false
    ;(async () => {
      setCargando(true)
      setError(null)
      const res = await getPurchaseHistory(usuario.userId)
      if (cancelado) return
      if (res.error) {
        setError(res.error)
        setPedidos([])
      } else {
        setPedidos(res.data.slice(0, MAX_PEDIDOS))
      }
      setCargando(false)
    })()
    return () => {
      cancelado = true
    }
  }, [usuario])

  if (!usuario) {
    return null
  }

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="tienda">
      <CabeceraTienda usuario={usuario} onLogout={handleLogout} />

      <div className="perfil-pagina">
        <h1 className="perfil-titulo">Mi perfil</h1>

        <section className="perfil-seccion" aria-labelledby="perfil-pedidos-titulo">
          <h2 id="perfil-pedidos-titulo" className="perfil-seccion__titulo">
            Últimos pedidos
          </h2>
          <p className="perfil-seccion__ayuda">
            Historial de tus {MAX_PEDIDOS} pedidos más recientes.
          </p>
          {cargando ? (
            <p role="status">Cargando historial…</p>
          ) : error ? (
            <p role="alert">No se pudo cargar el historial: {error}</p>
          ) : (
            <div className="perfil-tabla-wrap">
              <table className="perfil-tabla">
                <thead>
                  <tr>
                    <th scope="col">Pedido</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.fecha}</td>
                      <td>{formatPrecioCOP(p.total)}</td>
                      <td>{p.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <nav className="perfil-acciones" aria-label="Opciones de perfil">
          <Link to="/tienda/perfil/datos" className="perfil-enlace-detalle">
            Ver detalle del perfil de usuario
          </Link>
        </nav>
      </div>
    </div>
  )
}
