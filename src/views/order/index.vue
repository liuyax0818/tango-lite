<script setup lang='ts'>
import { useTangoStoreHook } from '@/store'

defineOptions({
  name: 'Order',
})

const router = useRouter()
const tangoStore = useTangoStoreHook()

const tangos = computed(() => {
  return tangoStore.data
})

const config = reactive({
  hideTranslate: false,
  hideKana: false,
  hideType: false,
})

const currData = ref<number>(1)
const redirect = ref<string>('')

function onRedirect() {
  // TODO: 跳转校验
  currData.value = Number(redirect.value.trim())
  redirect.value = ''
}

function onBack() {
  router.push('/home')
}
</script>

<route lang="json5">
{
  name: "Order",
  path: "/order",
  meta: {
    title: "顺序模式",
  }
}
</route>

<template>
  <div v-if="tangos.length > 0" class="bg-sky-100 relative p-4">
    <!-- Banner -->
    <div class="text-sm">
      <span class="mr-2">
        {{ currData }} / {{ tangos.length }}
      </span>
    </div>

    <div class="w-full flex flex-col items-center mt-[15vh] text-center">
      <div v-if="!config.hideKana" class="text-lg text-gray-500">
        {{ tangos[currData - 1].kana }}
      </div>
      <div class="text-4xl text-blue-500 mt-2">
        {{ tangos[currData - 1].text }}
      </div>
      <div v-if="!config.hideType" class="text-lg text-gray-500 mt-2">
        {{ tangos[currData - 1].type.join(', ') }}
      </div>
      <div v-if="!config.hideTranslate" class="mt-3 text-xl">
        {{ tangos[currData - 1].translates.join('；') }}
      </div>

      <div class="mt-8">
        <el-button
          plain
          size="large"
          type="primary"
          :disabled="currData === 1"
          @click="currData--"
        >
          上一个
        </el-button>
        <el-button
          size="large"
          type="primary"
          :disabled="currData === tangos.length"
          @click="currData++"
        >
          下一个
        </el-button>
      </div>
    </div>

    <div class="absolute bottom-[5vh]">
      <el-form @submit.prevent>
        <el-form-item label="隐藏假名">
          <el-switch v-model="config.hideKana" />
        </el-form-item>
        <el-form-item label="隐藏翻译">
          <el-switch v-model="config.hideTranslate" />
        </el-form-item>
        <el-form-item label="隐藏词性">
          <el-switch v-model="config.hideType" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="redirect" type="tel" class="w-[150px]!">
            <template #append>
              <el-button @click="onRedirect">
                GO!
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="onBack">
            返回首页
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <div v-else class="flex flex-col items-center bg-orange-200 pt-[30vh]">
    <div class="text-2xl font-bold">
      无单词可刷！
    </div>
    <div class="w-[50vw] mt-4">
      <el-button
        plain
        type="primary"
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
</style>
