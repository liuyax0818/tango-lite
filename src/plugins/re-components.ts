import type { App, Component } from 'vue'
import ReIcon from '@/components/ReIcon'

const components = [
  ReIcon,
]

/** 全局注册二次封装的组件库 */
export function useReComponents(app: App) {
  // 全局注册组件
  components.forEach((component: Component) => {
    app.component(component.name, component)
  })
}
