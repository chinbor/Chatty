import type { Preset } from 'unocss'
import shortcuts from './shortcuts'
import theme from './theme'

export function presetChatty(): Preset {
  return {
    name: '@chatty/preset',
    theme,
    shortcuts,
  }
}

export * from './colors'
