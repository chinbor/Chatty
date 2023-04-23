import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({ routes: setupLayouts(generatedRoutes), history: createWebHistory() })

app.use(router)

Object.values(import.meta.glob('./modules/*.ts', { eager: true })).forEach((i: any) => {
  app.use(i.default, { router })
})

app.mount('#app')
