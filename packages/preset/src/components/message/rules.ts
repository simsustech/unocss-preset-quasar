import type { Rule } from '@unocss/core'

export const messageRules: Rule[] = [
  [
    /^q-message$/,
    () => ({
      position: 'relative',
      'margin-bottom': '8px'
    })
  ],
  [
    /^q-message__name$/,
    () => ({
      'font-weight': '500',
      'font-size': '14px'
    })
  ],
  [
    /^q-message__label$/,
    () => ({
      'font-size': '12px',
      opacity: 0.7
    })
  ],
  [
    /^q-message__stamp$/,
    () => ({
      'font-size': '11px',
      opacity: 0.6
    })
  ],
  [
    /^q-message__text$/,
    () => ({
      'line-height': '1.4',
      'word-break': 'break-word'
    })
  ],
  [
    /^q-message__text--sent$/,
    () => ({
      'background-color': 'var(--q-primary)',
      color: 'var(--q-on-primary)',
      'border-radius': 'var(--q-radius-md)',
      padding: '8px 12px'
    })
  ],
  [
    /^q-message__text--received$/,
    () => ({
      'background-color': 'var(--q-surface-container-high)',
      'border-radius': 'var(--q-radius-md)',
      padding: '8px 12px'
    })
  ]
]
