import type { RouterHistory } from 'vue-router'
import { createWebHashHistory, createWebHistory } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL

function getRouterMode(mode: 'hash' | 'history'): RouterHistory {
  return mode === 'hash' ? createWebHashHistory(baseUrl) : createWebHistory(baseUrl)
}

export {
  getRouterMode,
}
