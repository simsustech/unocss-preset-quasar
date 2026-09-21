import {
  definePreset,
  presetIcons,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import type { WebFontsOptions } from '@unocss/preset-web-fonts'
import presetWind4 from '@unocss/preset-wind4'
import type { Rule } from '@unocss/core'
import { generateTheme } from './theme/quasar-theme.js'
import { mergeDuplicateRules } from './rules/merge.js'
import { generateColorTokens } from './theme/colors.js'
import { createTokenPreflight } from './theme/preflight.js'
import { builtinStyles } from './theme/index.js'
import type { QuasarStyleEntry } from './styles/index.js'
import { quasarSafelist } from './safelist.js'
import * as componentModules from './components/index.js'
import * as coreModules from './core/index.js'
import { platformMediaCss, responsiveVisibilityCss } from './core/index.js'
import { layoutMediaCss } from './components/layout/rules.js'
import { tooltipMediaCss } from './components/tooltip/rules.js'
import { notificationMediaCss } from './components/notification/rules.js'
import { dialogMediaCss, dialogPlatformCss } from './components/dialog/rules.js'

const pickBySuffix = (
  mod: Record<string, unknown>,
  suffix: string
): unknown[] =>
  Object.entries(mod)
    .filter(([key]) => key.endsWith(suffix))
    .flatMap(([, value]) => (Array.isArray(value) ? value : [value]))

/** A Rule is a `[matcher, ...]` tuple, a bare selector, or an object map. */
const isRuleList = (value: unknown): value is Rule[] =>
  Array.isArray(value) &&
  value.every(
    (entry) =>
      typeof entry === 'string' ||
      (Array.isArray(entry) &&
        (entry[0] instanceof RegExp || typeof entry[0] === 'string'))
  )

/** Rule exporters, narrowed from the module namespaces without assertions. */
const pickRules = (mod: Record<string, unknown>, suffix: string): Rule[] =>
  Object.entries(mod)
    .filter(([key]) => key.endsWith(suffix))
    .flatMap(([, value]) => (isRuleList(value) ? value : []))

const componentRules = pickRules(componentModules, 'Rules')
// Grid/container utilities (`.column`, `.row`, `.col`) must precede the
// component rules. Quasar's own sheet and the reference deployment both place
// `.column` before the q-item layout rules, so `.q-item__section--main
// { flex: 10000 1 0% }` wins over `.column { flex: 1 1 auto }`. With every
// utility last, `.column` won instead and the row collapsed: the side section
// grew to 378px where the reference is 56px.
const coreRuleEntries = Object.entries(coreModules).filter(([key]) =>
  key.endsWith('Rules')
)
const gridRules = pickRules(
  Object.fromEntries(coreRuleEntries.filter(([key]) => key.startsWith('grid'))),
  'Rules'
)
const nonGridCoreRules = pickRules(
  Object.fromEntries(
    coreRuleEntries.filter(([key]) => !key.startsWith('grid'))
  ),
  'Rules'
)
const corePreflights = pickBySuffix(coreModules, 'Preflights')
const componentPreflights = pickBySuffix(componentModules, 'Preflights')
const coreShortcuts = pickBySuffix(coreModules, 'Shortcuts')
const componentShortcuts = pickBySuffix(componentModules, 'Shortcuts')

/**
 * The flat Quasar palette out of the public theme, for wind4.
 *
 * `colors.light` / `colors.dark` are *scheme objects*, not colours — spreading
 * them into a colour namespace would make wind4 treat each role as a palette
 * entry (`--colors-light-primary`). The roles reach CSS through the token
 * preflight instead. Everything else (the Quasar palette plus the brand
 * aliases) is a colour name that utilities address directly.
 */
function paletteColors(theme: { colors: Record<string, unknown> }) {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(theme.colors)) {
    if (key === 'light' || key === 'dark') continue
    if (typeof value !== 'string') continue
    out[key] = value
  }
  // The reference also exposes the light scheme's primary as a palette colour:
  // `.text-light-primary` resolves `var(--colors-light-primary)`, so it is a
  // utility-addressed colour rather than a role.
  const light = theme.colors.light
  if (light && typeof light === 'object') {
    const primary = (light as Record<string, unknown>).primary
    if (typeof primary === 'string') out['light-primary'] = primary
  }
  return out
}
export interface QuasarPresetOptions {
  style?: QuasarStyleEntry
  sourceColor?: string
  presetWebFonts?: WebFontsOptions
}

