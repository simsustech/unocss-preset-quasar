import type { Rule } from '@unocss/core'

export const qTableRules: Rule[] = [
  [
    /^q-table$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      width: '100%'
    })
  ],
  [
    /^q-table__container$/,
    () => ({
      overflow: 'auto'
    })
  ],
  [
    /^q-table th$/,
    () => ({
      'text-align': 'left',
      padding: '8px',
      'font-weight': '600',
      'border-bottom': '2px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-table td$/,
    () => ({
      padding: '8px',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ]
]
