import { useNavigate } from 'react-router-dom'

export default function CabeceraLanding({ usuario, onLogout }) {
  const navigate = useNavigate()

  return (
    <header className="landing-cabecera">
      <div className="landing-cabecera__marca">
        <img
          className="landing-cabecera__logo"
          src="/images/icono-libro.png"
          width="48"
          height="48"
          alt=""
        />
        <p className="landing-cabecera__nombre">Relatos de papel</p>
      </div>
      <div className="landing-cabecera__acciones">
        {usuario ? (
          <>
            <p className="landing-cabecera__usuario">{usuario.correo}</p>
            <button type="button" onClick={() => navigate('/tienda')}>
              Ir al catálogo
            </button>
            <button type="button" onClick={onLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <button type="button" onClick={() => navigate('/login')}>
            Iniciar sesión
          </button>
        )}
      </div>
    </header>
  )
}
