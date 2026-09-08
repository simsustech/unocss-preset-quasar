import type { Rule } from '@unocss/core'

export const qBarRules: Rule[] = [
  [
    /^q-bar$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      padding: '0 12px',
      'min-height': '32px',
      'background-color': 'var(--q-surface-container)',
      color: 'var(--q-on-surface)',
      gap: '8px'
    })
  ],
  [
    /^q-bar--dense$/,
    () => ({
      'min-height': '24px',
      padding: '0 8px'
    })
  ],
  [
    /^q-bar--dark$/,
    () => ({
      'background-color': 'var(--q-surface-container-high)'
    })
  ]
]
