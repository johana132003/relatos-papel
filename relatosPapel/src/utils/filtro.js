export  function filtrarPorTitulo(lista, texto) {
    const t = texto.trim().toLowerCase()
    if (!t) return lista
    return lista.filter((libro) => libro.titulo.toLowerCase().includes(t))
}

export function actualizarBusqueda(valor) {
    const t = valor.trim()
    if (location.pathname === '/tienda') {
        setSearchParams(t ? { q: t } : {}, { replace: true })
    } else {
        navigate({
            pathname: '/tienda',
            search: t ? `?q=${encodeURIComponent(t)}` : '',
        })
    }
}
