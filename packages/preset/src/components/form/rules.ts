import type { Rule } from '@unocss/core'

export const formRules = [
  [
    /^q-form$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  // --- Reference parity: the form is the positioning context for its children ---
  [
    /^q-form$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield { position: 'relative' }
    }
  ]
] as Rule[]
