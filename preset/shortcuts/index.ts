import type { Theme } from '@unocss/preset-uno'
import type { UserShortcuts } from 'unocss'
import { commonShortcuts } from './common'
import { btnShortcuts } from './btn'

export default [
  commonShortcuts,
  btnShortcuts,
] as UserShortcuts<Theme>
