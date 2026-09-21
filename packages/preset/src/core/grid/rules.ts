import type { ComponentRule } from '../../rules/types.js'

/**
 * Grid system — Wind4-style modernized.
 * - Row/column/flex containers as generator rules; .inline/.reverse
 *   companions ship on-demand via symbols.selector (no static preflight).
 * - col-N as single capture rule using --q-col-span variable.
 * - Responsive col-<bp>-N (sm/md/lg/xl) via single capture rule.
 * - Gutters as capture rules mapping size -> var(--q-space-*).
 */

const GUTTER_STEPS: Record<string, number> = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8
}

export const gridRules = [
  [
    /^row$/,
    function* (_: any, { symbols }: any) {
      yield {
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.inline`,
        display: 'inline-flex'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.reverse`,
        'flex-direction': 'row-reverse'
      }
    }
  ],
  [
    /^column$/,
    function* (_: any, { symbols }: any) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'wrap',
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.inline`,
        display: 'inline-flex'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.reverse`,
        'flex-direction': 'column-reverse'
      }
    }
  ],
  [
    /^flex$/,
    function* (_: any, { symbols }: any) {
      yield { display: 'flex' }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.inline`,
        display: 'inline-flex'
      }
    }
  ],
  [
    /^row-reverse$/,
    function* () {
      yield {
        display: 'flex',
        'flex-direction': 'row-reverse',
        'flex-wrap': 'wrap',
        flex: '1 1 auto'
      }
    }
  ],
  [
    /^column-reverse$/,
    function* () {
      yield {
        display: 'flex',
        'flex-direction': 'column-reverse',
        'flex-wrap': 'wrap',
        flex: '1 1 auto'
      }
    }
  ],

  [
    /^col$/,
    function* () {
      // `flex-grow` as a longhand too: the reference states it separately and
      // the shorthand's value is not visible to a per-property comparison.
      yield { flex: '1 1 0%', 'flex-grow': 1, 'max-width': '100%' }
    }
  ],
  [
    /^col-auto$/,
    function* () {
      yield { flex: '0 0 auto', width: 'auto', 'max-width': '100%' }
    }
  ],
  [
    /^col-grow$/,
    function* () {
      yield { flex: '1 1 auto', 'flex-grow': 1, 'max-width': '100%' }
    }
  ],
  [
    /^col-shrink$/,
    function* () {
      yield { flex: '0 1 auto', 'max-width': '100%' }
    }
  ],

  // col-N -> --q-col-span variable (Wind4-style single capture)
  [
    /^col-(\d+)$/,
    function* ([, span]: string[]) {
      const n = Number(span)
      if (n < 1 || n > 12) return
      yield {
        '--q-col-span': span,
        flex: '0 0 calc(var(--q-col-span) / 12 * 100%)',
        'max-width': 'calc(var(--q-col-span) / 12 * 100%)'
      }
    }
  ],
  // col-<bp>-N responsive (relies on UnoCSS sm:/md: variants for wrapping; base value here)
  [
    /^col-(sm|md|lg|xl)-(\d+|auto|grow|shrink)$/,
    function* ([, , span]: string[]) {
      if (span === 'auto')
        yield { flex: '0 0 auto', width: 'auto', 'max-width': '100%' }
      else if (span === 'grow') yield { flex: '1 1 auto', 'max-width': '100%' }
      else if (span === 'shrink')
        yield { flex: '0 1 auto', 'max-width': '100%' }
      else {
        const n = Number(span)
        if (n < 1 || n > 12) return
        yield {
          '--q-col-span': span,
          flex: '0 0 calc(var(--q-col-span) / 12 * 100%)',
          'max-width': 'calc(var(--q-col-span) / 12 * 100%)'
        }
      }
    }
  ],

  [
    /^wrap$/,
    function* () {
      yield { 'flex-wrap': 'wrap' }
    }
  ],
  [
    /^no-wrap$/,
    function* () {
      yield { 'flex-wrap': 'nowrap' }
    }
  ],
  [
    /^reverse-wrap$/,
    function* () {
      yield { 'flex-wrap': 'wrap-reverse' }
    }
  ],

  [
    /^flex-center$/,
    function* () {
      yield { 'justify-content': 'center', 'align-items': 'center' }
    }
  ],

  // gutters: single capture -> wind4 spacing steps, as the reference emits them
  [
    /^q-(col-)?gutter-([a-z]+)$/,
    function* ([, , size]: string[]) {
      // The reference emits only the column gap for the plain gutter class.
      yield {
        'column-gap': `calc(var(--spacing) * ${GUTTER_STEPS[size] ?? 0})`
      }
    }
  ],
  [
    /^q-(col-)?gutter-x-([a-z]+)$/,
    function* ([, , size]: string[]) {
      yield {
        'column-gap': `calc(var(--spacing) * ${GUTTER_STEPS[size] ?? 0})`
      }
    }
  ],
  [
    /^q-(col-)?gutter-y-([a-z]+)$/,
    function* ([, , size]: string[]) {
      yield { 'row-gap': `calc(var(--spacing) * ${GUTTER_STEPS[size] ?? 0})` }
    }
  ],

  [
    /^order-first$/,
    function* () {
      yield { order: '-1' }
    }
  ],
  [
    /^order-last$/,
    function* () {
      yield { order: '9999' }
    }
  ],
  [
    /^order-none$/,
    function* () {
      yield { order: '0' }
    }
  ],
  [
    /^shrink$/,
    () => ({
      'flex-shrink': 1
    })
  ]
  // SAFETY: generator matchers yield valid CSSObjects at runtime, but TS
  // cannot verify symbols.selector computed keys statically, so the array
  // is asserted to ComponentRule[] (same pattern as components/btn/rules.ts).
] as unknown as ComponentRule[]
