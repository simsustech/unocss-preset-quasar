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
  /**
   * If set, the style's preflights and rules are scoped so they only
   * apply when `<body>` has this class. Theme tokens (`:root` CSS
   * custom properties) stay global. Used by the playground to bundle
   * all three styles into one build and switch at runtime via a body
   * class. Leave empty for backward compatibility.
   */
  bodyClass?: string
}

export {
  MaterialDesign2,
  MaterialDesign3,
  Unstyled,
  setDefaultPropsMd2,
  setDefaultPropsMd3,
  setDefaultPropsUnstyled
}
