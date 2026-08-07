import { Postprocessor, Preflight, Rule, Shortcut, Variant } from '@unocss/core'
import { QuasarTheme } from '../theme.js'
import {
  tokens as defaultTokens,
  type QuasarStyleEntry
} from '../core/_tokens.js'

export type { QuasarStyleEntry } from '../core/_tokens.js'

export interface QuasarStyle {
  rules: Rule<QuasarTheme>[]
  variants: Variant<QuasarTheme>[]
  preflights: Preflight<QuasarTheme>[]
  shortcuts: Shortcut<QuasarTheme>[]
  /**
   * Optional UnoCSS `postprocess` hooks attached to this style.
   */
  postprocess?: Postprocessor[]
}

/**
 * A style entry: one named token spec. The name becomes the body class
 * (`quasar-style-{name}`) that activates the block at runtime.
 *
 *   QuasarPreset({ styles: QuasarStyleEntries })
 */

/** Built-in Material Design 3 style entry */
export const Md3StyleEntry: QuasarStyleEntry = {
  name: 'md3',
  tokens: defaultTokens.md3
}

/** Built-in Material Design 2 style entry */
export const Md2StyleEntry: QuasarStyleEntry = {
  name: 'md2',
  tokens: defaultTokens.md2
}

/** Built-in unstyled entry */
export const UnstyledStyleEntry: QuasarStyleEntry = {
  name: 'unstyled',
  tokens: defaultTokens.unstyled
}

/** All built-in style entries, ready for `QuasarPreset({ styles })` */
export const QuasarStyleEntries: QuasarStyleEntry[] = [
  Md3StyleEntry,
  Md2StyleEntry,
  UnstyledStyleEntry
]
// ---------------------------------------------------------------------------
// Backward-compatibility aliases for the 0.4.x API names. 0.5.0 kept the
// `Md3StyleEntry` / `Md2StyleEntry` / `UnstyledStyleEntry` names and the
// `styles` array option; these aliases let old configs (`QuasarPreset({ style:
// MaterialDesign3 })`, `import { MaterialDesign3 } from 'unocss-preset-quasar/styles'`)
// keep working.
// ---------------------------------------------------------------------------

/** @deprecated use `Md3StyleEntry` (or `MaterialDesign3` kept for 0.4.x compat) */
export const MaterialDesign3: QuasarStyleEntry = Md3StyleEntry
/** @deprecated use `Md2StyleEntry` (or `MaterialDesign2` kept for 0.4.x compat) */
export const MaterialDesign2: QuasarStyleEntry = Md2StyleEntry
/** @deprecated use `UnstyledStyleEntry` (or `Unstyled` kept for 0.4.x compat) */
export const Unstyled: QuasarStyleEntry = UnstyledStyleEntry

/**
 * Runtime style switcher. Removes every `quasar-style-*` body class and
 * adds the one for `name`, which flips the CSS-variable block that the
 * shared shortcuts resolve against. No page reload required.
 *
 *   import { setStyle } from 'unocss-preset-quasar/styles'
 *   setStyle('md2')
 */
export function setStyle(name: string): void {
  if (typeof document === 'undefined') return
  for (const cls of Array.from(document.body.classList))
    if (cls.startsWith('quasar-style-')) document.body.classList.remove(cls)
  document.body.classList.add(`quasar-style-${name}`)
}

/** Active style name from the current body class, or `null` if none. */
export function getActiveStyle(): string | null {
  if (typeof document === 'undefined') return null
  const match = Array.from(document.body.classList).find((c) =>
    c.startsWith('quasar-style-')
  )
  return match ? match.slice('quasar-style-'.length) : null
}
