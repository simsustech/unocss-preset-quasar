import type { Rule } from '@unocss/core'

export const inputRules = [
  [
    /^q-input$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-input__progress$/,
    () => ({
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0'
    })
  ],

  // The unstyled style entry drops the component's own surface.
  [
    /^q-input$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ]
] as Rule[]
