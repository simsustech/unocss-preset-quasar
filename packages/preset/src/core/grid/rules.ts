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
        'flex-wrap': 'wrap'
        // No `flex: 1 1 auto` here: Quasar's flex addon is
        // `.row,.column,.flex { display: flex; flex-wrap: wrap }`, and the
        // extra growth made every row/column in a consumer fill its parent —
        // in petboarding it stretched the drawer's content column to the full
        // drawer height, padding out the top of the drawer. Growth belongs to
        // `.col`/`.col-grow`.
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
        'flex-wrap': 'wrap'
        // No `flex: 1 1 auto` here: Quasar's flex addon is
        // `.row,.column,.flex { display: flex; flex-wrap: wrap }`, and the
        // extra growth made every row/column in a consumer fill its parent —
        // in petboarding it stretched the drawer's content column to the full
        // drawer height, padding out the top of the drawer. Growth belongs to
        // `.col`/`.col-grow`.
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
        'flex-wrap': 'wrap'
        // No `flex: 1 1 auto` here: Quasar's flex addon is
        // `.row,.column,.flex { display: flex; flex-wrap: wrap }`, and the
        // extra growth made every row/column in a consumer fill its parent —
        // in petboarding it stretched the drawer's content column to the full
        // drawer height, padding out the top of the drawer. Growth belongs to
        // `.col`/`.col-grow`.
      }
    }
  ],
  [
    /^column-reverse$/,
    function* () {
      yield {
        display: 'flex',
        'flex-direction': 'column-reverse',
        'flex-wrap': 'wrap'
        // No `flex: 1 1 auto` here: Quasar's flex addon is
        // `.row,.column,.flex { display: flex; flex-wrap: wrap }`, and the
        // extra growth made every row/column in a consumer fill its parent —
        // in petboarding it stretched the drawer's content column to the full
        // drawer height, padding out the top of the drawer. Growth belongs to
        // `.col`/`.col-grow`.
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
  // `xs` belongs to the family: Quasar's grid documents and styles it exactly
  // like the other four breakpoints (dist: `.col-xs-6 { flex: 0 0 auto }` + the
  // row-scoped width), and it was the one breakpoint with no matcher at all.
  [
    /^col-(xs|sm|md|lg|xl)-(\d+|auto|grow|shrink)$/,
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
  // Bare breakpoint columns (`col-xs` … `col-xl`) grow to fill the line, like
  // `col`. dist states `flex: 10000 1 0%` for each of them plus the row-scoped
  // reset (`.row > .col-xs { width: auto; min-width: 0; max-width: 100% }`); this
  // preset's single-class form carries the same intent as its `col` rule above,
  // so `col` and `col-<bp>` stay one behaviour.
  [
    /^col-(xs|sm|md|lg|xl)$/,
    function* () {
      yield { flex: '1 1 0%', 'flex-grow': 1, 'max-width': '100%' }
    }
  ],
  // Offsets: Quasar only applies them inside a row — dist has no bare
  // `.offset-2`, only `.row > .offset-2 { margin-left: 16.6667% }` — so the rule
  // emits that qualified selector. Steps mirror `.col-<bp>-N`'s 12 columns.
  [
    /^offset-(?:(\d+)|(xs|sm|md|lg|xl)-(\d+))$/,
    function* ([, bare, , spanned]: string[], { symbols }: any) {
      const n = Number(bare ?? spanned)
      if (!Number.isInteger(n) || n < 0 || n > 12) return
      yield {
        [symbols.selector]: (sel: string) => `.row > ${sel}`,
        'margin-left': `${Number(((n / 12) * 100).toFixed(4))}%`
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
