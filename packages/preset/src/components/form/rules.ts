import type { Rule } from '@unocss/core'

export const formRules = [
  [
    /^q-form$/,
    function* () {
      // .q-form
      yield {
        display: 'flex',
        'flex-direction': 'column'
      }
      yield { position: 'relative' }
    }
  ]
] as Rule[]
