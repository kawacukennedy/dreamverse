import { initDB } from './db'

export async function saveUser(user: any) {
  const db = await initDB()
  await db.put('users', user)
}

export async function getUser(id: string) {
  const db = await initDB()
  return await db.get('users', id)
}

export async function saveWorld(world: any) {
  const db = await initDB()
  await db.put('worlds', world)
}

export async function getWorld(id: string) {
  const db = await initDB()
  return await db.get('worlds', id)
}

export async function getAllWorlds() {
  const db = await initDB()
  return await db.getAll('worlds')
}

export async function deleteWorld(id: string) {
  const db = await initDB()
  await db.delete('worlds', id)
}

export async function saveSetting(key: string, value: any) {
  const db = await initDB()
  await db.put('settings', { key, value })
}

export async function getSetting(key: string) {
  const db = await initDB()
  const setting = await db.get('settings', key)
  return setting?.value
}