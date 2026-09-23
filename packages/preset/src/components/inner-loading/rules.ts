import type { Rule } from '@unocss/core'

export const innerLoadingRules = [
  [
    /^q-inner-loading$/,
    function* (_, { symbols }) {
      // .q-inner-loading
      yield {
        background: 'rgba(255, 255, 255, 0.6)',
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        background: 'rgba(0, 0, 0, 0.4)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        'margin-top': '8px'
      }
    }
  ]
] as Rule[]
