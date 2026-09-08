import {
  argbFromHex,
  Blend,
  Hct,
  hexFromArgb,
  themeFromSourceColor
} from '@poupe/material-color-utilities'
import type { ColorTokens } from './types.js'

export interface ColorBlock {
  light: ColorTokens
  dark: ColorTokens
  // Quasar aliases (harmonized to sourceColor)
  quasar: {
    primary: string
    secondary: string
    accent: string
    positive: string
    negative: string
    info: string
    warning: string
    'dark-page': string
    dark: string
  }
}

/**
 * Compute the MD3 surface-container and surface-dim/bright tokens that the
 * `@poupe/material-color-utilities` Scheme class does not expose. We take the
 * surface hue/chroma and set the tone to the MD3-specified luminance rungs.
 *
 * MD3 light-mode surface container tones (Google spec):
 *   lowest  98, low  96, base  94, high  92, highest  90
 *   dim     87, bright 98
 * MD3 dark-mode surface container tones (Google spec):
 *   lowest  10, low  12, base  14, high  16, highest  17
 *   dim     6,  bright 24
 */
function surfaceContainerTokens(
  surfaceArgb: number,
  isDark: boolean
): {
  surfaceDim: string
  surfaceBright: string
  surfaceContainerLowest: string
  surfaceContainerLow: string
  surfaceContainer: string
  surfaceContainerHigh: string
  surfaceContainerHighest: string
} {
  const hct = Hct.fromInt(surfaceArgb)
  const hue = hct.hue
  const chroma = hct.chroma

  const tones = isDark
    ? {
        dim: 6,
        bright: 24,
        lowest: 10,
        low: 12,
        base: 14,
        high: 16,
        highest: 17
      }
    : {
        dim: 87,
        bright: 98,
        lowest: 98,
        low: 96,
        base: 94,
        high: 92,
        highest: 90
      }

  const at = (tone: number) => hexFromArgb(Hct.from(hue, chroma, tone).toInt())

  return {
    surfaceDim: at(tones.dim),
    surfaceBright: at(tones.bright),
    surfaceContainerLowest: at(tones.lowest),
    surfaceContainerLow: at(tones.low),
    surfaceContainer: at(tones.base),
    surfaceContainerHigh: at(tones.high),
    surfaceContainerHighest: at(tones.highest)
  }
}

