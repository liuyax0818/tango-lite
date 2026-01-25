<script setup lang='ts'>
import { useTangoStoreHook } from '@/store/modules/tango'
import { useUserStoreHook } from '@/store/modules/user'

defineOptions({
  name: 'Retry',
})

const router = useRouter()
const userStore = useUserStoreHook()
const tangoStore = useTangoStoreHook()

const tangos = computed(() => {
  return tangoStore.data
})

const config = reactive({
  showTranslate: true,
  showKana: true,
  showType: true,
})

const currData = ref<number>(1)

function onResolve() {

}

function onBack() {
  router.push('/home')
}
</script>

<route lang="json5">
{
  name: "Retry",
  path: "/retry",
  meta: {
    title: "错题重练",
  }
}
</route>

<template>
  <div v-if="tangos.length > 0" class="bg-orange-100 relative p-4">
    <!-- Banner -->
    <div class="text-sm">
      <span class="mr-2">
        {{ currData }} / {{ tangos.length }}
      </span>
    </div>

    <div class="w-full flex flex-col items-center mt-[15vh] text-center">
      <div v-if="config.showKana" class="text-lg text-gray-500">
        {{ tangos[currData - 1].kana }}
      </div>
      <div class="text-4xl text-orange-500 mt-2">
        {{ tangos[currData - 1].text }}
      </div>
      <div v-if="config.showType" class="text-lg text-gray-500 mt-2">
        {{ tangos[currData - 1].type.join(', ') }}
      </div>
      <div v-if="config.showTranslate" class="mt-3 text-xl">
        {{ tangos[currData - 1].translates.join('；') }}
      </div>

      <div class="mt-8 w-60 flex flex-col gap-3">
        <div>
          <el-button
            plain
            size="large"
            type="warning"
            class="w-full"
            :disabled="currData === 1"
            @click="currData--"
          >
            上一个
          </el-button>
        </div>
        <div>
          <el-button
            size="large"
            type="warning"
            class="w-full"
            @click="onResolve"
          >
            解决
          </el-button>
        </div>
        <div>
          <el-button
            plain
            size="large"
            type="warning"
            class="w-full"
            :disabled="currData === tangos.length"
            @click="currData++"
          >
            下一个
          </el-button>
        </div>
      </div>
    </div>

    <div class="absolute bottom-[5vh]">
      <el-form @submit.prevent>
        <el-form-item label="显示假名">
          <el-switch v-model="config.showKana" />
        </el-form-item>
        <el-form-item label="显示翻译">
          <el-switch v-model="config.showTranslate" />
        </el-form-item>
        <el-form-item label="显示词性">
          <el-switch v-model="config.showType" />
        </el-form-item>
        <el-form-item>
          <el-button plain type="warning" @click="onBack">
            返回首页
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <div v-else class="flex flex-col items-center bg-orange-200 pt-[30vh]">
    <div class="text-2xl font-bold">
      无错题可刷！
    </div>
    <div class="w-[50vw] mt-4">
      <el-button
        plain
        type="warning"
        class="w-full"
        size="large"
        @click="onBack"
      >
        返回首页
      </el-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.el-form-item {
  margin-bottom: 5px;
}

.el-switch {
  --el-switch-on-color: var(--el-color-warning);
}
</style>
