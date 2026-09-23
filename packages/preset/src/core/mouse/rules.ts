import type { Rule } from '@unocss/core'
import type { ComponentRule } from '../../rules/types.js'

/**
 * Mouse/pointer utilities — ported from core/mouse.unocss.ts.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition
 * - Pointer-events-all as a rule (was a rule in original)
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

export const mouseRules: ComponentRule[] = [
  // --- Pointer events ---
  rule(/^pointer-events-all$/, () => ({ 'pointer-events': 'all' })),
  rule(/^no-pointer-events$/, () => ({ 'pointer-events': 'none' })),

  // --- User selection ---
  rule(/^non-selectable$/, () => ({ 'user-select': 'none' })),

  // --- Scroll ---
  rule(/^scroll$/, () => ({ overflow: 'auto' })),
  rule(/^scroll-x$/, () => ({ 'overflow-x': 'auto' })),
  rule(/^scroll-y$/, () => ({ 'overflow-y': 'auto' })),
  rule(/^no-scroll$/, () => ({ overflow: 'hidden' })),

  // --- Cursor ---
  rule(/^cursor-inherit$/, () => ({ cursor: 'inherit' })),
  rule(/^cursor-pointer$/, () => ({ cursor: 'pointer' }))
  // `cursor-none` / `cursor-not-allowed` are Quasar's too (docs: Other helper
  // classes) but wind4 already emits both, so they stay delegated — see the
  // disposition table. dist carries `!important` on them and wind4 does not;
  // that divergence is recorded there instead of being duplicated here.
]

/**
 * Documented pointer helpers no other module owns (AUD-002, AUD-021).
 *
 * dist carries `!important` on both: `all-pointer-events` has to beat component
 * rules that set `pointer-events`, and `no-pointer-events--children` has to
 * reach every descendant — which needs a second selector, so the companion is
 * yielded rather than composed.
 */
export const mouseHelperRules: Rule[] = [
  [
    /^no-pointer-events--children$/,
    function* (_, { symbols }) {
      yield { 'pointer-events': 'none !important' }
      yield {
        [symbols.selector]: (sel: string) => `${sel} *`,
        'pointer-events': 'none !important'
      }
    }
  ]
]

/**
 * `all-pointer-events` cannot travel through the rule pipeline (AUD-002).
 *
 * Measured, not assumed: as a dynamic rule the candidate is dropped before any
 * matcher runs, as a static rule (`rulesStaticMap`, which is consulted first for
 * an exact candidate) it is dropped as well, and an injected top-level rule in
 * the same composition is dropped too — while `zzz-test`, `pointer-events-all`
 * and `no-pointer-events--children` all emit. UnoCSS's `TokenProcessor.parse`
 * consults the shortcut layer before the rule layer and `all-*` never reaches
 * `parseUtil` in this preset's composition. The class is safelisted and dist
 * styles it unconditionally, so it ships through the static CSS channel used by
 * the media-query families and the keyframes.
 */
export const mouseHelperCss: string =
  '.all-pointer-events{pointer-events:all !important}'
