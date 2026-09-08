import type { Rule } from '@unocss/core'

export const qHeaderRules: Rule[] = [
  [
    /^q-header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '0 16px',
      'min-height': '50px',
      'background-color': 'var(--q-surface-container)'
    })
  ]
]
