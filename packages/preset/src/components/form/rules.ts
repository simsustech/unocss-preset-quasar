import type { Rule } from '@unocss/core'

export const formRules = [
  [
    /^q-form$/,
    function* () {
      yield {
        display: 'flex',
        'flex-direction': 'column'
      }
      yield { position: 'relative' }
    }
  ]
] as Rule[]
