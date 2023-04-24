import type { Theme } from '@unocss/preset-uno'
import type { UserShortcuts } from 'unocss'
import { commonShortcuts } from './common'
import { btnShortcuts } from './btn'
import { roomShortcuts } from './room'

export default [
  commonShortcuts,
  btnShortcuts,
  roomShortcuts,
] as UserShortcuts<Theme>
