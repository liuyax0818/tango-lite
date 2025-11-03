declare module 'vue' {
  /**
   * 自定义组件全局类型提示
   */
  export interface GlobalComponents {
    ReIcon: typeof import('@/components/ReIcon')['default']
  }
}

export {}
