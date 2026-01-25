import { defineStore } from 'pinia'
import { store } from '@/store'
import { useStorage } from '@/utils/global'

const useUserStore = defineStore('tgl-user', {
  state: (): UserInfo => ({
    currentIndex: useStorage().getItem('currIndex') ?? 1,
    testIndex: useStorage().getItem('testIndex') ?? 1,
    retryIds: useStorage().getItem('retryIds') ?? [],
  }),
  actions: {
    /** 更新顺序进度 */
    UPDATE_PROGRESS(cur: number) {
      this.currentIndex = cur
      useStorage().setItem('currIndex', cur)
    },
    /** 更新测试进度 */
    UPDATE_TEST(cur: number) {
      this.testIndex = cur
      useStorage().setItem('testIndex', cur)
    },
    /** 更新错题列表 */
    UPDATE_RETRY_IDS(ids: number[]) {
      this.retryIds = ids
      useStorage().setItem('retryIds', ids)
    },
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
