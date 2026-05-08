import CabeceraLanding from '../../components/CabeceraLanding.jsx'
import Libro from '../../components/Libro.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import './LandingPage.css'

const librosDestacados = [
  {
    titulo: 'Don Quijote de la Mancha',
    imagen: '/images/libro-don-quijote.jpg',
    autor: 'Miguel de Cervantes',
  },
  {
    titulo: 'Cruce de caminos',
    imagen: '/images/libro-cruce-caminos.jpg',
    autor: 'Naira Gamboa',
  },
  {
    titulo: 'El barco de los niños',
    imagen: '/images/el-barco.jpg',
    autor: 'Mario Vargas Llosa',
  },
]

export default function Home() {
  const { usuario, logout } = useAuth()

  return (
    <div className="landing">
      <CabeceraLanding usuario={usuario} onLogout={logout} />

      <main className="landing-principal">
        <section
          className="landing-hero"
          aria-label="Presentación de Relatos de papel"
        >
          <img
            className="landing-hero__imagen"
            src="/images/hero-landing.png"
            alt="Persona leyendo un libro en un salón con butacas"
          />
        </section>

        <section
          className="landing-exclusiva"
          aria-labelledby="landing-exclusiva-titulo"
        >
          <h2 id="landing-exclusiva-titulo">Experiencia Exclusiva</h2>
          <ul className="landing-exclusiva__lista">
            {librosDestacados.map((libro) => (
              <li key={libro.titulo}>
                <Libro {...libro} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="landing-cta" aria-labelledby="landing-cta-titulo">
        <h2 id="landing-cta-titulo">
          ¿Listo para iniciar tu viaje literario?
        </h2>
      </footer>
    </div>
  )
}
