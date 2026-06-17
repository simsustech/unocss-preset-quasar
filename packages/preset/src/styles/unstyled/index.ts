import { type Preflight, type Rule, type Shortcut, type Variant } from 'unocss'
import { type QuasarTheme } from '../../theme.js'
import type { QuasarStyle } from '../index.js'

/**
 * A blank slate: no Quasar class shortcuts, no preflights, no variants.
 *
 * Pair this with the `Unstyled` style when you want Quasar components to
 * render with their HTML defaults — no UnoCSS-generated CSS overrides —
 * and you intend to style everything yourself with utility classes at the
 * app level.
 *
 * The theme tokens (CSS variables like `--light-primary`, `--shape-corner-medium`,
 * etc.) are still emitted by the preset, so you can reference them in your
 * own styles via `var(--light-primary)` etc.
 *
 * Example:
 *
 *   import { QuasarPreset } from 'unocss-preset-quasar'
 *   import { Unstyled } from 'unocss-preset-quasar/styles'
 *
 *   QuasarPreset({ style: Unstyled })
 */
const style: QuasarStyle = {
  rules: [] as Rule<QuasarTheme>[],
  variants: [] as Variant<QuasarTheme>[],
  preflights: [] as Preflight<QuasarTheme>[],
  shortcuts: [] as Shortcut<QuasarTheme>[]
}

/**
 * No defaults are set for the Unstyled style — Quasar components behave
 * exactly as the library ships them. This function exists for API parity
 * with `setDefaultProps` / `setDefaultPropsMd2` / `setDefaultPropsMd3`
 * and is intentionally a no-op.
 */
export const setDefaultProps = () => {}

export default style
