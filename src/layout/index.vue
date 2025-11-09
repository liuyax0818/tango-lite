<script setup lang='ts'>
import type { Tango } from '@/store/modules/tango/types'
import axios from 'axios'
import { useTangoStoreHook } from '@/store'
import { useStorage } from '@/utils/global'
import '@/components/ReIcon/src/offlineIcons'

defineOptions({
  name: 'Layout',
})

const { VITE_BASE_PATH } = import.meta.env
const tangoStore = useTangoStoreHook()

const { getItem, setItem } = useStorage()

function initTangoStore() {
  axios.get<Tango[]>(`${VITE_BASE_PATH}tango.json?t=${Date.now()}`)
    .then(({ data }) => {
      if (Array.isArray(data)) {
        setItem('tango-data', data)
        setItem('tango-status', true)
        setItem('tango-version', Date.now())
        tangoStore.SET_TANGO(data)
        tangoStore.UPDATE_STATUS(true)
        tangoStore.UPDATE_VERSION(Date.now())
      }
    })
    .catch((err) => {
      console.log(err)
      tangoStore.UPDATE_STATUS(false)
    })
}

const isCache = getItem<boolean>('tango-status')
const lastUpdate = getItem<number>('tango-version')

// 8 小时更新一次词库
if (isCache && (Date.now() - lastUpdate < 28800000)) {
  tangoStore.SET_TANGO(getItem<Tango[]>('tango-data'))
  tangoStore.UPDATE_STATUS(true)
  tangoStore.UPDATE_VERSION(lastUpdate)
}
else {
  initTangoStore()
}
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
  min-height: 600px;
}

.main-content {
  width: 100%;
  height: 100%;
}
</style>
