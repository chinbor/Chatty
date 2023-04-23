import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { darkTheme, getCSSPreflights, lightTheme, presetChatty } from './preset'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      cdn: 'https://esm.sh/',
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
