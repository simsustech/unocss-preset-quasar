import type { Rule } from '@unocss/core'

export const intersectionRules = [
  [
    /^q-intersection$/,
    function* (_, { symbols }) {
      // .q-intersection
      yield {
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--once`
        // Once
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disable`
        // Disable
      }
    }
  ]
] as Rule[]
