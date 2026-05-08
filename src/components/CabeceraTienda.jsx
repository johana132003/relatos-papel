import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useId } from 'react'
import { useCart } from '../hooks/useCart.js'
import {useBusquedaTienda} from '../hooks/useBusquedaTienda.js'

export default function CabeceraTienda({ usuario, onLogout }) {
  const idBusqueda = useId()
  const { totalArticulos } = useCart()
  const [searchParams] = useSearchParams()

  const {actualizarBusqueda} = useBusquedaTienda()
  const textoBusqueda = searchParams.get('q') ?? ''

  return (
    <header className="tienda-cabecera">
      <Link to="/tienda" className="tienda-cabecera__marca">
        <img src="/images/icono-libro.png" width="40" height="40" alt="" />
        <span className="tienda-cabecera__nombre">Relatos de papel</span>
      </Link>

      <div className="tienda-cabecera__busqueda">
        <div className="tienda-cabecera__busqueda-wrap">
          <label htmlFor={idBusqueda} className="tienda-sr-only">
            Buscar por título de libro
          </label>
          <input
            id={idBusqueda}
            type="search"
            name="q"
            placeholder="Buscar por título de libro…"
            value={textoBusqueda}
            onChange={(e) => actualizarBusqueda(e.target.value)}
            autoComplete="off"
          />
          <span className="tienda-cabecera__busqueda-icono" aria-hidden>
           
          </span>
        </div>
      </div>

      <div className="tienda-cabecera__acciones">
        <Link
          to="/tienda/carrito"
          className="tienda-cabecera__carrito-link"
          aria-label={`Carrito, ${totalArticulos} artículos`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1" fill="currentColor" />
            <circle cx="18" cy="20" r="1" fill="currentColor" />
          </svg>
          <span aria-hidden> ({totalArticulos})</span>
        </Link>



        <Link
          to="/tienda/perfil"
          className="tienda-cabecera__perfil"
          aria-label="Ver mi perfil"
        >
          <span className="tienda-cabecera__perfil-icono" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M5 20c1.5-4 13.5-4 15 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            className="tienda-cabecera__usuario"
            title={usuario.correo}
          >
            {usuario.nombre || usuario.correo}
          </span>
        </Link>
        <button type="button" onClick={onLogout}>
          Salir
        </button>
      </div>
    </header>
  )
}
