import type { Rule } from '@unocss/core'

export const qOptionGroupRules: Rule[] = [
  [
    /^q-option-group$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      gap: '4px'
    })
  ],
  [
    /^q-option-group--inline$/,
    () => ({
      'flex-direction': 'row',
      'flex-wrap': 'wrap'
    })
  ]
]
