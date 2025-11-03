<script setup lang="ts">
import type { ButtonProps, ReDialogOptions } from './type'
import { closeDialog, dialogStore } from './index'

defineOptions({
  name: 'ReDialog',
})
const sureBtnMap = ref<{ [K: number]: { loading: boolean } }>({})

const footerButtons = computed<ButtonProps[]>(() => {
  return [
    {
      label: '取消',
      btnClick: ({ options, index }) => {
        const done = () => closeDialog(index, options)
        if (options?.beforeCancel) {
          options.beforeCancel(done, { options, index })
        }
        else {
          done()
        }
      },
    },
    {
      label: '确定',
      type: 'primary',
      btnClick: ({ options, index }) => {
        if (options?.sureBtnLoading) {
          sureBtnMap.value[index] = { loading: true }
        }
        const closeLoading = () => {
          if (options?.sureBtnLoading) {
            sureBtnMap.value[index].loading = false
          }
        }
        const done = () => {
          closeLoading()
          closeDialog(index, options)
        }

        if (options?.beforeSure) {
          options.beforeSure(done, { options, index, closeLoading })
        }
        else {
          done()
        }
      },
    },
  ]
})
</script>

<template>
  <el-dialog
    v-for="(options, index) in dialogStore"
    :key="`reDialog-${index}`"
    v-model="options.visible"
    class="re-dialog"
    width="400px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    v-bind="options"
    @closed="closeDialog(index, options)"
  >
    <!-- header -->
    <template
      v-if="options?.headerRenderer"
      #header="{ close, titleId, titleClass }"
    >
      <component :is="options?.headerRenderer({ close, titleId, titleClass })" />
    </template>

    <!-- content -->
    <component :is="options.contentRenderer({ options, index })" />

    <!-- footer -->
    <template v-if="!options?.hideFooter" #footer>
      <template v-if="!options?.footerRenderer">
        <el-button
          v-for="(btn, key) in footerButtons" :key="`reDialog-footer-${key}`"
          v-bind="btn"
          :loading="key === 1 && sureBtnMap[index]?.loading"
          @click="btn.btnClick({ options, index })"
        >
          {{ btn?.label }}
        </el-button>
      </template>
      <component :is="options?.footerRenderer({ options, index })" v-else />
    </template>
  </el-dialog>
</template>