export const QuasarPreset = definePreset<QuasarPresetOptions>((options) => {
  const sourceColor = options?.sourceColor ?? '#1976d2'
  const colors = generateColorTokens(sourceColor)
  // The public theme: wind4 needs the palette on the UnoCSS theme (see
  // `extendTheme` below), and it is the same generator behind our preflight.
  const theme = generateTheme(sourceColor)
  const defaultStyle = options?.style ?? builtinStyles[0] // md3 default
  const allStyles = builtinStyles // always include all built-ins for setStyle() to work

  return {
    name: 'quasar',
    // Enforce AFTER nested presets (wind4/icons): UnoCSS matches dynamic
    // rules first-match-wins in reverse preset order, so without this Wind4's
    // generic rules (e.g. grid `col-N` -> grid-column) would shadow Quasar's
    // component semantics (flexbox `col-N`, `.flex` combos).
    enforce: 'post',
    presets: [
      presetWind4({
        preflights: { reset: false },
        dark: { light: '.body--light', dark: '.body--dark' }
      }),
      presetIcons({}),
      presetWebFonts(
        options?.presetWebFonts ?? {
          provider: 'bunny',
          fonts: { roboto: 'Roboto' }
        }
      )
    ],
    preflights: [
      ...corePreflights,
      ...componentPreflights,
      createTokenPreflight({ colors, defaultStyle, styles: allStyles }),
      // Media-query families: responsive visibility (`lt-md`, `xs`, …) and the
      // orientation/print platform classes. A UnoCSS rule body cannot carry an
      // at-rule (a nested `'@media …'` key is stringified as `[object Object]`),
      // and these classes are added by Quasar or by markup with no source hint,
      // so the reference emits them unconditionally — here, once, as text.
      {
        getCSS: () =>
          `${responsiveVisibilityCss}\n${platformMediaCss}\n${layoutMediaCss}\n${tooltipMediaCss}\n${notificationMediaCss}\n${dialogMediaCss}\n${dialogPlatformCss}`
      }
    ],
    // Rule order matters twice over:
    //  - grid/container utilities first, so component layout wins on equal
    //    specificity (see gridRules above).
    //  - the remaining core utilities (colors, text, spacing) last, so
    //    `bg-*`/`text-*` win — otherwise `.q-btn { background: transparent }`
    //    wins the shorthand and `bg-secondary` buttons render unfilled.
    // mergeDuplicateRules collapses repeated matchers: UnoCSS keeps only the
    // last rule per regex, so duplicates silently dropped declarations.
    rules: mergeDuplicateRules([
      ...gridRules,
      ...componentRules,
      ...nonGridCoreRules
    ]),
    shortcuts: [...coreShortcuts, ...componentShortcuts],
    safelist: quasarSafelist,
    // The Quasar palette has to reach wind4's theme, not just our own token
    // preflight: wind4 emits `--colors-<name>` and generates the colour
    // utilities (`bg-grey-8`, `text-deep-orange`, …) from the theme, so without
    // this the palette classes the safelist names resolve to nothing.
    extendTheme: (themeArg: { colors?: Record<string, unknown> }) => ({
      ...themeArg,
      colors: {
        ...(themeArg.colors ?? {}),
        ...paletteColors(theme)
      }
    }),
    transformers: [transformerVariantGroup(), transformerDirectives()]
  }
})

export type { QuasarStyleEntry } from './styles/index.js'
export {
  setStyle,
  getActiveStyle,
  MaterialDesign3,
  MaterialDesign2,
  Unstyled,
  QuasarStyleEntries
} from './styles/index.js'
