/**
 * _tokenDerive.ts — StyleSpec → runtime token derivation
 *
 * THE single source of truth for per-style values is the StyleSpec
 * (`spec/md3.spec.ts`, `spec/md2.spec.ts`, `spec/unstyled.spec.ts`).
 * The runtime `TokenBlock` (emitted as `--q-*` CSS variables by the
 * preflight) is DERIVED from the specs here — it is never hand-maintained.
 *
 * The derivation is a pure function of the spec + a fixed mapping table.
 * Any value that needs changing is edited in the spec, never here.
 *
 * @module Core
 */

import type { DesignTokens, TokenBlock } from './_tokens.js'
import type { StyleSpec } from '../spec/types.js'
import { getStyleSpec } from '../spec/index.js'
import { DEFAULTS } from './_tokenDefaults.js'

/* ─── Mapping tables ─────────────────────────────────────────── */

/** Spec color keys that are emitted as runtime color tokens. */
const COLOR_KEYS = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'surface',
  'surfaceContainer',
  'surfaceContainerLow',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'outline',
  'onSurface',
  'onPrimaryContainer',
  'onSecondaryContainer',
  'onSurfaceVariant'
] as const

/** Spec shape keys → runtime radius tokens (names differ). */
const SHAPE_MAP = [
  ['radiusXs', 'cornerExtraSmall'],
  ['radiusSm', 'cornerSmall'],
  ['radiusMd', 'cornerMedium'],
  ['radiusLg', 'cornerLarge'],
  ['radiusXl', 'cornerExtraLarge'],
  ['radiusFull', 'cornerFull'],
  ['radiusCircle', 'cornerCircle']
] as const

/** Spec sizing keys → runtime sizing tokens (same names). */
const SIZING_KEYS = [
  'spaceXs',
  'spaceSm',
  'spaceMd',
  'spaceLg',
  'spaceXl',
  'sizeIcon',
  'sizeSm',
  'sizeMd',
  'sizeLg'
] as const

/** Spec runtime-font keys → TokenBlock `type` font tokens. */
const FONT_KEYS = [
  'fontXs',
  'fontSm',
  'fontMd',
  'fontLg',
  'fontXl',
  'fontLead'
] as const

/** Spec component keys → TokenBlock `type` extra tokens. */
const TYPE_COMPONENT_KEYS = [
  'linearProgressSpeed',
  'paginationGutterChild',
  'paginationGutterParent',
  'virtualScrollItemHeight',
  'virtualScrollItemWidth',
  'toggleFontSize',
  'toggleDenseFontSize',
  'toggleTrackBg',
  'toggleTrackOutline',
  'toggleTrackOpacity',
  'toggleTrackBorderRadius',
  'toggleTrackHeight',
  'toggleInnerWidth'
] as const

/** Spec component keys → TokenBlock `component` tokens. */
const COMPONENT_KEYS = [
  'btnBg',
  'btnColor',
  'btnTextTransform',
  'btnRadius',
  'btnMinWidth',
  'btnPaddingX',
  'btnFontSize',
  'btnLineHeight',
  'btnShadow',
  'btnPressedShadow',
  'btnPressedShadowLg',
  'btnOutlineColor',
  'btnOutlineBorder',
  'btnFlatColor',
  'btnFlatPaddingX',
  'btnPushRadius',
  'btnPushBorderBottom',
  'btnRoundedRadius',
  'btnRoundRadius',
  'btnSquareRadius',
  'btnDensePadding',
  'fabBg',
  'fabColor',
  'fabRadius',
  'fabSize',
  'fabMiniSize'
] as const

/**
 * Read a token value by key, treating any object shape as a string map.
 * Missing or non-string values fall back to the neutral default.
 */
const pick = (obj: unknown, key: string, fallback: string): string => {
  const value = (obj as Record<string, unknown> | undefined)?.[key]
  return typeof value === 'string' ? value : fallback
}

/**
 * Derive the runtime TokenBlock for one StyleSpec.
 * Missing values fall back to the neutral DEFAULTS, never to ''.
 */
export function deriveTokenBlock(spec: StyleSpec): TokenBlock {
  const t = spec.tokens
  const dark = spec.darkTokens?.color

  const color = {} as TokenBlock['color']
  for (const key of COLOR_KEYS) color[key] = pick(t.color, key, DEFAULTS[key])
  color.darkSecondary = pick(dark, 'secondary', DEFAULTS.darkSecondary)
  color.darkOutline = pick(dark, 'outline', DEFAULTS.darkOutline)
  color.darkInverseSurface = pick(
    dark,
    'inverseSurface',
    DEFAULTS.darkInverseSurface
  )
  color.darkTertiaryContainer = pick(
    dark,
    'tertiaryContainer',
    DEFAULTS.darkTertiaryContainer
  )

  const shape = {} as TokenBlock['shape']
  for (const [runtime, specKey] of SHAPE_MAP)
    shape[runtime] = pick(t.shape, specKey, DEFAULTS[runtime])

  const sizing = {} as TokenBlock['sizing']
  for (const key of SIZING_KEYS)
    sizing[key] = pick(t.sizing, key, DEFAULTS[key])

  const type = {} as TokenBlock['type']
  for (const key of FONT_KEYS) type[key] = pick(t.fonts, key, DEFAULTS[key])
  type.hoverOpacity = pick(t.typography, 'hoverOpacity', DEFAULTS.hoverOpacity)
  for (const key of TYPE_COMPONENT_KEYS)
    type[key] = pick(t.component, key, DEFAULTS[key])

  const component = {} as TokenBlock['component']
  for (const key of COMPONENT_KEYS)
    component[key] = pick(t.component, key, DEFAULTS[key])

  return { color, shape, sizing, type, component }
}

/**
 * Derive the full built-in DesignTokens from the spec registry.
 */
export function deriveDesignTokens(): DesignTokens {
  return {
    md3: deriveTokenBlock(getStyleSpec('md3')),
    md2: deriveTokenBlock(getStyleSpec('md2')),
    unstyled: deriveTokenBlock(getStyleSpec('unstyled'))
  }
}
