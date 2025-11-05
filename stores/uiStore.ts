import { create } from 'zustand'

interface UIState {
  modals: { [key: string]: boolean }
  drawers: { [key: string]: boolean }
  notifications: string[]
  setModal: (key: string, open: boolean) => void
  setDrawer: (key: string, open: boolean) => void
  addNotification: (message: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>((set) => ({
  modals: {},
  drawers: {},
  notifications: [],
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
}))