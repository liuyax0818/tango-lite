<script setup lang="ts">
definePage({
  redirect: '/error/403',
})
</script>

<route lang="json5">
{
  path: '/error',
  name: "Error",
  meta: {
    id: "lay-menu-error",
    title: "异常页面",
    rank: 900,
    hide: true,
    icon: ""
  }
}
</route>

<template>
  <div />
</template>
