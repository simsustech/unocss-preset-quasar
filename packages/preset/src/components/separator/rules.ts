import type { Rule } from '@unocss/core'

export const separatorRules = [
  [
    /^q-separator$/,
    function* (_, { symbols }) {
      // .q-separator
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
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'background-color':
          'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--horizontal`,
        height: '1px',
        display: 'block',
        margin: 'var(--q-space-sm) 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical`,
        width: '1px',
        height: 'auto',
        'align-self': 'stretch',
        margin: '0 var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inset`
        // Inset
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--spaced`,
        margin: 'var(--q-space-md) 0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--spaced + .q-item__label--header`,
        'padding-top': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--horizontal-inset`,
        'margin-left': '16px',
        'margin-right': '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--horizontal-item-inset`,
        'margin-left': '72px',
        'margin-right': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal-item-thumbnail-inset`,
        'margin-left': '116px',
        'margin-right': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical-inset`,
        'margin-top': '8px',
        'margin-bottom': '8px'
      }
    }
  ],
  [
    /^q-list$/,
    function* (_, { symbols }) {
      // .q-list
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--padding .q-item__label--header`,
        'padding-top': '8px'
      }
    }
  ]
] as Rule[]
