import {
  definePreset,
  presetIcons,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import type { WebFontsOptions } from '@unocss/preset-web-fonts'
import presetWind4 from '@unocss/preset-wind4'
import { generateColorTokens } from './theme/colors.js'
import { createTokenPreflight } from './theme/preflight.js'
import { builtinStyles } from './theme/index.js'
import type { QuasarStyleEntry } from './styles/index.js'
import { quasarSafelist } from './safelist.js'
import * as componentModules from './components/index.js'
import * as coreModules from './core/index.js'

const pickBySuffix = (
  mod: Record<string, unknown>,
  suffix: string
): unknown[] =>
  Object.entries(mod)
    .filter(([key]) => key.endsWith(suffix))
    .flatMap(([, value]) => (Array.isArray(value) ? value : [value]))

const coreRules = pickBySuffix(coreModules, 'Rules')
const componentRules = pickBySuffix(componentModules, 'Rules')
const corePreflights = pickBySuffix(coreModules, 'Preflights')
const componentPreflights = pickBySuffix(componentModules, 'Preflights')
const coreShortcuts = pickBySuffix(coreModules, 'Shortcuts')
const componentShortcuts = pickBySuffix(componentModules, 'Shortcuts')

export interface QuasarPresetOptions {
  style?: QuasarStyleEntry
  sourceColor?: string
  presetWebFonts?: WebFontsOptions
}

export const QuasarPreset = definePreset<QuasarPresetOptions>((options) => {
  const sourceColor = options?.sourceColor ?? '#1976d2'
  const colors = generateColorTokens(sourceColor)
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
      createTokenPreflight({ colors, defaultStyle, styles: allStyles })
    ],
    rules: [...coreRules, ...componentRules],
    shortcuts: [...coreShortcuts, ...componentShortcuts],
    safelist: quasarSafelist,
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
