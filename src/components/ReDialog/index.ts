import type { ReDialogOptions } from './type'
import { useTimeoutFn } from '@vueuse/core'
import { withInstall } from '@/utils/global'
import reDialog from './index.vue'

const dialogStore = ref<ReDialogOptions[]>([])

/** 打开弹框 */
function addDialog(options: ReDialogOptions) {
  const open = () =>
    dialogStore.value.push(Object.assign(options, { visible: true }))
  open()
}

/** 关闭弹框 */
function closeDialog(index: number, options?: ReDialogOptions) {
  dialogStore.value[index].visible = false
  // 关闭后回调
  options?.closeCallBack && options.closeCallBack({ options, index })
  useTimeoutFn(() => {
    dialogStore.value.splice(index, 1)
  }, 200)
}

/** 关闭所有弹框 */
function closeAllDialog() {
  dialogStore.value = []
}

const ReDialog = withInstall(reDialog)

export {
  addDialog,
  closeAllDialog,
  closeDialog,
  dialogStore,
  ReDialog,
}
