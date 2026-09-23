import type { Preflight } from '@unocss/core'

/**
 * QCalendar's own design tokens.
 *
 * Which colour belongs to which slot is read off the style specs in
 * `src/theme/index.ts` (`md3Style` / `md2Style`), not off upstream's palette.
 * Three rules come out of that:
 *
 * 1. **A slot the specs define per style uses the style token for it**, not a
 *    raw role: dividers take `--q-separator-color` (md3 `outline-variant`, md2
 *    `rgba(0, 0, 0, .12)`, unstyled `transparent`), and a selected/active day
 *    takes `--q-item-active-bg` + `--q-item-active-color` (md3
 *    `secondary-container`/`on-secondary-container`, md2
 *    `color-mix(primary 12%)`/`primary`). Those tokens are re-stated by the
 *    preflight for every style and in dark, so the calendar follows the style
 *    and the scheme without a rule of its own.
 * 2. **A slot with no style divergence takes the shared role**: text is
 *    `--q-on-surface`, muted text is `--q-on-surface-variant`, backgrounds are
 *    `--q-surface`, mid greys are `--q-outline`, and accents are `--q-primary`
 *    (the accent role the specs use for `btnBg`, `fabBg`, `btnOutlineColor`).
 * 3. **Only non-colours stay literal**: the fixed measurements. Upstream's own
 *    literals (`#027be3` accents, `#cce7ff` highlights, `#606c71` text,
 *    `#ffff66` dark accents) are not used at all — with the roles in place,
 *    dark needs no table: `--q-*` and the style tokens are already re-stated on
 *    `body.body--dark`.
 *
 * The themed declarations are emitted twice, and that is measured: a custom
 * property's `var()` is substituted on the element that *declares* it, so a
 * `:root`-only `--q-calendar-background: var(--q-surface)` resolves against
 * `:root`'s light `--q-surface` and inherits that literal into
 * `body.body--dark` whatever the scheme (in Chromium: `--q-on-surface` read
 * `#e3e2e6` on a dark body while the bridge read `#1a1c1e`; declared on `body`
 * as well, it reads `#e3e2e6`).
 */

/** Not colours: measurements carry no role and no scheme. */
const measurements = {
  '--q-calendar-scrollbar-width-height': '10px',
  '--q-calendar-intervals-width': '56px',
  '--q-calendar-resources-width': '100px',
  '--q-calendar-work-week-width': '30px',
  '--q-calendar-mini-work-week-width': '30px',
  '--q-calendar-work-week-font-size': '1em',
  '--q-calendar-head-font-weight': '600'
} as const

/**
 * Upstream `--calendar-*` → this preset. Dividers and the selected/active
 * family are the style tokens; the rest are shared roles.
 */
const themed = {
  // Dividers: md3Style/md2Style `separatorColor`.
  '--q-calendar-border': 'var(--q-separator-color) 1px solid',
  '--q-calendar-border-section': 'var(--q-separator-color) 1px dashed',
  // The current-day frame is the accent, as `btnOutlineColor` is.
  '--q-calendar-border-current': 'var(--q-primary) 2px solid',
  '--q-calendar-mini-range-connector-hover-border':
    'var(--q-primary) 1px dashed',
  // Body text and the page surface.
  '--q-calendar-color': 'var(--q-on-surface)',
  '--q-calendar-background': 'var(--q-surface)',
  '--q-calendar-current-color': 'var(--q-primary)',
  '--q-calendar-current-background': 'transparent',
  // Muted cells; upstream's `#a1a1a1` was the only hint that they are muted.
  '--q-calendar-disabled-date-color': 'var(--q-on-surface-variant)',
  '--q-calendar-disabled-date-background': 'var(--q-surface)',
  '--q-calendar-outside-color': 'var(--q-on-surface-variant)',
  '--q-calendar-outside-background': 'transparent',
  // Selected/active/range: md3Style/md2Style `itemActiveBg` + `itemActiveColor`.
  '--q-calendar-active-date-color': 'var(--q-item-active-color)',
  '--q-calendar-active-date-background': 'var(--q-item-active-bg)',
  '--q-calendar-selected-color': 'var(--q-item-active-color)',
  '--q-calendar-selected-background': 'var(--q-item-active-bg)',
  '--q-calendar-range-color': 'var(--q-item-active-color)',
  '--q-calendar-range-background': 'var(--q-item-active-bg)',
  '--q-calendar-mini-selected-color': 'var(--q-primary)',
  '--q-calendar-mini-selected-background': 'transparent',
  '--q-calendar-mini-selected-label-color': 'var(--q-item-active-color)',
  '--q-calendar-mini-selected-label-background': 'var(--q-item-active-bg)',
  // The mini calendar paints its range in the highlight colour, not on it.
  '--q-calendar-mini-range-color': 'var(--q-item-active-bg)',
  '--q-calendar-mini-range-background': 'transparent',
  '--q-calendar-mini-range-label-color': 'var(--q-item-active-bg)',
  '--q-calendar-mini-range-label-background': 'var(--q-item-active-bg)',
  '--q-calendar-mini-range-connector-color': 'var(--q-item-active-bg)',
  '--q-calendar-mini-range-hover-color': 'var(--q-primary)',
  '--q-calendar-mini-range-firstlast-color': 'var(--q-item-active-bg)',
  '--q-calendar-mini-range-firstlast-background': 'transparent',
  '--q-calendar-mini-range-firstlast-label-color': 'var(--q-item-active-bg)',
  '--q-calendar-mini-range-firstlast-label-background': 'var(--q-primary)',
  // Scrollbar: raised track, mid grey thumb, darker on hover.
  '--q-calendar-scrollbar-track': 'var(--q-surface-container)',
  '--q-calendar-scrollbar-thumb': 'var(--q-outline)',
  '--q-calendar-scrollbar-thumb-hover': 'var(--q-on-surface-variant)'
} as const

const tokens = { ...measurements, ...themed }

/**
 * The declarations that name another custom property. They are the ones that
 * must be restated on `body` to follow the scheme, and deriving the set from
 * the values keeps that requirement impossible to forget when a token is added.
 */
const themedOnBody = Object.fromEntries(
  Object.entries(tokens).filter(([, value]) => value.includes('var('))
)

const block = (selector: string, vars: Record<string, string>): string =>
  `${selector} {\n${Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')}\n}`

export const qcalendarVariablesPreflights: Preflight[] = [
  {
    getCSS: () =>
      [block(':root', tokens), block('body', themedOnBody)].join('\n\n')
  }
]
