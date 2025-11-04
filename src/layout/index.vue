<script setup lang='ts'>
import type { Tango } from '@/store/modules/tango/types'
import axios from 'axios'
import { useTangoStoreHook } from '@/store'
import '@/components/ReIcon/src/offlineIcons'

defineOptions({
  name: 'Layout',
})

const { VITE_BASE_PATH } = import.meta.env
const tangoStore = useTangoStoreHook()

function initTangoStore() {
  axios.get<Tango[]>(`${VITE_BASE_PATH}tango.json?t=${Date.now()}`)
    .then(({ data }) => {
      if (Array.isArray(data)) {
        tangoStore.SET_TANGO(data)
        tangoStore.UPDATE_STATUS(true)
      }
    })
    .catch((err) => {
      console.log(err)
      tangoStore.UPDATE_STATUS(false)
    })
}

// TODO: 缓存优化
initTangoStore()
</script>

<template>
  <div class="lay-wrapper">
    <router-view class="main-content" />
  </div>
</template>

<style lang='scss' scoped>
.lay-wrapper {
  position: relative;
  height: 100%;
}

.main-content {
  width: 100%;
  height: 100%;
}
</style>
