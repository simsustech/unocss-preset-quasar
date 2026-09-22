import type { Rule } from '@unocss/core'

export const formRules = [
  [
    /^q-form$/,
    function* (_, { symbols }) {
      // .q-form
      yield {
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield { position: 'relative' }
    }
  ]
] as Rule[]
