import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import { routes } from './router/routes'
import { useLocalStorage } from './composable/localStorage'

import './style.css'

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const user = useLocalStorage('user')

  if (to.meta.requiresGuest && user !== null) {
    return {
      path: '/',
      query: { redirect: to.fullPath }
    }
  }
})

createApp(App).use(pinia).use(router).mount('#app')
