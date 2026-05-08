import { formatPrecioCOP } from '../utils/precio.js'

export default function LineaItemCarrito({ item, onCambiarCantidad, onEliminar }) {
  return (
    <li className="carrito-linea">
      <img className="carrito-linea__img" src={item.imagen} alt="" />
      <div className="carrito-linea__info">
        <h2 className="carrito-linea__titulo">{item.titulo}</h2>
        <p className="carrito-linea__autor">{item.autor}</p>
        <div className="carrito-linea__cantidad">
          <button
            type="button"
            aria-label="Reducir cantidad"
            onClick={() => onCambiarCantidad(item.idLibro, item.cantidad - 1)}
          >
            −
          </button>
          <span>{item.cantidad}</span>
          <button
            type="button"
            aria-label="Aumentar cantidad"
            onClick={() => onCambiarCantidad(item.idLibro, item.cantidad + 1)}
          >
            +
          </button>
        </div>
      </div>
      <p className="carrito-linea__precio">
        {formatPrecioCOP(item.precioUnitario * item.cantidad)}
      </p>
      <button
        type="button"
        aria-label={`Quitar ${item.titulo} del carrito`}
        onClick={() => onEliminar(item.idLibro)}
      >
        🗑
      </button>
    </li>
  )
}
