import { Preflight, Rule, UserShortcuts, Variant } from '@unocss/core'
import { QuasarTheme } from '../theme.js'
import { setDefaultProps as setDefaultPropsMd2 } from './md2/index.js'
import { setDefaultProps as setDefaultPropsMd3 } from './md3/index.js'

export interface QuasarStyle {
  rules: Rule<QuasarTheme>[]
  variants: Variant<QuasarTheme>[]
  preflights: Preflight<QuasarTheme>[]
  shortcuts: UserShortcuts<QuasarTheme>[]
}

export { setDefaultPropsMd2, setDefaultPropsMd3 }
