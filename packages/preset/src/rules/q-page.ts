import type { Rule } from '@unocss/core'

export const qPageRules: Rule[] = [
  [
    /^q-page$/,
    () => ({
      padding: '16px'
    })
  ],
  [
    /^q-page-container$/,
    () => ({
      flex: '1',
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-page-sticky$/,
    () => ({
      position: 'fixed',
      'z-index': '1000'
    })
  ]
]
