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
  isLoggedIn: boolean
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  login: (username: string, password: string) => Promise<boolean>
  signup: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }) => Promise<boolean>
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: true }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      login: async (username, password) => {
        // Mock login - in real app, check against stored users
        const storedUsers = JSON.parse(localStorage.getItem('dreamverse_users') || '[]')
        const user = storedUsers.find((u: any) => u.username === username && u.password === password)
        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({ user: userWithoutPassword, isLoggedIn: true })
          return true
        }
        return false
      },
      signup: async (userData) => {
        const storedUsers = JSON.parse(localStorage.getItem('dreamverse_users') || '[]')
        if (storedUsers.some((u: any) => u.username === userData.username)) {
          return false // Username exists
        }
        const newUser = {
          ...userData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        storedUsers.push(newUser)
        localStorage.setItem('dreamverse_users', JSON.stringify(storedUsers))
        const { password: _, ...userWithoutPassword } = newUser
        set({ user: userWithoutPassword, isLoggedIn: true })
        return true
      },
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    }
  )
)