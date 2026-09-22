import type { Rule } from '@unocss/core'

export const badgeRules = [
  [
    /^q-badge$/,
    function* (_, { symbols }) {
      // .q-badge
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'border-radius': 'var(--q-radius-full)',
        'background-color': 'var(--q-primary)',
        color: 'var(--q-on-primary)',
        'font-size': 'var(--q-label-medium-size)',
        'font-weight': 'var(--q-badge-font-weight)',
        'line-height': 1,
        padding: '3px 7px',
        // quasar: Quasar's badge min-height
        'min-height': '20px',
        'min-width': '20px',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        // No `font-size` here: the base rule's 12px is Quasar's value (and what
        // the harness asserts). This parity copy's 11px won the cascade and
        // rendered every badge a size too small.
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)',
        'line-height': 'var(--leading-none)',
        'font-weight': 'var(--fontWeight-normal)',
        // quasar: Quasar's badge padding
        'padding-inline': '6px',
        'padding-block': '0',
        'vertical-align': 'baseline',
        // quasar: unstyled badge reproduces Quasar's 4px corner
        'border-radius': '4px',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        height: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--outline`,
        'border-color': 'currentColor',
        'border-style': 'solid',
        'background-color': 'transparent',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--transparent`,
        opacity: '80%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--multi-line`,
        'word-break': 'break-all',
        'word-wrap': 'break-word'
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
        [symbols.selector]: (selector) => `${selector}--transparent`,
        'background-color': 'transparent',
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--multi-line`,
        'white-space': 'normal',
        padding: '4px 8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`
        // Dark mode
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
