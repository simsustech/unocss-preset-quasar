import type { Rule } from '@unocss/core'

export const qRatingRules: Rule[] = [
  [
    /^q-rating$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center'
    })
  ],
  [
    /^q-rating__icon$/,
    () => ({
      'font-size': '1.5em',
      color: 'var(--q-surface-container-highest)',
      cursor: 'pointer'
    })
  ],
  [
    /^q-rating__icon--active$/,
    () => ({
      color: '#f9a825'
    })
  ]
]
