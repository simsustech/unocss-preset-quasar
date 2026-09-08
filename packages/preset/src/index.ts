import {
  definePreset,
  presetIcons,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import type { WebFontsOptions } from '@unocss/preset-web-fonts'
import presetWind4 from '@unocss/preset-wind4'
import { generateColorTokens } from './tokens/colors.js'
import { createTokenPreflight } from './tokens/preflight.js'
import { builtinStyles } from './tokens/index.js'
import { getAllRules } from './rules/index.js'
import type { QuasarStyleEntry } from './styles/index.js'
import { quasarSafelist } from './safelist.js'
import { resetPreflight } from './preflights/reset.js'
import { visibilityPreflight } from './preflights/visibility.js'
import { shapePreflight } from './preflights/shape.js'
import { mousePreflight } from './preflights/mouse.js'
import { typographyPreflight } from './preflights/typography.js'
import { helpersPreflight } from './preflights/helpers.js'
import { qBtnPreflight } from './preflights/q-btn.js'

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
      resetPreflight,
      visibilityPreflight,
      shapePreflight,
      mousePreflight,
      typographyPreflight,
      helpersPreflight,
      qBtnPreflight,
      createTokenPreflight({ colors, defaultStyle, styles: allStyles })
    ],
    rules: getAllRules(),
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
