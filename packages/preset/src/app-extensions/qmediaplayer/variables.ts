import type { Preflight } from '@unocss/core'

/**
 * QMediaPlayer's own design tokens, in the preset's namespace
 * (`--q-mediaplayer-*`; upstream also states the play button's as the bare
 * `--big-play-button-*`, which have no prefix of their own).
 *
 * The player paints its own canvas, so upstream's `-dark` twins are dropped
 * entirely rather than bridged: `#000000` is the canvas in either scheme, and
 * the button sits on that canvas, so a scheme flip would repaint a surface the
 * component deliberately owns. The one exception is the error surface, which is
 * semantic rather than canvas — it bridges to `--q-negative` and therefore
 * flips. Like the calendar's bridge it is declared on `body` as well as
 * `:root`; see `qcalendar/variables.ts` for the measurement behind that.
 */

/** Canvas, and the play button painted onto it. */
const canvas = {
  '--q-mediaplayer-color': '#ffffff',
  '--q-mediaplayer-background': '#000000',
  '--q-mediaplayer-error-color': '#ffffff',
  '--q-mediaplayer-big-play-button-color': '#ffffff',
  '--q-mediaplayer-big-play-button-background': '#90a4ae',
  '--q-mediaplayer-big-play-button-border': '#ffffff 1px solid',
  '--q-mediaplayer-big-play-button-border-hover': '#ffffff 1px solid',
  '--q-mediaplayer-big-play-button-hover-color': '#90a4ae',
  '--q-mediaplayer-big-play-button-hover-background': 'rgba(255, 255, 255, 0.2)'
} as const

/** The error surface, bridged to the preset's status colour. */
const bridged = {
  '--q-mediaplayer-error-background': 'var(--q-negative)'
} as const

const block = (selector: string, vars: Record<string, string>): string =>
  `${selector} {\n${Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')}\n}`

export const qmediaplayerVariablesPreflights: Preflight[] = [
  {
    getCSS: () =>
      [block(':root', { ...canvas, ...bridged }), block('body', bridged)].join(
        '\n\n'
      )
  }
]
