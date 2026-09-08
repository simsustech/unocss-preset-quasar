import type { Rule } from '@unocss/core'

export const qSelectRules: Rule[] = [
  [
    /^q-select$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ]
]
