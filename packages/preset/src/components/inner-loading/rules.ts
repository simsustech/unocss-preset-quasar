import type { Rule } from '@unocss/core'

export const innerLoadingRules = [
  [
    /^q-inner-loading$/,
    function* () {
      yield { background: 'rgba(255, 255, 255, 0.6)', borderRadius: 'inherit' }
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
      yield { marginTop: '8px' }
    }
  ]
] as Rule[]
