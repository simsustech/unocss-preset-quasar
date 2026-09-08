import type { StyleEntry } from '../tokens/index.js'
import { md3Style, md2Style } from '../tokens/index.js'

export interface QuasarStyleEntry {
  name: string
  tokens: StyleEntry['tokens']
}

/** Built-in Material Design 3 style entry */
export const MaterialDesign3: QuasarStyleEntry = {
  name: 'md3',
  tokens: md3Style.tokens
}

/** Built-in Material Design 2 style entry */
export const MaterialDesign2: QuasarStyleEntry = {
  name: 'md2',
  tokens: md2Style.tokens
}

/** Built-in unstyled entry — all tokens 0/transparent/inherit (no visual styling) */
export const Unstyled: QuasarStyleEntry = {
  name: 'unstyled',
  tokens: {
    shape: {
      cornerExtraSmall: '0',
      cornerSmall: '0',
      cornerMedium: '0',
      cornerLarge: '0',
      cornerExtraLarge: '0',
      cornerFull: '0',
      cornerCircle: '0'
    },
    typography: {
      fontFamily: 'inherit',
      displayLarge: 'inherit',
      displayMedium: 'inherit',
      displaySmall: 'inherit',
      headlineLarge: 'inherit',
      headlineMedium: 'inherit',
      headlineSmall: 'inherit',
      titleLarge: 'inherit',
      titleMedium: 'inherit',
      titleSmall: 'inherit',
      bodyLarge: 'inherit',
      bodyMedium: 'inherit',
      bodySmall: 'inherit',
      labelLarge: 'inherit',
      labelMedium: 'inherit',
      labelSmall: 'inherit',
      hoverOpacity: '0',
      focusOpacity: '0',
      pressedOpacity: '0',
      draggedOpacity: '0'
    },
    elevation: {
      level0: 'none',
      level1: 'none',
      level2: 'none',
      level3: 'none',
      level4: 'none',
      level5: 'none'
    },
    sizing: {
      spaceXs: '0',
      spaceSm: '0',
      spaceMd: '0',
      spaceLg: '0',
      spaceXl: '0',
      sizeIcon: '0',
      sizeSm: '0',
      sizeMd: '0',
      sizeLg: '0'
    },
    motion: {
      durationShort: '0s',
      durationMedium: '0s',
      durationLong: '0s',
      easingStandard: 'linear',
      easingDecelerate: 'linear',
      easingAccelerate: 'linear'
    },
    component: {
      btnBg: 'transparent',
      btnColor: 'inherit',
      btnTextTransform: 'none',
      btnRadius: '0',
      btnMinWidth: 'auto',
      btnPaddingX: '0',
      btnFontSize: 'inherit',
      btnLineHeight: 'inherit',
      btnShadow: 'none',
      btnPressedShadow: 'none',
      btnPressedShadowLg: 'none',
      btnOutlineColor: 'inherit',
      btnOutlineBorder: 'none',
      btnFlatColor: 'inherit',
      btnFlatPaddingX: '0',
      btnPushRadius: '0',
      btnPushBorderBottom: 'none',
      btnRoundedRadius: '0',
      btnRoundRadius: '0',
      btnSquareRadius: '0',
      btnDensePadding: '0',
      fabBg: 'transparent',
      fabColor: 'inherit',
      fabRadius: '0',
      fabSize: '0',
      fabMiniSize: '0',
      tabIndicatorHeight: '0',
      tabIndicatorRadius: '0',
      tabIndicatorBg: 'transparent',
      toggleFontSize: 'inherit',
      toggleDenseFontSize: 'inherit',
      toggleTrackBg: 'transparent',
      toggleTrackOutline: 'none',
      toggleTrackOpacity: '1',
      toggleTrackBorderRadius: '0',
      toggleTrackHeight: 'auto',
      toggleInnerWidth: 'auto',
      linearProgressSpeed: '0s',
      paginationGutterChild: '0',
      paginationGutterParent: '0',
      virtualScrollItemHeight: '0',
      virtualScrollItemWidth: '0'
    }
  }
}

export const QuasarStyleEntries: QuasarStyleEntry[] = [
  MaterialDesign3,
  MaterialDesign2,
  Unstyled
]

/** @deprecated use MaterialDesign3 */
export const Md3StyleEntry = MaterialDesign3
/** @deprecated use MaterialDesign2 */
export const Md2StyleEntry = MaterialDesign2
/** @deprecated use Unstyled */
export const UnstyledStyleEntry = Unstyled

export function setStyle(name: string): void {
  if (typeof document === 'undefined') return
  for (const cls of Array.from(document.body.classList))
    if (cls.startsWith('quasar-style-')) document.body.classList.remove(cls)
  document.body.classList.add(`quasar-style-${name}`)
}

export function getActiveStyle(): string | null {
  if (typeof document === 'undefined') return null
  const match = Array.from(document.body.classList).find((c) =>
    c.startsWith('quasar-style-')
  )
  return match ? match.slice('quasar-style-'.length) : null
}
