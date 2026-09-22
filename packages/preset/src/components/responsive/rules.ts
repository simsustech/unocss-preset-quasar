import type { Rule } from '@unocss/core'

export const responsiveRules = [
  [
    /^q-responsive$/,
    function* (_, { symbols }) {
      // .q-responsive
      yield {
        // Reference: `max-width: 100%; max-height: 100%; position: relative` (no
        // `overflow: hidden` — that was the rewrite's own addition).
        'max-width': '100%',
        'max-height': '100%',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--ratio`
        // Ratio
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__filler`,
        width: 'inherit',
        'max-width': 'inherit',
        height: 'inherit',
        'max-height': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content > *`,
        width: '100% !important',
        height: '100% !important',
        'max-height': '100% !important',
        'max-width': '100% !important'
      }
    }
  ]
] as Rule[]
