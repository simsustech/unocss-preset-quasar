import type { Rule } from '@unocss/core'

export const qMarkupTableRules: Rule[] = [
  [
    /^q-markup-table$/,
    () => ({
      width: '100%',
      'border-collapse': 'collapse'
    })
  ],
  [
    /^q-markup-table th$/,
    () => ({
      'text-align': 'left',
      padding: '8px',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-markup-table td$/,
    () => ({
      padding: '8px',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ]
]
