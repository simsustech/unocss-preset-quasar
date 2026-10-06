import type { Rule } from '@unocss/core'

export const badgeRules = [
  [
    /^q-badge$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        // MD3's badge corner is 8dp and Quasar's own is 4px; the token carries
        // the per-style value (theme `radiusSm`: md3 8px, md2 4px), which is why
        // no body-class scoping is needed here.
        'border-radius': 'var(--q-radius-sm)',
        'background-color': 'var(--q-primary)',
        color: 'var(--q-on-primary)',
        // MD3 label-small is 11px, Quasar's own 12px; the token reads 11px in
        // md3 and md2 alike (and `inherit` when unstyled).
        // quasar: dist states 12px here, not MD3's label-small token (11px).
        // The harness's rewrite-style-switcher spec caught the difference: the
        // adjudication in the fix plan's Revision 3 read the MD3 token, and
        // Quasar's own shipped CSS disagrees.
        'font-size': '12px',
        'font-weight': 'var(--q-badge-font-weight)',
        'line-height': 'var(--leading-none)',
        // quasar: Quasar's badge box is 16px tall (dist) / 12px min-height
        // (quasar.css); the design layer's 20px min box fought that `height`.
        height: '16px',
        'min-width': '16px',
        'padding-block': '0',
        // quasar: Quasar's badge padding (2px 6px)
        'padding-inline': '6px',
        'vertical-align': 'baseline',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--outline`,
        'border-color': 'currentColor',
        'border-style': 'solid',
        'background-color': 'transparent',
        'border-width': '1px'
      }
      // AUD-024 fold: `--transparent` and `--multi-line` were each declared twice
      // with *disjoint* properties (the reset here, the opacity/word-break pair
      // below), so each pair is a single yield now.
      yield {
        [symbols.selector]: (selector) => `${selector}--transparent`,
        opacity: '80%',
        'background-color': 'transparent',
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--multi-line`,
        'word-break': 'break-all',
        'word-wrap': 'break-word',
        'white-space': 'normal',
        padding: '4px 8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--floating`,
        cursor: 'inherit',
        top: '-4px !important',
        right: '-3px',
        position: 'absolute !important',
        'z-index': '10',
        isolation: 'isolate'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--floating`,
        // The reference pins the floating badge above its anchor; the full rule
        // (cursor, stacking isolation) follows in the parity block below.
        position: 'absolute !important',
        top: '-4px !important',
        right: '-3px',
        'z-index': '10',
        isolation: 'isolate'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--outline`,
        'background-color': 'transparent',
        color: 'var(--q-primary)',
        border: '1px solid var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--rounded`,
        'border-radius': 'var(--q-radius-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dot`,
        width: '8px',
        height: '8px',
        padding: 0,
        'min-width': '8px',
        // quasar: Quasar's dot badge size
        'min-height': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--single-line`,
        'white-space': 'nowrap'
      }
    }
  ]
] as Rule[]
