import type { ComponentRule } from '../../rules/types.js'

/**
 * Grid system — Wind4-style modernized.
 * - Row/column/flex containers as generator rules; .inline/.reverse
 *   companions ship on-demand via symbols.selector (no static preflight).
 * - col-N as single capture rule using --q-col-span variable.
 * - Responsive col-<bp>-N (sm/md/lg/xl) via single capture rule.
 * - Gutters as capture rules mapping size -> var(--q-space-*).
 */

export const gridRules = [
  [
    /^row$/,
    function* (_: any, { symbols }: any) {
      yield {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.inline`,
        display: 'inline-flex'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.reverse`,
        flexDirection: 'row-reverse'
      }
    }
  ],
  [
    /^column$/,
    function* (_: any, { symbols }: any) {
      yield {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.inline`,
        display: 'inline-flex'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.reverse`,
        flexDirection: 'column-reverse'
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
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        flex: '1 1 auto'
      }
    }
  ],
  [
    /^column-reverse$/,
    function* () {
      yield {
        display: 'flex',
        flexDirection: 'column-reverse',
        flexWrap: 'wrap',
        flex: '1 1 auto'
      }
    }
  ],

  [
    /^col$/,
    function* () {
      yield { flex: '1 1 0%', maxWidth: '100%' }
    }
  ],
  [
    /^col-auto$/,
    function* () {
      yield { flex: '0 0 auto', width: 'auto', maxWidth: '100%' }
    }
  ],
  [
    /^col-grow$/,
    function* () {
      yield { flex: '1 1 auto', maxWidth: '100%' }
    }
  ],
  [
    /^col-shrink$/,
    function* () {
      yield { flex: '0 1 auto', maxWidth: '100%' }
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
        maxWidth: 'calc(var(--q-col-span) / 12 * 100%)'
      }
    }
  ],
  // col-<bp>-N responsive (relies on UnoCSS sm:/md: variants for wrapping; base value here)
  [
    /^col-(sm|md|lg|xl)-(\d+|auto|grow|shrink)$/,
    function* ([, , span]: string[]) {
      if (span === 'auto')
        yield { flex: '0 0 auto', width: 'auto', maxWidth: '100%' }
      else if (span === 'grow') yield { flex: '1 1 auto', maxWidth: '100%' }
      else if (span === 'shrink') yield { flex: '0 1 auto', maxWidth: '100%' }
      else {
        const n = Number(span)
        if (n < 1 || n > 12) return
        yield {
          '--q-col-span': span,
          flex: '0 0 calc(var(--q-col-span) / 12 * 100%)',
          maxWidth: 'calc(var(--q-col-span) / 12 * 100%)'
        }
      }
    }
  ],

  [
    /^wrap$/,
    function* () {
      yield { flexWrap: 'wrap' }
    }
  ],
  [
    /^no-wrap$/,
    function* () {
      yield { flexWrap: 'nowrap' }
    }
  ],
  [
    /^reverse-wrap$/,
    function* () {
      yield { flexWrap: 'wrap-reverse' }
    }
  ],

  [
    /^flex-center$/,
    function* () {
      yield { justifyContent: 'center', alignItems: 'center' }
    }
  ],

  // gutters: single capture -> var(--q-space-*)
  [
    /^q-(col-)?gutter-([a-z]+)$/,
    function* ([, , size]: string[]) {
      yield { gap: `var(--q-space-${size})` }
    }
  ],
  [
    /^q-(col-)?gutter-x-([a-z]+)$/,
    function* ([, , size]: string[]) {
      yield { columnGap: `var(--q-space-${size})` }
    }
  ],
  [
    /^q-(col-)?gutter-y-([a-z]+)$/,
    function* ([, , size]: string[]) {
      yield { rowGap: `var(--q-space-${size})` }
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
  ]
] as unknown as ComponentRule[]
