<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ReDialog } from '@/components/ReDialog'

function printConsole(): void {
  const app = __APP_INFO__

  const commitInfo = `commit: %c${app.build.commit} %cbuild: %c${app.build.time}`
  const authorInfo = `Power by: %c${app.author.name} <${app.author.email}> ${app.author.url}`

  const keyStyle = `color:#606266;font-weight:bold;font-family:'Consolas'`
  const valueStyle = `color:#2c3e50;font-family:'Consolas'`

  console.log(
    `%c${app.pkg.name}%cv${app.pkg.version}%c\n\n${commitInfo}%c\n${authorInfo}`,
    `background:#41b883; color:#fff; padding:3px 6px; border-radius:3px 0 0 3px;font-family:'Consolas'`,
    `background:#35495e; color:#fff; padding:3px 6px; border-radius:0 3px 3px 0;font-family:'Consolas'`,
    keyStyle,
    valueStyle,
    keyStyle,
    valueStyle,
    keyStyle,
    valueStyle,
  )
}

onMounted(() => {
  if (import.meta.env.MODE === 'production') {
    printConsole()
  }
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
    <ReDialog />
  </el-config-provider>
</template>
