import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CabeceraTienda from '../../components/CabeceraTienda.jsx'
import FichaLibroDetalle from '../../components/FichaLibroDetalle.jsx'
import { useAuth } from '../../context/useAuth.js'
import { useCart } from '../../context/useCart.js'
import { getBookById } from '../../services/bookService.js'
import './TiendaPage.css'
import './LibroDetalle.css'

export default function LibroDetalle() {
  const { libroId } = useParams()
  const navigate = useNavigate()
  const { usuario, logout } = useAuth()
  const { addItem } = useCart()
  const [libro, setLibro] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!usuario) {
      navigate('/login', { replace: true })
    }
  }, [usuario, navigate])

  useEffect(() => {
    if (!usuario || !libroId) return
    let cancelado = false
    ;(async () => {
      setCargando(true)
      const res = await getBookById(libroId)
      if (cancelado) return
      if (res.error || !res.data) {
        setLibro(null)
        if (!cancelado) navigate('/tienda', { replace: true })
      } else {
        setLibro(res.data)
      }
      if (!cancelado) setCargando(false)
    })()
    return () => {
      cancelado = true
    }
  }, [usuario, libroId, navigate])

  if (!usuario) {
    return null
  }

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  function handleAgregar(id, libroData) {
    addItem({
      idLibro: id,
      titulo: libroData.titulo,
      autor: libroData.autor,
      imagen: libroData.imagen,
      precio: libroData.precio,
    })
  }

  if (cargando) {
    return (
      <div className="tienda">
        <CabeceraTienda usuario={usuario} onLogout={handleLogout} />
        <div className="libro-detalle-contenido">
          <p role="status">Cargando libro…</p>
        </div>
      </div>
    )
  }

  if (!libro) {
    return null
  }

  return (
    <div className="tienda">
      <CabeceraTienda usuario={usuario} onLogout={handleLogout} />

      <div className="libro-detalle-contenido">
        <p className="libro-detalle-volver">
          <Link to="/tienda">← Volver</Link>
        </p>

        <FichaLibroDetalle
          libro={libro}
          libroId={libroId}
          onAgregarAlCarrito={handleAgregar}
        />
      </div>
    </div>
  )
}
