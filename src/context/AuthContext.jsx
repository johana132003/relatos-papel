import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './authContext.js'
import { login as loginApi } from '../services/authService.js'

const STORAGE_KEY = 'relatos-auth'

function leerUsuarioGuardado() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    sessionStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado)

  const login = useCallback(async (correo, contrasena) => {
    const res = await loginApi({
      email: correo,
      password: contrasena,
    })
    if (res.error) {
      return res
    }
    const u = res.data.user
    const datos = {
      userId: u.id,
      correo: u.email,
      nombre: u.nombre,
    }
    setUsuario(datos)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
    return res
  }, [])

  const logout = useCallback(() => {
    setUsuario(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({ usuario, login, logout }),
    [usuario, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
