import type { Rule } from '@unocss/core'

export const qCardRules: Rule[] = [
  [
    /^q-card$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'border-radius': 'var(--q-radius-md)',
      'background-color': 'var(--q-surface)',
      'box-shadow': 'var(--q-elevation-1)'
    })
  ],
  [
    /^q-card--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-card__section$/,
    () => ({
      padding: '16px'
    })
  ],
  [
    /^q-card__section--vertical$/,
    () => ({
      padding: '8px 16px'
    })
  ],
  [
    /^q-card__actions$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: '8px',
      padding: '8px 16px'
    })
  ]
]
