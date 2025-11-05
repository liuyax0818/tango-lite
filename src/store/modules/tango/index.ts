import type { Tango, TangoState } from './types'

import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { store } from '@/store'

const useTangoStore = defineStore('tgl-tango', {
  state: (): TangoState => ({
    data: [],
    ready: false,
    version: '',
  }),
  actions: {
    SET_TANGO(val: Tango[]) {
      this.data = val
    },
    UPDATE_STATUS(status: boolean) {
      this.ready = status
    },
    UPDATE_VERSION(time: number) {
      this.version = dayjs(time).format('YYYY-MM-DD')
    },
  },
})

export function useTangoStoreHook() {
  return useTangoStore(store)
}
