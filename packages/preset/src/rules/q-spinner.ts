import type { Rule } from '@unocss/core'

export const qSpinnerRules: Rule[] = [
  [
    /^q-spinner$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center'
    })
  ]
]
