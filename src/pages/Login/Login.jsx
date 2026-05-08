import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [correo, setCorreo] = useState('usuario@gmail.com')
  const [contrasena, setContrasena] = useState('12345')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setCargando(true)
    try {
      const res = await login(correo, contrasena)
      if (res.error) {
        setError(res.error)
        return
      }
      navigate('/tienda', { replace: true })
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="pagina-login">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-correo">Correo electrónico</label>
          <input
            id="login-correo"
            name="correo"
            type="email"
            autoComplete="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            disabled={cargando}
          />
        </div>
        <div>
          <label htmlFor="login-contrasena">Contraseña</label>
          <input
            id="login-contrasena"
            name="contrasena"
            type="password"
            autoComplete="current-password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            disabled={cargando}
          />
        </div>
        {error ? <p role="alert">{error}</p> : null}
        <button type="submit" disabled={cargando}>
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </main>
  )
}
