import { URL, fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueMacros from 'unplugin-vue-macros/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/core',
      ],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
      ],
    }),
    Components({
      dts: 'src/components.d.ts',
      extensions: ['vue'],
    }),
    Layouts({
      layoutsDirs: 'src/layout',
      defaultLayout: 'index',
    }),
    Pages({
      exclude: ['**/components/**'],
      extensions: ['vue'],
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
