import type { RouterHistory } from 'vue-router'
import { createWebHashHistory, createWebHistory } from 'vue-router'

function getRouterMode(mode: 'hash' | 'history'): RouterHistory {
  return mode === 'hash' ? createWebHashHistory('') : createWebHistory('')
}

export {
  getRouterMode,
}
