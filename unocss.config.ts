import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { darkTheme, getCSSPreflights, lightTheme, presetChatty } from './preset'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        'carbon': () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        'mdi': () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        'ri': () => import('@iconify-json/ri/icons.json').then(i => i.default),
        'svg-spinners': () => import('@iconify-json/svg-spinners/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
    presetChatty(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  preflights: [{
    layer: 'base',
    getCSS: () => `
    :root {
      ${getCSSPreflights(lightTheme)}
    }
    :root.dark {
      ${getCSSPreflights(darkTheme)}
    }
    button,select,input,option {
      outline: none;
      -webkit-appearance: none
    }
    `,
  }],
})
