import type { Rule } from '@unocss/core'

export const separatorRules = [
  [
    /^q-separator$/,
    function* (_, { symbols }) {
      yield {
        'background-color': 'var(--q-separator-color)',
        // Reference states the reset as longhands (`border-width: 0px`), not the
        // `border` shorthand, so the declaration the gate measures is present.
        'border-width': '0px',
        'border-style': 'none',
        // `calc(var(--spacing) * 0)` in the reference; equal to `0`.
        margin: 'calc(var(--spacing) * 0)',
        'flex-shrink': 0,
        transition: 'background 0.3s, opacity 0.3s'
      }
      // Reference `body.quasar-style-unstyled .q-separator`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-separator--dark$/,
    () => ({
      'background-color':
        'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--un-bg-opacity), transparent)'
    })
  ],
  [
    /^q-separator--horizontal$/,
    () => ({
      height: '1px',
      display: 'block',
      margin: 'var(--q-space-sm) 0'
    })
  ],
  [
    /^q-separator--vertical$/,
    () => ({
      width: '1px',
      height: 'auto',
      'align-self': 'stretch',
      margin: '0 var(--q-space-sm)'
    })
  ],
  [
    /^q-separator--inset$/,
    () => ({
      // Inset
    })
  ],
  [
    /^q-separator--spaced$/,
    function* (_, { symbols }) {
      yield {
        margin: 'var(--q-space-md) 0'
      }
      // Reference `.q-separator--spaced + .q-item__label--header`.
      yield {
        [symbols.selector]: (sel) => `${sel} + .q-item__label--header`,
        'padding-top': '8px'
      }
    }
  ],
  [
    /^q-list--padding$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-item__label--header`,
        'padding-top': '8px'
      }
    }
  ],
  [
    /^q-separator--horizontal-inset$/,
    function* () {
      yield { 'margin-left': '16px', 'margin-right': '16px' }
    }
  ],
  [
    /^q-separator--horizontal-item-inset$/,
    function* () {
      yield { 'margin-left': '72px', 'margin-right': '0' }
    }
  ],
  [
    /^q-separator--horizontal-item-thumbnail-inset$/,
    function* () {
      yield { 'margin-left': '116px', 'margin-right': '0' }
    }
  ],
  [
    /^q-separator--vertical-inset$/,
    function* () {
      yield { 'margin-top': '8px', 'margin-bottom': '8px' }
    }
  ]
] as Rule[]
