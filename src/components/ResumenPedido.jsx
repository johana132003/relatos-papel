import { formatPrecioCOP } from '../utils/precio.js'

export default function ResumenPedido({
  variant,
  Tag = 'aside',
  idTitulo,
  subtotal,
  total,
  children,
}) {
  const base = variant === 'carrito' ? 'carrito-resumen' : 'checkout-resumen'

  return (
    <Tag className={base} aria-labelledby={idTitulo}>
      <h2 id={idTitulo} className={`${base}__titulo`}>
        Resumen del pedido
      </h2>
      <dl className={`${base}__filas`}>
        <div className={`${base}__fila`}>
          <dt>Subtotal</dt>
          <dd>{formatPrecioCOP(subtotal)}</dd>
        </div>
        <div className={`${base}__fila`}>
          <dt>Envío</dt>
          <dd className={`${base}__gratis`}>Gratis</dd>
        </div>
        <div className={`${base}__fila ${base}__fila--total`}>
          <dt>Total</dt>
          <dd>{formatPrecioCOP(total)}</dd>
        </div>
      </dl>
      {children}
    </Tag>
  )
}
