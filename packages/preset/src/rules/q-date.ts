import type { Rule } from '@unocss/core'

export const qDateRules: Rule[] = [
  [
    /^q-date$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'max-width': '300px',
      'background-color': 'var(--q-surface)',
      'border-radius': 'var(--q-radius-md)'
    })
  ],
  [
    /^q-date__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      padding: '8px 16px'
    })
  ],
  [
    /^q-date__calendar$/,
    () => ({
      display: 'grid',
      'grid-template-columns': 'repeat(7, 1fr)',
      gap: '2px',
      padding: '8px'
    })
  ],
  [
    /^q-date__day$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'aspect-ratio': '1',
      'border-radius': '50%',
      cursor: 'pointer'
    })
  ],
  [
    /^q-date__day--selected$/,
    () => ({
      'background-color': 'var(--q-primary)',
      color: 'var(--q-on-primary)'
    })
  ],
  [
    /^q-date__day--today$/,
    () => ({
      border: '1px solid var(--q-primary)'
    })
  ]
]
