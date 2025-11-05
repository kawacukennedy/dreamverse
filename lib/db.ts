import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface DreamVerseDB extends DBSchema {
  users: {
    key: string
    value: {
      id: string
      username: string
      displayName: string
      avatarData: any
      preferences: any
      badges: string[]
      worldsOwned: string[]
      createdAt: string
      updatedAt: string
    }
    indexes: { username: string, createdAt: string }
  }
  worlds: {
    key: string
    value: {
      id: string
      ownerId: string
      title: string
      description: string
      thumbnail: string
      background: any
      music: any
      objects: any[]
      particles: any
      likes: number
      visits: number
      createdAt: string
      updatedAt: string
      visibility: 'public' | 'private'
    }
    indexes: { ownerId: string, title: string, createdAt: string }
  }
  assets: {
    key: string
    value: any
    indexes: { type: string }
  }
  settings: {
    key: string
    value: any
  }
  leaderboard: {
    key: string
    value: any
  }
}

let db: IDBPDatabase<DreamVerseDB> | null = null

export async function initDB() {
  if (db) return db

  db = await openDB<DreamVerseDB>('dreamverse_db_v1', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'id' })
        userStore.createIndex('username', 'username', { unique: true })
        userStore.createIndex('createdAt', 'createdAt')
      }

      if (!db.objectStoreNames.contains('worlds')) {
        const worldStore = db.createObjectStore('worlds', { keyPath: 'id' })
        worldStore.createIndex('ownerId', 'ownerId')
        worldStore.createIndex('title', 'title')
        worldStore.createIndex('createdAt', 'createdAt')
      }

      if (!db.objectStoreNames.contains('assets')) {
        const assetStore = db.createObjectStore('assets', { keyPath: 'key' })
        assetStore.createIndex('type', 'type')
      }

      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' })
      }

      if (!db.objectStoreNames.contains('leaderboard')) {
        db.createObjectStore('leaderboard', { keyPath: 'weekStart' })
      }
    },
  })

  return db
}

export { db }