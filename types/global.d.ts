import type { Reactive } from 'vue'

declare global {

  /** 全局 Vite 环境变量 */
  interface VITE_ENV {
    VITE_PORT: number
    VITE_BASE_PATH: string
    VITE_ROUTER_MODE: string
    VITE_API_BASE_URL: string
  }

  interface GlobalConfig {
    /** 版本号 */
    version?: string
    /** 默认语言 */
    locale?: string
    /** 本地存储命名空间 */
    namespace?: string
  }

  /** 工程构建信息 */
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
    }
    author: {
      name: string
      email: string
      url: string
    }
    build: {
      commit: string
      time: string
    }
  }

  interface StorageConfig {
    locale: string
  }

  interface GlobalProperties {
    /** 原始配置 */
    $config: GlobalConfig
    /** 缓存配置，响应式 */
    $storage: Reactive<StorageConfig>
  }

}

declare module 'vue-router' {
  // 扩展路由元信息类型
  interface RouteMeta {
    pid?: string | number
    title?: string
    i18n?: string
    icon?: string
    rank?: number
    id?: string
    hide?: boolean
  }
}

export {}
