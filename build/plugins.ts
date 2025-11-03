import type { PluginOption } from 'vite'
import process from 'node:process'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import svgLoader from 'vite-svg-loader'

import { buildInfo } from './info'
import { processPath } from './utils'

export function usePlugins(): PluginOption[] {
  const lifecycle = process.env.npm_lifecycle_event // dev | build | report

  return [
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [],
      dts: './types/unplugin-imports.d.ts',
    }),
    Components({
      globs: ['!src/components'],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: './types/unplugin-components.d.ts',
    }),
    VueRouter({
      dts: './types/unplugin-router.d.ts',
      routesFolder: ['src/views'],
      exclude: [
        '**/!(index).vue', // 排除非 index.vue 文件
        '**/login', // 排除登录页
      ],
    }),
    VueI18nPlugin({
      include: [processPath('../locales/**')],
    }),
    vue(),
    vueJsx(),
    svgLoader(),
    Icons({
      compiler: 'vue3',
      scale: 1,
    }),
    Tailwindcss(),
    codeInspectorPlugin({
      bundler: 'vite',
      hideConsole: true,
    }),
    buildInfo(),
    lifecycle === 'report'
      ? visualizer({ brotliSize: true, open: true, filename: 'report.html' })
      : null,
  ]
}
