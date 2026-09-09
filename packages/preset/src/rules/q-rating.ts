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
    /^q-rating--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-rating--editable$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  [
    /^q-rating--no-reset$/,
    () => ({
      // No reset
    })
  ],
  [
    /^q-rating__icon$/,
    () => ({
      'font-size': '1.5em',
      color: 'var(--q-surface-container-highest)',
      cursor: 'pointer',
      transition: 'color var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-rating__icon--active$/,
    () => ({
      color: '#f9a825'
    })
  ],
  [
    /^q-rating__icon--inactive$/,
    () => ({
      color: 'var(--q-surface-container-highest)'
    })
  ]
]
