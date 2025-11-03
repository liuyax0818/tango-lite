<script setup lang='ts'>
import '@/components/ReIcon/src/offlineIcons'

defineOptions({
  name: 'Layout',
})
</script>

<template>
  <div class="lay-wrapper">
    <router-view />
  </div>
</template>

<style lang='scss' scoped>
.lay-wrapper {
  position: relative;
  height: 100%;
}
</style>
