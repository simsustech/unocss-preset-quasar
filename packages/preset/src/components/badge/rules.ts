import type { Rule } from '@unocss/core'

export const badgeRules = [
  [
    /^q-badge$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'border-radius': 'var(--q-radius-full)',
        'background-color': 'var(--q-primary)',
        color: 'var(--q-on-primary)',
        'font-size': '12px',
        'font-weight': 'var(--q-badge-font-weight)',
        'line-height': 1,
        padding: '3px 7px',
        'min-height': '20px',
        'min-width': '20px',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
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
        'padding-inline': '6px',
        'padding-block': '0',
        'vertical-align': 'baseline',
        'border-radius': '4px',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        height: '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--outline`,
        'border-color': 'currentColor',
        'border-style': 'solid',
        'background-color': 'transparent',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--transparent`,
        opacity: '80%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--multi-line`,
        'word-break': 'break-all',
        'word-wrap': 'break-word'
      }
      // A floating badge hangs off the top-right corner of its anchor and must
      // paint above it without inheriting the anchor's stacking context.
      yield {
        [symbols.selector]: (sel) => `${sel}--floating`,
        cursor: 'inherit',
        top: '-4px !important',
        right: '-3px',
        position: 'absolute !important',
        'z-index': '10',
        isolation: 'isolate'
      }
    }
  ],
  [
    /^q-badge--floating$/,
    () => ({
      // The reference pins the floating badge above its anchor; the full rule
      // (cursor, stacking isolation) follows in the parity block below.
      position: 'absolute !important',
      top: '-4px !important',
      right: '-3px',
      'z-index': '10',
      isolation: 'isolate'
    })
  ],
  [
    /^q-badge--outline$/,
    () => ({
      'background-color': 'transparent',
      color: 'var(--q-primary)',
      border: '1px solid var(--q-primary)'
    })
  ],
  [
    /^q-badge--rounded$/,
    () => ({
      'border-radius': 'var(--q-radius-md)'
    })
  ],
  [
    /^q-badge--transparent$/,
    () => ({
      'background-color': 'transparent',
      color: 'var(--q-primary)'
    })
  ],
  [
    /^q-badge--multi-line$/,
    () => ({
      'white-space': 'normal',
      padding: '4px 8px'
    })
  ],
  [
    /^q-badge--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-badge--dot$/,
    () => ({
      width: '8px',
      height: '8px',
      padding: 0,
      'min-width': '8px',
      'min-height': '8px'
    })
  ],
  [
    /^q-badge--single-line$/,
    function* () {
      yield { 'white-space': 'nowrap' }
    }
  ]
] as Rule[]
