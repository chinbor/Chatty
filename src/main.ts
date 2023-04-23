import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import App from './App.vue'
import type { GlobModule } from './types'

const app = createApp(App)

Object.values(import.meta.glob<GlobModule>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app))

app.mount('#app')
