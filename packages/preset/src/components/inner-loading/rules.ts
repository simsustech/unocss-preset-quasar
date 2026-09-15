import type { Rule } from '@unocss/core'

export const innerLoadingRules = [
  [
    /^q-inner-loading$/,
    function* () {
      yield {
        background: 'rgba(255, 255, 255, 0.6)',
        'border-radius': 'inherit'
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
