import type {
  Postprocessor,
  Preflight,
  Rule,
  Shortcut,
  Variant
} from '@unocss/core'
import type { QuasarTheme } from '../theme.js'
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
export const MaterialDesign3: QuasarStyleEntry = {
  name: 'md3',
  tokens: defaultTokens.md3
}

/** Built-in Material Design 2 style entry */
export const MaterialDesign2: QuasarStyleEntry = {
  name: 'md2',
  tokens: defaultTokens.md2
}

/** Built-in unstyled entry */
export const Unstyled: QuasarStyleEntry = {
  name: 'unstyled',
  tokens: defaultTokens.unstyled
}

/** All built-in style entries, ready for `QuasarPreset({ styles })` */
export const QuasarStyleEntries: QuasarStyleEntry[] = [
  MaterialDesign3,
  MaterialDesign2,
  Unstyled
]

// ---------------------------------------------------------------------------
// Backward-compatibility aliases for the 0.5.0–0.5.2 names (`Md3StyleEntry`
// etc.). The canonical names are the `MaterialDesign*` / `Unstyled` ones;
// these aliases let configs written against 0.5.x keep working.
// ---------------------------------------------------------------------------

/** @deprecated use `MaterialDesign3` */
export const Md3StyleEntry: QuasarStyleEntry = MaterialDesign3
/** @deprecated use `MaterialDesign2` */
export const Md2StyleEntry: QuasarStyleEntry = MaterialDesign2
/** @deprecated use `Unstyled` */
export const UnstyledStyleEntry: QuasarStyleEntry = Unstyled

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
