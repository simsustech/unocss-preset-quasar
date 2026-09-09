import type { Rule } from '@unocss/core'

export const qHeaderRules: Rule[] = [
  [
    /^q-header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '0 var(--q-space-md)',
      'min-height': '50px',
      'background-color': 'var(--q-surface-container)'
    })
  ],
  [
    /^q-header--bordered$/,
    () => ({
      borderBottom: '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-header--elevated$/,
    () => ({
      'box-shadow': 'var(--q-elevation-2)'
    })
  ],
  [
    /^q-header--hidden$/,
    () => ({
      display: 'none'
    })
  ],
  [
    /^q-header--reveal$/,
    () => ({
      // Reveal
    })
  ]
]
