import {
  argbFromHex,
  Blend,
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
  /**
   * The `quasar` block's scheme-aware exceptions. Quasar's aliases are
   * light-scheme by contract — `renderColorBlock` emits every key verbatim
   * into `:root` — so the dark side of a status is kept here and emitted by
   * `renderQuasarDarkBlock` (`--q-positive`/`--q-negative` under
   * `body.body--dark`).
   *
   * Optional for the same reason the `quasar` block is: a hand-built
   * `ColorBlock` (the preflight specs pass one) carries no status at all, and
   * the emitter then states no override rather than crashing on the read.
   * `generateColorTokens` always fills it, and `status-colors.test.ts`
   * asserts both the derivation and the emission.
   */
  quasarDark?: {
    positive: string
    negative: string
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
/**
 * The MD3 surface-container / dim / bright tokens the library's `Scheme` does
 * not expose.
 *
 * They come from the **neutral** palette at fixed tones, not from the primary:
 * surfaces are near-neutral in MD3 (chroma ~1–2), and deriving them from the
 * source colour's hue *and chroma* tints every card, bar, menu and dialog with
 * the primary's saturation — `#f3eaff` where the reference has `#f2ecf1`.
 *
 * MD3 tones, per the Material 3 colour spec:
 *   light  lowest 100, low 96, base 94, high 92, highest 90, dim 87, bright 98
 *   dark   lowest 4,   low 10, base 12, high 17, highest 22, dim 6,  bright 24
 */
interface NeutralPalette {
  tone(tone: number): number
}

function surfaceContainerTokens(
  neutral: NeutralPalette,
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
  const tones = isDark
    ? {
        dim: 6,
        bright: 24,
        lowest: 4,
        low: 10,
        base: 12,
        high: 17,
        highest: 22
      }
    : {
        dim: 87,
        bright: 98,
        lowest: 100,
        low: 96,
        base: 94,
        high: 92,
        highest: 90
      }

  const at = (tone: number) => hexFromArgb(neutral.tone(tone))

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

  /**
   * The MD3 tone rung each scheme reads a status colour at.
   *
   * One Quasar token per status serves both roles — text (`.text-positive` in
   * the money columns) and fill (`.bg-negative` under a white glyph or label)
   * — and a single shared hex cannot satisfy both, which is how the audit
   * measured `text-positive` at 2.33:1 in light and `text-negative` at 2.68:1
   * in dark.
   *
   * Light takes MD3's own light-error rung (40): 6.3:1 as text on `surface`,
   * 6.5:1 for white on the fill. Dark takes 60, one rung below MD3's dark
   * error (80) — at 80 the fill drops to 2.1:1 under a white glyph, below
   * 1.4.11's 3:1, while 60 keeps the text ≥4.5:1 (5.2:1) and the glyph ≥3:1.
   */
  const STATUS_TONE = { light: 40, dark: 60 } as const

  /**
   * A status colour at the rung its scheme needs, from a palette built on the
   * *harmonized* brand colour. `harmonize` alone only aligned the hue: the hex
   * it returns is mid-tone (green ~55, red ~35) and clears 4.5:1 against
   * neither a white nor a near-black surface.
   */
  const statusTone = (designColor: string) => {
    const palette = themeFromSourceColor(argbFromHex(harmonize(designColor)))
      .palettes.primary
    return {
      light: hexFromArgb(palette.tone(STATUS_TONE.light)),
      dark: hexFromArgb(palette.tone(STATUS_TONE.dark))
    }
  }

  const positive = statusTone('#21BA45')
  const negative = statusTone('#C10015')

  const lightSurface = surfaceContainerTokens(theme.palettes.neutral, false)
  const darkSurface = surfaceContainerTokens(theme.palettes.neutral, true)

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
      positive: positive.light,
      negative: negative.light,
      info: harmonize('#31CCEC'),
      warning: harmonize('#F2C037'),
      'dark-page': hexFromArgb(light.background),
      dark: hexFromArgb(light.surface)
    },
    // The two `quasar` aliases that must NOT be shared between schemes. They
    // are read as text in the money columns *and* as fills under white labels
    // (`color="negative"`), so each scheme takes its own rung (STATUS_TONE).
    quasarDark: {
      positive: positive.dark,
      negative: negative.dark
    }
  }
}
