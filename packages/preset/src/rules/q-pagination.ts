import type { Rule } from '@unocss/core'

export const qPaginationRules: Rule[] = [
  [
    /^q-pagination$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      gap: '4px'
    })
  ],
  [
    /^q-pagination__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: '2px'
    })
  ],
  [
    /^q-pagination--disabled$/,
    () => ({
      opacity: '0.5',
      'pointer-events': 'none'
    })
  ]
]
