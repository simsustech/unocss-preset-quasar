import type { Rule } from '@unocss/core'

export const intersectionRules = [
  [
    /^q-intersection$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--once`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disable`
      }
    }
  ]
] as Rule[]
