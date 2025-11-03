<script setup lang='ts'>
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'ReIcon',
})

defineProps<{
  icon: string
}>()
</script>

<template>
  <Icon :icon="icon" v-bind="$attrs" style="outline: none;">
    <slot />
  </Icon>
</template>
