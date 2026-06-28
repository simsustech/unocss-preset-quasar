import { Postprocessor, Preflight, Rule, Shortcut, Variant } from '@unocss/core'
import { QuasarTheme } from '../theme.js'
import { default as MaterialDesign2 } from './md2/index.js'
import { default as MaterialDesign3 } from './md3/index.js'
import { default as Unstyled } from './unstyled/index.js'

export interface QuasarStyle {
  rules: Rule<QuasarTheme>[]
  variants: Variant<QuasarTheme>[]
  preflights: Preflight<QuasarTheme>[]
  shortcuts: Shortcut<QuasarTheme>[]
  /**
   * Optional UnoCSS `postprocess` hooks attached to this style. The
   * preset's `scopeStyle` helper injects a body-class-scoping
   * postprocess when `bodyClass` is set, but styles can also attach
   * their own custom hooks here for further utility mutation.
   */
  postprocess?: Postprocessor[]
  /**
   * If set, the style's preflights and rules are scoped so they only
   * apply when `<body>` has this class. Theme tokens (`:root` CSS
   * custom properties) stay global. Used by the playground to bundle
   * all three styles into one build and switch at runtime via a body
   * class. Leave empty for backward compatibility.
   */
  bodyClass?: string
}

export { MaterialDesign2, MaterialDesign3, Unstyled }
