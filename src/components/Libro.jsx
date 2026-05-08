export default function Libro({ titulo, imagen, autor }) {
  return (
    <article className="landing-exclusiva__libro">
      <img src={imagen} alt={`Portada: ${titulo}`} />
      <h3>{titulo}</h3>
      {autor ? <p>{autor}</p> : null}
    </article>
  )
}
