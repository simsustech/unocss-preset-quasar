import type { Rule } from '@unocss/core'

export const formRules = [
  [
    /^q-form$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield { position: 'relative' }
    }
  ]
] as Rule[]
