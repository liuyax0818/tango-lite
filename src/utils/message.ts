import type { ElMessageBoxOptions } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

type messageTypes = 'info' | 'success' | 'warning' | 'error'

interface MessageParams {
  /** 消息类型，可选 `info` 、`success` 、`warning` 、`error` ，默认 `success` */
  type?: messageTypes
  /** 是否纯色，默认 `true` */
  plain?: boolean
  /** 自定义图标，该属性会覆盖 `type` 的图标 */
  icon?: any
  /** 是否将 `message` 属性作为 `HTML` 片段处理，默认 `false` */
  dangerouslyUseHTMLString?: boolean
  /** 显示时间，单位为毫秒。设为 `0` 则不会自动关闭，默认 `2000` */
  duration?: number
  /** 是否显示关闭按钮，默认值 `false` */
  showClose?: boolean
  /** `Message` 距离窗口顶部的偏移量，默认 `16` */
  offset?: number
  /** 设置组件的根元素，默认 `document.body` */
  appendTo?: string | HTMLElement
  /** 合并内容相同的消息，不支持 `VNode` 类型的消息，默认值 `false` */
  grouping?: boolean
  /** 重复次数，类似于 `Badge` 。当和 `grouping` 属性一起使用时作为初始数量使用，默认值 `1` */
  repeatNum?: number
  /** 关闭时的回调函数, 参数为被关闭的 `message` 实例 */
  onClose?: () => void | null
}

/**
 * `Message` 消息提示函数
 */
function message(message: string | VNode | (() => VNode), params: MessageParams = {}) {
  const {
    icon,
    type = 'success',
    plain = true,
    dangerouslyUseHTMLString = false,
    duration = 2000,
    showClose = false,
    offset = 16,
    appendTo = document.body,
    grouping = false,
    repeatNum = 1,
    onClose,
  } = params

  return ElMessage({
    message,
    icon,
    type,
    plain,
    dangerouslyUseHTMLString,
    duration,
    showClose,
    offset,
    appendTo,
    grouping,
    repeatNum,
    onClose: () => (onClose?.()),
  })
}

/**
 * 关闭所有 `Message` 消息提示函数
 */
function closeAllMessage() {
  ElMessage.closeAll()
}

/**
 * 原生 `ElMessageBox()`，点击确定返回 `true`，取消返回 `false`，不再抛异常，
 * 并预设了一些参数
 */
function SafeMessageBox(parma: ElMessageBoxOptions): Promise<boolean> {
  const defaultParam: ElMessageBoxOptions = {
    closeOnClickModal: false,
    closeOnPressEscape: false,
    closeOnHashChange: false,
  }
  return new Promise((resolve) => {
    ElMessageBox({ ...defaultParam, ...parma })
      .then(() => resolve(true))
      .catch(() => resolve(false))
  })
}

export { closeAllMessage, message, SafeMessageBox }
