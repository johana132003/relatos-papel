export default function PaginacionCatalogo({paginaActual, totalPaginas, onChangePagina}) {
  return (
    <nav aria-label="Paginación">
      <button type="button" aria-label="Página anterior"
              onClick={() => onChangePagina(p=> p-1)}
              disabled={paginaActual ===1}>
        ←
      </button>
        <button type="button" aria-current="page">
            {paginaActual}
        </button>
      <button type="button" aria-label="Página siguiente"
              onClick={() => onChangePagina(p => p+1)}
              disabled={paginaActual === totalPaginas}>
        →
      </button>
    </nav>
  )
}
