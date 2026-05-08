import usersData from '../utils/mockUsers.json'
import { delay, ok, fail } from './apiClient.js'

/** GET /users/:id */
export async function getUserDetail(userId) {
  await delay(300)
  const user = usersData.users.find((u) => u.id === userId)
  if (!user) {
    return fail('Usuario no encontrado', 404)
  }
  return ok({
    id: user.id,
    email: user.email,
    nombre: user.nombre,
    telefono: user.telefono,
    direccion: user.direccion,
    ciudad: user.ciudad,
  })
}
