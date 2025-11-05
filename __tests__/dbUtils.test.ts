import { describe, it, expect, beforeEach } from 'vitest'
import { saveWorld, getWorld, getAllWorlds } from '../lib/dbUtils'

// Mock IndexedDB
const indexedDB = require('fake-indexeddb')
global.indexedDB = indexedDB

describe('dbUtils', () => {
  beforeEach(async () => {
    // Clear DB before each test
    const db = await indexedDB.open('dreamverse_db_v1')
    const stores = ['users', 'worlds', 'assets', 'settings', 'leaderboard']
    for (const store of stores) {
      if (db.objectStoreNames.contains(store)) {
        const transaction = db.transaction([store], 'readwrite')
        const objectStore = transaction.objectStore(store)
        objectStore.clear()
      }
    }
    db.close()
  })

  it('should save and get a world', async () => {
    const world = {
      id: 'test-world',
      ownerId: 'user1',
      title: 'Test World',
      objects: [],
      createdAt: new Date().toISOString(),
    }

    await saveWorld(world)
    const retrieved = await getWorld('test-world')
    expect(retrieved).toEqual(world)
  })

  it('should get all worlds', async () => {
    const world1 = { id: 'world1', ownerId: 'user1', title: 'World 1', objects: [], createdAt: new Date().toISOString() }
    const world2 = { id: 'world2', ownerId: 'user2', title: 'World 2', objects: [], createdAt: new Date().toISOString() }

    await saveWorld(world1)
    await saveWorld(world2)

    const worlds = await getAllWorlds()
    expect(worlds).toHaveLength(2)
    expect(worlds).toContainEqual(world1)
    expect(worlds).toContainEqual(world2)
  })
})