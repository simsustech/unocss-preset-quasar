import type { Rule } from '@unocss/core'

export const qFormRules: Rule[] = [
  [
    /^q-form$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ]
]
