import usersData from '../utils/mockUsers.json'
import { delay, ok, fail } from './apiClient.js'

/**
 * POST /auth/login
 * @param {{ email: string, password: string }} credentials
 */
export async function login(credentials) {
  await delay(420)
  const email = String(credentials?.email ?? '')
    .trim()
    .toLowerCase()
  const password = String(credentials?.password ?? '')

  const user = usersData.users.find(
    (u) => u.email.toLowerCase() === email && u.password === password,
  )

  if (!user) {
    return fail('Correo o contraseña incorrectos.', 401)
  }

  return ok({
    user: {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      telefono: user.telefono,
      direccion: user.direccion,
      ciudad: user.ciudad,
    },
  })
}
