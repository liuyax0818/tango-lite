import type { Tango, TangoState } from './types'

import { defineStore } from 'pinia'
import { store } from '@/store'

const useTangoStore = defineStore('tgl-tango', {
  state: (): TangoState => ({
    data: [],
    ready: false,
  }),
  actions: {
    SET_TANGO(val: Tango[]) {
      this.data = val
    },
    UPDATE_STATUS(status: boolean) {
      this.ready = status
    },
  },
})

export function useTangoStoreHook() {
  return useTangoStore(store)
}
