import type { ComponentRule } from '../../rules/types.js'

/**
 * Visibility utilities — ported from core/visibility.unocss.ts as self-contained CSS.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition (!m-0, !p-0)
 * - Preserves !important where quasar.css uses it
 *
 * Note: responsive breakpoint hides (xs-hide, gt-xs, etc.) and q-focus-helper
 * styles are in preflights/visibility.ts since they need @media queries and
 * pseudo-elements that UnoCSS rules can't produce.
 */

/** CSS value — strings or unitless numbers */
type CSSValue = string | number

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, CSSValue>
): ComponentRule {
  return [regex, matcher]
}

export const visibilityRules: ComponentRule[] = [
  // Quasar hides native inputs with `hidden` (dynamic class). Source: quasar.css.
  rule(/^hidden$/, () => ({ display: 'none' })),
  // --- No-* resets ---
  rule(/^no-margin$/, () => ({ margin: 0 })),
  rule(/^no-padding$/, () => ({ padding: 0 })),
  rule(/^no-border$/, () => ({ border: 0 })),
  rule(/^no-border-radius$/, () => ({ 'border-radius': 0 })),
  rule(/^no-box-shadow$/, () => ({ 'box-shadow': 'none' })),
  rule(/^no-outline$/, () => ({ outline: 0 })),

  // --- Ellipsis ---
  rule(/^ellipsis$/, () => ({
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    overflow: 'hidden'
  })),
  rule(/^ellipsis-2-lines$/, () => ({
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  })),
  rule(/^ellipsis-3-lines$/, () => ({
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical'
  })),

  // --- Disabled ---
  rule(/^disabled$/, () => ({
    outline: 0,
    cursor: 'not-allowed',
    opacity: 0.6
  })),

  // --- Readonly ---
  rule(/^readonly$/, () => ({ cursor: 'default' })),

  // --- Transparent ---
  rule(/^transparent$/, () => ({ 'background-color': 'transparent' })),

  // --- Invisible ---
  rule(/^invisible$/, () => ({
    visibility: 'hidden',
    transition: 'none',
    animation: 'none'
  })),

  // --- Overflow ---
  rule(/^overflow-hidden-y$/, () => ({ 'overflow-y': 'hidden' })),

  // --- Z-index ---
  rule(/^z-top$/, () => ({ 'z-index': 7000 })),
  rule(/^z-max$/, () => ({ 'z-index': 9998 }))

  // --- Focusable helpers ---
  // `q-focusable`, `q-hoverable`, `q-manual-focusable` and `q-focus-helper` are
  // owned by `core/helpers/rules.ts` (the focus family lives in one file, and
  // UnoCSS silently drops a second matcher for the same regex).

  // NOTE: the QResponsive component rules (`.q-responsive`, `__content`,
  // `__filler`, and the unstyled style override) live in
  // `components/responsive/rules.ts`, next to the component they belong to.
]

/**
 * Quasar's breakpoint table, which the reference sheet emits literally:
 *
 *   xs 0-599.98 | sm 600-1023.98 | md 1024-1439.98 | lg 1440-1919.98 | xl 1920+
 *
 * Media queries reject `var()`, so these numbers cannot be tokens; they are
 * Quasar's own breakpoints, and the ranges are the reference's (each upper bound
 * is the next breakpoint minus 0.02px so the ranges never overlap).
 */
const RESPONSIVE_BREAKPOINTS = [
  { name: 'xs', up: 0 },
  { name: 'sm', up: 600 },
  { name: 'md', up: 1024 },
  { name: 'lg', up: 1440 },
  { name: 'xl', up: 1920 }
] as const

const breakpointQuery = (index: number): string => {
  const current = RESPONSIVE_BREAKPOINTS[index]
  const next = RESPONSIVE_BREAKPOINTS[index + 1]
  if (!next) return `(min-width: ${current.up}px)`
  const upper = `(max-width: ${next.up - 0.02}px)`
  // The first range has no lower bound — the reference is `(max-width: 599.98px)`.
  return current.up === 0 ? upper : `(min-width: ${current.up}px) and ${upper}`
}

/**
 * Responsive visibility (`xs`…`xl`, `lt-*`, `gt-*`, `*-hide`).
 *
 * Emitted as CSS text rather than as rules because a UnoCSS rule body cannot
 * carry an at-rule — a nested `'@media …'` key is stringified into
 * `[object Object]` by the generator (verified against unocss 66.10.1) — and
 * because the classes are added by Quasar or written in markup with no source
 * hint, so they must be emitted unconditionally, exactly as the reference does.
 * `src/index.ts` assembles this text into the preset's preflight block.
 *
 * In each range the elements hidden are: every breakpoint class except the
 * active one, the active breakpoint's `-hide`, the `lt-*` classes at or below it
 * and the `gt-*` classes at or above it.
 */
export const responsiveVisibilityCss: string = RESPONSIVE_BREAKPOINTS.map(
  (breakpoint, index) => {
    const hidden = [
      ...RESPONSIVE_BREAKPOINTS.filter((_, other) => other !== index).map(
        (other) => `.${other.name}`
      ),
      `.${breakpoint.name}-hide`,
      // `lt-xs` and `gt-xl` do not exist.
      ...RESPONSIVE_BREAKPOINTS.slice(1, index + 1).map(
        (other) => `.lt-${other.name}`
      ),
      ...RESPONSIVE_BREAKPOINTS.slice(index, -1).map(
        (other) => `.gt-${other.name}`
      )
    ].sort()
    return `@media ${breakpointQuery(index)}{${hidden.join(',')}{display:none !important}}`
  }
).join('\n')
