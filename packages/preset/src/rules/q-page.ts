import type { Rule } from '@unocss/core'

export const qPageRules: Rule[] = [
  [
    /^q-page$/,
    () => ({
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-page--padding$/,
    () => ({
      padding: 'var(--q-space-md)'
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
      'z-index': 7000
    })
  ],
  [
    /^q-page-sticky--expand$/,
    () => ({
      // Expand
    })
  ]
]
