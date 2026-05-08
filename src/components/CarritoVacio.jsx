import { Link } from 'react-router-dom'

export default function CarritoVacio() {
  return (
    <div className="carrito-vacio">
      <p>No hay productos en el carrito.</p>
      <p>
        <Link to="/tienda">Ir al catálogo</Link>
      </p>
    </div>
  )
}
