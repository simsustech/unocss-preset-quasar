import type { Rule } from '@unocss/core'

export const qBannerRules: Rule[] = [
  [
    /^q-banner$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: 'var(--q-space-sm) var(--q-space-md)',
      'min-height': '54px',
      'background-color': 'var(--q-surface-container-high)',
      color: 'var(--q-on-surface)'
    })
  ],
  [
    /^q-banner--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-banner--dense$/,
    () => ({
      'min-height': '36px',
      padding: 'var(--q-space-xs) var(--q-space-sm)'
    })
  ],
  [
    /^q-banner__icon$/,
    () => ({
      'font-size': '1.5em',
      'margin-right': 'var(--q-space-md)',
      'flex-shrink': 0
    })
  ],
  [
    /^q-banner__content$/,
    () => ({
      flex: '1',
      'min-width': 0
    })
  ],
  [
    /^q-banner__actions$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-xs)',
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-banner__avatar$/,
    () => ({
      'margin-right': 'var(--q-space-md)'
    })
  ]
]
