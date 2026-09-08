import type { Rule } from '@unocss/core'

export const qFooterRules: Rule[] = [
  [
    /^q-footer$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '0 16px',
      'min-height': '50px',
      'background-color': 'var(--q-surface-container)'
    })
  ]
]
