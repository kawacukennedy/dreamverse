import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  modals: { [key: string]: boolean }
  drawers: { [key: string]: boolean }
  notifications: string[]
  theme: 'dark' | 'light'
  setModal: (key: string, open: boolean) => void
  setDrawer: (key: string, open: boolean) => void
  addNotification: (message: string) => void
  clearNotifications: () => void
  setTheme: (theme: 'dark' | 'light') => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      modals: {},
      drawers: {},
      notifications: [],
      theme: 'dark',
      setModal: (key, open) => set((state) => ({
        modals: { ...state.modals, [key]: open }
      })),
      setDrawer: (key, open) => set((state) => ({
        drawers: { ...state.drawers, [key]: open }
      })),
      addNotification: (message) => set((state) => ({
        notifications: [...state.notifications, message]
      })),
      clearNotifications: () => set({ notifications: [] }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)