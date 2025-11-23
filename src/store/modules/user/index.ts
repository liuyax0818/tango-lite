import { defineStore } from 'pinia'
import { store } from '@/store'
import { useStorage } from '@/utils/global'

const useUserStore = defineStore('tgl-user', {
  state: (): UserInfo => ({
    currentIndex: useStorage().getItem('currIndex') ?? 1,
  }),
  actions: {
    UPDATE_PROGRESS(cur: number) {
      this.currentIndex = cur
      useStorage().setItem('currIndex', cur)
    },
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
