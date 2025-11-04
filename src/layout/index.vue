<script setup lang='ts'>
import '@/components/ReIcon/src/offlineIcons'

defineOptions({
  name: 'Layout',
})
</script>

<template>
  <div class="lay-wrapper">
    <router-view class="main-content" />
  </div>
</template>

<style lang='scss' scoped>
.lay-wrapper {
  position: relative;
  height: 100%;
}

.main-content {
  width: 100%;
  height: 100%;
}
</style>
