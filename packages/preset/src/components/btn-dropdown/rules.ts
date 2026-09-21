import type { Rule } from '@unocss/core'

export const btnDropdownRules = [
  [
    /^q-btn-dropdown$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex'
      }
      // Reference `body.quasar-style-unstyled .q-btn-dropdown`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-btn-dropdown__arrow$/,
    () => ({
      // Reference states the rotation transition rather than a generic one:
      // `transition-property: transform,translate,scale,rotate; transition-duration: 280ms`.
      'margin-left': '4px',
      'transition-property': 'transform,translate,scale,rotate',
      'transition-duration': '280ms'
    })
  ],
  [
    /^q-btn-dropdown--split$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn-dropdown__arrow-container`,
        // Logical padding longhands, as the reference states them.
        'padding-inline': '4px',
        'padding-block': 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-btn-dropdown__arrow-container.q-btn--outline`,
        'border-left-width': '1px',
        'border-left-color': 'currentColor',
        'border-left-style': 'solid'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-btn-dropdown__arrow-container:not(.q-btn--outline)`,
        'border-left-width': '1px',
        'border-left-color':
          'color-mix(in oklab, var(--colors-white) var(--un-border-left-opacity), transparent)',
        'border-left-style': 'solid'
      }
    }
  ],
  [
    /^q-btn-dropdown--simple$/,
    function* (_, { symbols }) {
      // Reference `.q-btn-dropdown--simple+.q-btn-dropdown__arrow` — the minifier
      // drops the universal selector from `* +`, which is the same selector.
      yield {
        [symbols.selector]: (sel) => `${sel}+.q-btn-dropdown__arrow`,
        'margin-left': '8px'
      }
    }
  ],
  [
    /^q-btn-dropdown--current$/,
    function* () {
      yield { 'flex-grow': '1' }
    }
  ]
] as Rule[]