export function generateColorTokens(sourceColor: string): ColorBlock {
  const argb = argbFromHex(sourceColor)
  const theme = themeFromSourceColor(argb)
  const light = theme.schemes.light
  const dark = theme.schemes.dark

  // Harmonize Quasar's brand colors toward the sourceColor hue.
  // This shifts positive/negative/info/warning to feel like part of the same palette.
  const harmonize = (designColor: string) =>
    hexFromArgb(Blend.harmonize(argbFromHex(designColor), argb))

  const lightSurface = surfaceContainerTokens(light.primary, false)
  const darkSurface = surfaceContainerTokens(dark.primary, true)

  return {
    light: {
      primary: hexFromArgb(light.primary),
      onPrimary: hexFromArgb(light.onPrimary),
      primaryContainer: hexFromArgb(light.primaryContainer),
      onPrimaryContainer: hexFromArgb(light.onPrimaryContainer),
      secondary: hexFromArgb(light.secondary),
      onSecondary: hexFromArgb(light.onSecondary),
      secondaryContainer: hexFromArgb(light.secondaryContainer),
      onSecondaryContainer: hexFromArgb(light.onSecondaryContainer),
      tertiary: hexFromArgb(light.tertiary),
      onTertiary: hexFromArgb(light.onTertiary),
      tertiaryContainer: hexFromArgb(light.tertiaryContainer),
      onTertiaryContainer: hexFromArgb(light.onTertiaryContainer),
      error: hexFromArgb(light.error),
      onError: hexFromArgb(light.onError),
      errorContainer: hexFromArgb(light.errorContainer),
      onErrorContainer: hexFromArgb(light.onErrorContainer),
      background: hexFromArgb(light.background),
      onBackground: hexFromArgb(light.onBackground),
      surface: hexFromArgb(light.surface),
      onSurface: hexFromArgb(light.onSurface),
      surfaceVariant: hexFromArgb(light.surfaceVariant),
      onSurfaceVariant: hexFromArgb(light.onSurfaceVariant),
      surfaceDim: lightSurface.surfaceDim,
      surfaceBright: lightSurface.surfaceBright,
      surfaceContainerLowest: lightSurface.surfaceContainerLowest,
      surfaceContainerLow: lightSurface.surfaceContainerLow,
      surfaceContainer: lightSurface.surfaceContainer,
      surfaceContainerHigh: lightSurface.surfaceContainerHigh,
      surfaceContainerHighest: lightSurface.surfaceContainerHighest,
      outline: hexFromArgb(light.outline),
      outlineVariant: hexFromArgb(light.outlineVariant),
      inverseSurface: hexFromArgb(light.inverseSurface),
      inverseOnSurface: hexFromArgb(light.inverseOnSurface),
      inversePrimary: hexFromArgb(light.inversePrimary),
      shadow: hexFromArgb(light.shadow),
      scrim: hexFromArgb(light.scrim)
    },
    dark: {
      primary: hexFromArgb(dark.primary),
      onPrimary: hexFromArgb(dark.onPrimary),
      primaryContainer: hexFromArgb(dark.primaryContainer),
      onPrimaryContainer: hexFromArgb(dark.onPrimaryContainer),
      secondary: hexFromArgb(dark.secondary),
      onSecondary: hexFromArgb(dark.onSecondary),
      secondaryContainer: hexFromArgb(dark.secondaryContainer),
      onSecondaryContainer: hexFromArgb(dark.onSecondaryContainer),
      tertiary: hexFromArgb(dark.tertiary),
      onTertiary: hexFromArgb(dark.onTertiary),
      tertiaryContainer: hexFromArgb(dark.tertiaryContainer),
      onTertiaryContainer: hexFromArgb(dark.onTertiaryContainer),
      error: hexFromArgb(dark.error),
      onError: hexFromArgb(dark.onError),
      errorContainer: hexFromArgb(dark.errorContainer),
      onErrorContainer: hexFromArgb(dark.onErrorContainer),
      background: hexFromArgb(dark.background),
      onBackground: hexFromArgb(dark.onBackground),
      surface: hexFromArgb(dark.surface),
      onSurface: hexFromArgb(dark.onSurface),
      surfaceVariant: hexFromArgb(dark.surfaceVariant),
      onSurfaceVariant: hexFromArgb(dark.onSurfaceVariant),
      surfaceDim: darkSurface.surfaceDim,
      surfaceBright: darkSurface.surfaceBright,
      surfaceContainerLowest: darkSurface.surfaceContainerLowest,
      surfaceContainerLow: darkSurface.surfaceContainerLow,
      surfaceContainer: darkSurface.surfaceContainer,
      surfaceContainerHigh: darkSurface.surfaceContainerHigh,
      surfaceContainerHighest: darkSurface.surfaceContainerHighest,
      outline: hexFromArgb(dark.outline),
      outlineVariant: hexFromArgb(dark.outlineVariant),
      inverseSurface: hexFromArgb(dark.inverseSurface),
      inverseOnSurface: hexFromArgb(dark.inverseOnSurface),
      inversePrimary: hexFromArgb(dark.inversePrimary),
      shadow: hexFromArgb(dark.shadow),
      scrim: hexFromArgb(dark.scrim)
    },
    quasar: {
      primary: hexFromArgb(light.primary),
      secondary: hexFromArgb(light.secondary),
      accent: hexFromArgb(light.tertiary),
      positive: harmonize('#21BA45'),
      negative: harmonize('#C10015'),
      info: harmonize('#31CCEC'),
      warning: harmonize('#F2C037'),
      'dark-page': hexFromArgb(light.background),
      dark: hexFromArgb(light.surface)
    }
  }
}
