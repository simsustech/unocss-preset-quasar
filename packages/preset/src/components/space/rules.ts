import type { Rule } from '@unocss/core'

export const spaceRules = [
  [
    /^q-space$/,
    function* (_, { symbols }) {
      // .q-space
      yield { flex: '1', 'flex-grow': 1 }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ]
] as Rule[]
