<script setup lang='ts'>
defineOptions({
  name: 'Order',
})

interface Tango {
  id: number
  kana: string
  text: string
  type: string[]
  translates: string[]
  unit?: any
}

const config = reactive({
  hideTranslate: false,
  hideKana: false,
  hideType: false,
})

const currData = ref<number>(0)

const tangos = reactive<Tango[]>([
  {
    id: 1,
    kana: 'つくえ',
    text: '机',
    type: ['名'],
    translates: ['桌子，书桌'],
  },
  {
    id: 2,
    kana: 'あります',
    text: 'あります',
    type: ['动1'],
    translates: ['有，在（非意志者）'],
  },
  {
    id: 3,
    kana: 'きたない',
    text: '汚い',
    type: ['形1'],
    translates: ['脏'],
  },
  {
    id: 4,
    kana: 'かんこうきゃく',
    text: '観光客',
    type: ['名'],
    translates: ['游客'],
  },
  {
    id: 5,
    kana: 'げんき',
    text: '元気',
    type: ['形2'],
    translates: ['健康，有精神'],
  },
  {
    id: 6,
    kana: 'たしか',
    text: '確か',
    type: ['副'],
    translates: ['好像是，大概', '的确'],
  },
])
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
  <div class="bg-sky-100 relative p-4">
    <!-- Banner -->
    <div class="text-sm">
      {{ currData + 1 }} / {{ tangos.length }}
    </div>

    <div class="w-full flex flex-col items-center mt-[15vh]">
      <div v-if="!config.hideKana" class="text-lg text-gray-500">
        {{ tangos[currData].kana }}
      </div>
      <div class="text-4xl text-blue-500 mt-2">
        {{ tangos[currData].text }}
      </div>
      <div v-if="!config.hideType" class="text-lg text-gray-500 mt-2">
        {{ tangos[currData].type.join(', ') }}
      </div>
      <div v-if="!config.hideTranslate" class="mt-3 text-xl">
        {{ tangos[currData].translates.join('；') }}
      </div>

      <div class="mt-8">
        <el-button
          plain
          size="large"
          type="primary"
          :disabled="currData === 0"
          @click="currData--"
        >
          上一个
        </el-button>
        <el-button
          size="large"
          type="primary"
          :disabled="currData === tangos.length - 1"
          @click="currData++"
        >
          下一个
        </el-button>
      </div>
    </div>

    <div class="absolute bottom-[5vh]">
      <el-form>
        <el-form-item label="隐藏假名">
          <el-switch v-model="config.hideKana" />
        </el-form-item>
        <el-form-item label="隐藏翻译">
          <el-switch v-model="config.hideTranslate" />
        </el-form-item>
        <el-form-item label="隐藏词性">
          <el-switch v-model="config.hideType" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.el-form-item {
  margin-bottom: 5px;
}
</style>
