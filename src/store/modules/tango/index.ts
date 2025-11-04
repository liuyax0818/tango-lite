import type { Tango, TangoState } from './types'

import { defineStore } from 'pinia'
import { store } from '@/store'

const useTangoStore = defineStore('tgl-tango', {
  state: (): TangoState => ({
    data: [],
  }),
  actions: {
    SET_TANGO(val: Tango[]) {
      this.data = val
    },
  },
})

export function useTangoStoreHook() {
  return useTangoStore(store)
}
