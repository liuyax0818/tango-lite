import type { App } from 'vue'

import { toReactive } from '@vueuse/core'
import axios from 'axios'
import { useStorage } from '@/utils/global'

const { VITE_BASE_PATH } = import.meta.env

const config: GlobalConfig = {}

/** 获取配置项 */
function getGlobalConfig<K extends keyof GlobalConfig>(k: K): GlobalConfig[K] {
  return config[k]
}

/** 存储 key 前缀 */
const stroagePrefix = () => getGlobalConfig('namespace') ?? ''

/** 注入缓存配置项 */
function injectStorageConfig(app: App) {
  const { getItem, setItem } = useStorage()
  // 当前个性化配置较少，直接扁平化即可
  let storage = getItem<StorageConfig>(`config`)
  if (!storage) {
    storage = { locale: getGlobalConfig('locale') }
  }

  setItem(`config`, storage)

  // 💡 此处要将其转为响应式，否则动态修改配置的时候不会生效
  ;(app.config.globalProperties as unknown as GlobalProperties).$storage = toReactive(storage)
}

/** 初始化全局配置，将其绑定 */
export async function initGlobalConfig(app: App): Promise<GlobalConfig> {
  // 加 t 为了强制加载，避免缓存问题
  return axios.get(`${VITE_BASE_PATH}config.json?t=${Date.now()}`).then(({ data }) => {
    if (typeof data === 'object') {
      Object.assign(config, data)
      app.config.globalProperties.$config = config
    }
    return data
  }).catch(() => {
    throw new Error('获取全局配置失败，请检查 public 目录下是否存在 config.json')
  })
}

export {
  config,
  getGlobalConfig,
  injectStorageConfig,
  stroagePrefix,
}
