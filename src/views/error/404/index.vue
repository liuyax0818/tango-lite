<script setup lang='ts'>
defineOptions({
  name: '404',
})
</script>

<route lang="json5">
{
  name: "404",
  path: "/error/404",
  meta: {
    id: "lay-menu-404",
    title: "404",
    hide: true,
    rank: 920,
  }
}
</route>

<template>
  <div>404</div>
</template>
