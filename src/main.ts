import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue'
import { initGlobalConfig, injectStorageConfig } from '@/config'
import { useReComponents } from '@/plugins/re-components'
import router from '@/router'
import { useStore } from '@/store'

import App from './App.vue'

import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

import '@/style/reset.scss'
import '@/style/index.scss'
import '@/style/tailwind.css'

const app = createApp(App)

// 初始化全局配置
initGlobalConfig(app).then(() => {
  useStore(app)
  injectStorageConfig(app)

  app
    .use(router)
    .use(MotionPlugin)
    .use(useReComponents)

  app.mount('#app')
})
