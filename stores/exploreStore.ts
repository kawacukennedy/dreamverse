import { create } from 'zustand'

interface ExploreState {
  feed: any[]
  pagination: { page: number, hasMore: boolean }
  loadMore: () => void
  setFeed: (feed: any[]) => void
}

export const useExploreStore = create<ExploreState>((set) => ({
  feed: [],
  pagination: { page: 1, hasMore: true },
  loadMore: () => set((state) => ({
    pagination: { ...state.pagination, page: state.pagination.page + 1 }
  })),
  setFeed: (feed) => set({ feed }),
}))