<script setup lang='ts'>
import { useTangoStoreHook } from '@/store'

defineOptions({
  name: 'Home',
})

const router = useRouter()
const tangoStore = useTangoStoreHook()

const tangoStatus = computed(() => {
  return tangoStore.ready ? '正常' : '异常'
})

function onStart() {
  router.push('/order')
}
</script>

<route lang="json5">
{
  name: "home",
  path: "/home",
  meta: {
    title: "主页",
  }
}
</route>

<template>
  <div class="relative flex flex-col items-center pt-[30vh] bg-sky-200">
    <div class="text-3xl font-bold">
      Tango Lite
    </div>
    <div class="w-[50vw] mt-[30px]">
      <el-button plain size="large" class="w-full" type="primary" @click="onStart">
        开刷！！！
      </el-button>
    </div>

    <div class="footer-info text-xs">
      <div class="mb-1">
        <a href="https://github.com/liuyax0818/tango-lite" target="_blank">
          GitHub
        </a>
      </div>
      <div class="flex gap-2">
        <div>
          <span>词库量：</span>
          <span>
            {{ tangoStore.data.length }}
          </span>
        </div>
        <div>
          <span>状态：</span>
          <span
            :class="[tangoStore.ready ? 'text-green-400' : 'text-red-400 font-bold']"
          >
            {{ tangoStatus }}
          </span>
        </div>
        <div>
          <span>版本：</span>
          <span>
            {{ tangoStore.version }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.footer-info {
  position: absolute;
  bottom: 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
}
</style>
