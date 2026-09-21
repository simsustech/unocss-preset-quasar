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
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-input__progress$/,
    () => ({
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0'
    })
  ]
] as Rule[]
