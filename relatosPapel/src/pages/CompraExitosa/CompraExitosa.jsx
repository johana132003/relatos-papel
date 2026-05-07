import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CabeceraTienda from '../../components/CabeceraTienda.jsx'
import { useAuth } from '../../context/useAuth.js'
import { formatPrecioCOP } from '../../utils/precio.js'
import '../Tienda/TiendaPage.css'
import './CompraExitosa.css'

export default function CompraExitosa() {
    const navigate = useNavigate()
    const location = useLocation()
    const { usuario, logout } = useAuth()

    const { total = 0, numeroOrden = null } = location.state ?? {}

    useEffect(() => {
        if (!usuario) {
            navigate('/', { replace: true })
        }
    }, [usuario, navigate])

    if (!usuario) return null

    function handleLogout() {
        logout()
        navigate('/', { replace: true })
    }

    return (
        <div className="tienda">
            <CabeceraTienda usuario={usuario} onLogout={handleLogout} />

            <main className="compra-exitosa">
                {/* Ícono de éxito */}
                <div className="compra-exitosa__icono" aria-hidden="true">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle cx="32" cy="32" r="32" fill="#00AE11" opacity="0.12" />
                        <circle cx="32" cy="32" r="24" fill="#00AE11" opacity="0.18" />
                        <circle cx="32" cy="32" r="16" fill="#00AE11" />
                        <path
                            d="M22 32l7 7 13-13"
                            stroke="#fff"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Título y mensaje */}
                <h1 className="compra-exitosa__titulo">¡Pago Exitoso!</h1>

                {/* Caja de resumen */}
                <div className="compra-exitosa__resumen" aria-label="Resumen de la orden">
                    <dl className="compra-exitosa__resumen-filas">
                        <div className="compra-exitosa__resumen-fila">
                            <dt>Número de orden</dt>
                            <dd className="compra-exitosa__resumen-orden">{numeroOrden}</dd>
                        </div>
                        {total > 0 && (
                            <div className="compra-exitosa__resumen-fila compra-exitosa__resumen-fila--total">
                                <dt>Total pagado</dt>
                                <dd>{formatPrecioCOP(total)}</dd>
                            </div>
                        )}
                    </dl>
                </div>

                {/* Acciones */}
                <div className="compra-exitosa__acciones">
                    <button
                        type="button"
                        className="compra-exitosa__btn compra-exitosa__btn--primario"
                        onClick={() => navigate('/tienda/perfil')}
                    >
                        Ir a mis pedidos
                    </button>
                    <button
                        type="button"
                        className="compra-exitosa__btn compra-exitosa__btn--secundario"
                        onClick={() => navigate('/tienda')}
                    >
                        Seguir comprando
                    </button>
                </div>
            </main>
        </div>
    )
}

