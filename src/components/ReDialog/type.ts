import type { CSSProperties } from 'vue'

type DoneFn = (cancel?: boolean) => void

interface ButtonProps {
/** 按钮文字 */
  label: string
  /** 按钮尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 按钮类型 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /** 是否为朴素按钮，默认 `false` */
  plain?: boolean
  /** 是否为文字按钮，默认 `false` */
  text?: boolean
  /** 是否显示文字按钮背景颜色，默认 `false` */
  bg?: boolean
  /** 是否为加载中状态，默认 `false` */
  loading?: boolean
  /** 按钮是否为禁用状态，默认 `false` */
  disabled?: boolean
  /** 自定义按钮颜色, 并自动计算 `hover` 和 `active` 触发后的颜色 */
  color?: string
  /** `dark` 模式, 意味着自动设置 `color` 为 `dark` 模式的颜色，默认 `false` */
  dark?: boolean
  /** 点击按钮后触发的回调 */
  btnClick?: (payload: { options: ReDialogOptions, index: number }) => void
}

/** 原生 el-dialog 参数 */
interface DialogProps {
  /** `Dialog` 的显示与隐藏 */
  visible?: boolean
  /** `Dialog` 的标题 */
  title?: string
  /** `Dialog` 的宽度，默认 `400px` */
  width?: string | number
  /** 是否为全屏 `Dialog`（会一直处于全屏状态，除非弹框关闭），默认 `false`，`fullscreen` 和 `fullscreenIcon` 都传时只有 `fullscreen` 会生效 */
  fullscreen?: boolean
  /** 是否显示全屏操作图标，默认 `false`，`fullscreen` 和 `fullscreenIcon` 都传时只有 `fullscreen` 会生效 */
  fullscreenIcon?: boolean
  /** `Dialog CSS` 中的 `margin-top` 值，默认 `15vh` */
  top?: string
  /** 是否需要遮罩层，默认 `true` */
  modal?: boolean
  /** `Dialog` 自身是否插入至 `body` 元素上。嵌套的 `Dialog` 必须指定该属性并赋值为 `true`，默认 `false` */
  appendToBody?: boolean
  /** 是否在 `Dialog` 出现时将 `body` 滚动锁定，默认 `true` */
  lockScroll?: boolean
  /** `Dialog` 的自定义类名 */
  class?: string
  /** `Dialog` 的自定义样式 */
  style?: CSSProperties
  /** 是否可以通过点击 `modal` 关闭 `Dialog`，默认 `false` */
  closeOnClickModal?: boolean
  /** 是否可以通过按下 `ESC` 关闭 `Dialog`，默认 `false` */
  closeOnPressEscape?: boolean
  /** 是否显示关闭按钮，默认 `true` */
  showClose?: boolean
  /** 关闭前的回调，会暂停 `Dialog` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
  beforeClose?: (done: DoneFn) => void
  /** 为 `Dialog` 启用可拖拽功能，默认 `false` */
  draggable?: boolean
  /** 是否让 `Dialog` 的 `header` 和 `footer` 部分居中排列，默认 `false` */
  center?: boolean
  /** 是否水平垂直对齐对话框，默认 `false` */
  alignCenter?: boolean
  /** 当关闭 `Dialog` 时，销毁其中的元素，默认 `true` */
  destroyOnClose?: boolean
}

interface ReDialogOptions extends DialogProps {
  /** 是否隐藏底部，优先级最高，会覆盖 `footerRenderer` */
  hideFooter?: boolean
  /** 点击确定按钮后是否开启 `loading` 加载动画 */
  sureBtnLoading?: boolean
  /** 点击底部确定按钮回调 */
  beforeSure?: (done: () => void, payload: { options: ReDialogOptions, index: number, closeLoading: () => void }) => void
  /** 点击底部取消按钮回调 */
  beforeCancel?: (done: () => void, payload: { options: ReDialogOptions, index: number }) => void
  /** 对话框关闭时回调 */
  closeCallBack?: (payload: { options?: ReDialogOptions, index: number }) => void
  /** 自定义标题渲染器 */
  headerRenderer?: (payload: { close: () => void, titleId: string, titleClass: string }) => VNode | Component
  /** 自定义内容渲染器 */
  contentRenderer: (payload: { options: ReDialogOptions, index: number }) => VNode | Component
  /** 自定义底部渲染器，会覆盖默认按钮 */
  footerRenderer?: (payload: { options: ReDialogOptions, index: number }) => VNode | Component
}

export type { ButtonProps, ReDialogOptions }
