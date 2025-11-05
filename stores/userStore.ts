import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
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

interface UserState {
  user: User | null
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'user-storage',
    }
  )
)