import type { Rule } from '@unocss/core'

export const qFileRules: Rule[] = [
  [
    /^q-file$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-file__progress$/,
    () => ({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0
    })
  ]
]
