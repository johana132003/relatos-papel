import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CabeceraTienda from '../../components/CabeceraTienda.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { getUserDetail } from '../../services/userService.js'
import '../Tienda/TiendaPage.css'
import './Perfil.css'

export default function PerfilDetalle() {
  const navigate = useNavigate()
  const { usuario, logout } = useAuth()
  const [detalle, setDetalle] = useState(null)
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
      const res = await getUserDetail(usuario.userId)
      if (cancelado) return
      if (res.error) {
        setError(res.error)
        setDetalle(null)
      } else {
        setDetalle(res.data)
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
        <p className="perfil-volver">
          <Link to="/tienda/perfil">← Volver al perfil</Link>
        </p>

        <h1 className="perfil-titulo">Detalle del perfil</h1>

        <section className="perfil-seccion" aria-labelledby="perfil-datos-titulo">
          <h2 id="perfil-datos-titulo" className="perfil-seccion__titulo">
            Datos del usuario
          </h2>
          {cargando ? (
            <p role="status">Cargando perfil…</p>
          ) : error ? (
            <p role="alert">No se pudieron cargar los datos: {error}</p>
          ) : detalle ? (
            <dl className="perfil-datos">
              <div className="perfil-datos__fila">
                <dt>Nombre</dt>
                <dd>{detalle.nombre}</dd>
              </div>
              <div className="perfil-datos__fila">
                <dt>Correo electrónico</dt>
                <dd>{usuario.correo}</dd>
              </div>
              <div className="perfil-datos__fila">
                <dt>Teléfono</dt>
                <dd>{detalle.telefono}</dd>
              </div>
              <div className="perfil-datos__fila">
                <dt>Dirección</dt>
                <dd>{detalle.direccion}</dd>
              </div>
              <div className="perfil-datos__fila">
                <dt>Ciudad</dt>
                <dd>{detalle.ciudad}</dd>
              </div>
            </dl>
          ) : null}
        </section>
      </div>
    </div>
  )
}
