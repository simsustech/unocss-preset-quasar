import type { Rule } from '@unocss/core'

export const qFooterRules: Rule[] = [
  [
    /^q-footer$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '0 var(--q-space-md)',
      'min-height': '50px',
      'background-color': 'var(--q-surface-container)'
    })
  ],
  [
    /^q-footer--bordered$/,
    () => ({
      borderTop: '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-footer--elevated$/,
    () => ({
      'box-shadow': 'var(--q-elevation-2)'
    })
  ],
  [
    /^q-footer--hidden$/,
    () => ({
      display: 'none'
    })
  ],
  [
    /^q-footer--reveal$/,
    () => ({
      // Reveal
    })
  ]
]
