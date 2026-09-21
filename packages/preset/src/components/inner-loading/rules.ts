import type { Rule } from '@unocss/core'

export const innerLoadingRules = [
  [
    /^q-inner-loading$/,
    function* (_, { symbols }) {
      yield {
        background: 'rgba(255, 255, 255, 0.6)',
        'border-radius': 'inherit'
      }
      // Reference `body.quasar-style-unstyled .q-inner-loading`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-inner-loading--dark$/,
    function* () {
      yield { background: 'rgba(0, 0, 0, 0.4)' }
    }
  ],
  [
    /^q-inner-loading__label$/,
    function* () {
      yield { 'margin-top': '8px' }
    }
  ]
] as Rule[]
