import type { Rule } from '@unocss/core'

export const inputRules = [
  [
    /^q-input$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`,
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0'
      }
    }
  ]
] as Rule[]
