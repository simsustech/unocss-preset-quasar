import type { Rule } from '@unocss/core'

export const qTabPanelsRules: Rule[] = [
  [
    /^q-tab-panels$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-tab-panel$/,
    () => ({
      padding: '16px'
    })
  ]
]
