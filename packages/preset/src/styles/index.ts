import { Preflight, Rule, UserShortcuts, Variant } from '@unocss/core'
import { QuasarTheme } from '../theme.js'
import {
  default as MaterialDesign2,
  setDefaultProps as setDefaultPropsMd2
} from './md2/index.js'
import {
  default as MaterialDesign3,
  setDefaultProps as setDefaultPropsMd3
} from './md3/index.js'

export interface QuasarStyle {
  rules: Rule<QuasarTheme>[]
  variants: Variant<QuasarTheme>[]
  preflights: Preflight<QuasarTheme>[]
  shortcuts: UserShortcuts<QuasarTheme>[]
}

export {
  MaterialDesign2,
  MaterialDesign3,
  setDefaultPropsMd2,
  setDefaultPropsMd3
}
