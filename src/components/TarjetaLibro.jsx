import { Link } from 'react-router-dom'

export default function TarjetaLibro({ id, titulo, autor, imagen, precio }) {
  return (
    <Link to={`/tienda/libro/${id}`} className="tarjeta-libro-enlace">
      <article className="tarjeta-libro">
        <img
          className="tarjeta-libro__portada"
          src={imagen}
          alt={`Portada: ${titulo}`}
        />
        <h3 className="tarjeta-libro__titulo">{titulo}</h3>
        <p className="tarjeta-libro__autor">{autor}</p>
        <p className="tarjeta-libro__precio">{precio}</p>
      </article>
    </Link>
  )
}
