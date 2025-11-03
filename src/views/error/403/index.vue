<script setup lang='ts'>
defineOptions({
  name: '403',
})

const route = useRoute()
</script>

<route lang="json5">
{
  name: "403",
  path: "/error/403",
  meta: {
    id: "lay-menu-403",
    title: "403",
    hide: true,
    rank: 910,
  }
}
</route>

<template>
  <div>403</div>
</template>
