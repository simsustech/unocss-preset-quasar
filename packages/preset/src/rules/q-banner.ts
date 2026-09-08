import type { Rule } from '@unocss/core'

export const qBannerRules: Rule[] = [
  [
    /^q-banner$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '8px 16px',
      'min-height': '54px',
      'background-color': 'var(--q-surface-container-high)',
      color: 'var(--q-on-surface)'
    })
  ],
  [
    /^q-banner__icon$/,
    () => ({
      'font-size': '1.5em',
      'margin-right': '16px',
      'flex-shrink': '0'
    })
  ],
  [
    /^q-banner__content$/,
    () => ({
      flex: '1',
      'min-width': '0'
    })
  ],
  [
    /^q-banner__actions$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: '4px',
      'margin-left': '8px'
    })
  ],
  [
    /^q-banner--dense$/,
    () => ({
      'min-height': '36px',
      padding: '4px 8px'
    })
  ]
]
