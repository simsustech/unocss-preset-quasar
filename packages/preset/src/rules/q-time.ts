import type { Rule } from '@unocss/core'

export const qTimeRules: Rule[] = [
  [
    /^q-time$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'max-width': '300px',
      'background-color': 'var(--q-surface)',
      'border-radius': 'var(--q-radius-md)'
    })
  ],
  [
    /^q-time__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: '16px',
      'font-size': '2em'
    })
  ],
  [
    /^q-time__clock$/,
    () => ({
      position: 'relative',
      width: '200px',
      height: '200px',
      'border-radius': '50%',
      'background-color': 'var(--q-surface-container-highest)',
      margin: '16px auto'
    })
  ],
  [
    /^q-time__actions$/,
    () => ({
      display: 'flex',
      'justify-content': 'flex-end',
      gap: '8px',
      padding: '8px 16px'
    })
  ]
]
