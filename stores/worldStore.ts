import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface World {
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

interface WorldState {
  worlds: World[]
  currentWorld: World | null
  addWorld: (world: World) => void
  updateWorld: (id: string, updates: Partial<World>) => void
  deleteWorld: (id: string) => void
  setCurrentWorld: (world: World | null) => void
  likeWorld: (id: string) => void
  visitWorld: (id: string) => void
}

export const useWorldStore = create<WorldState>()(
  persist(
    (set) => ({
      worlds: [],
      currentWorld: null,
      addWorld: (world) => set((state) => ({ worlds: [...state.worlds, world] })),
      updateWorld: (id, updates) => set((state) => ({
        worlds: state.worlds.map(w => w.id === id ? { ...w, ...updates } : w)
      })),
      deleteWorld: (id) => set((state) => ({
        worlds: state.worlds.filter(w => w.id !== id)
      })),
      setCurrentWorld: (world) => set({ currentWorld: world }),
      likeWorld: (id) => set((state) => ({
        worlds: state.worlds.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w)
      })),
      visitWorld: (id) => set((state) => ({
        worlds: state.worlds.map(w => w.id === id ? { ...w, visits: w.visits + 1 } : w)
      })),
    }),
    {
      name: 'world-storage',
    }
  )
)