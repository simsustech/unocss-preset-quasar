import { Preflight, Rule, Shortcut, Variant } from '@unocss/core'
import { QuasarTheme } from '../theme.js'
import {
  default as MaterialDesign2,
  setDefaultProps as setDefaultPropsMd2
} from './md2/index.js'
import {
  default as MaterialDesign3,
  setDefaultProps as setDefaultPropsMd3
} from './md3/index.js'
import {
  default as Unstyled,
  setDefaultProps as setDefaultPropsUnstyled
} from './unstyled/index.js'

export interface QuasarStyle {
  rules: Rule<QuasarTheme>[]
  variants: Variant<QuasarTheme>[]
  preflights: Preflight<QuasarTheme>[]
  shortcuts: Shortcut<QuasarTheme>[]
}

export {
  MaterialDesign2,
  MaterialDesign3,
  Unstyled,
  setDefaultPropsMd2,
  setDefaultPropsMd3,
  setDefaultPropsUnstyled
}
