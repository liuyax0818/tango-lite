import type { ConfigEnv, UserConfigExport } from 'vite'

import { loadEnv } from 'vite'

import { exclude, include } from './build/optimize'
import { usePlugins } from './build/plugins'
import { alias, appInfo, processEnv, root } from './build/utils'

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_BASE_PATH } = processEnv(loadEnv(mode, root))
  return {
    base: VITE_BASE_PATH,
    root,
    resolve: {
      alias,
    },
    server: {
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: {},
    },
    plugins: usePlugins(),
    optimizeDeps: {
      include,
      exclude,
    },
    build: {
      target: 'es2015',
      sourcemap: false,
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 第三方依赖拆包
            if (id.includes('node_modules') && (id.endsWith('.js') || id.endsWith('.ts'))) {
              return 'vendor'
            }
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(appInfo),
    },
  }
}
