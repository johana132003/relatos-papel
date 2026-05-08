export default function FichaLibroDetalle({
  libro,
  libroId,
  onAgregarAlCarrito,
}) {
  return (
    <article className="libro-detalle-ficha">
      <img
        className="libro-detalle-ficha__portada"
        src={libro.imagen}
        alt={`Portada: ${libro.titulo}`}
      />
      <div className="libro-detalle-ficha__texto">
        <h1 className="libro-detalle-ficha__titulo">{libro.titulo}</h1>
        <p className="libro-detalle-ficha__autor">{libro.autor}</p>
        <p className="libro-detalle-ficha__precio">{libro.precio}</p>
        <p className="libro-detalle-ficha__reseñas">
        </p>
        <h2 className="libro-detalle-ficha__subtitulo">Descripción</h2>
        <p className="libro-detalle-ficha__descripcion">{libro.descripcion}</p>
        <p>
          <button type="button" onClick={() => onAgregarAlCarrito(libroId, libro)}>
            Agregar al carrito
          </button>
        </p>
      </div>
    </article>
  )
}
