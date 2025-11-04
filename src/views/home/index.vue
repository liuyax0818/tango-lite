<script setup lang='ts'>
defineOptions({
  name: 'Home',
})

const router = useRouter()

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
  <div class="flex flex-col items-center pt-[30vh] bg-sky-200">
    <div class="text-3xl font-bold">
      Tango Lite
    </div>
    <div class="w-[50vw] mt-[30px]">
      <el-button plain size="large" class="w-full" type="primary" @click="onStart">
        开刷！！！
      </el-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
