import type { Rule } from '@unocss/core'

export const chatRules = [
  [
    /^q-chat-message$/,
    () => ({
      display: 'flex',
      'margin-bottom': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-chat-message--sent$/,
    () => ({
      'justify-content': 'flex-end'
    })
  ],
  [
    /^q-chat-message--received$/,
    () => ({
      'justify-content': 'flex-start'
    })
  ],
  [
    /^q-chat-message__text$/,
    () => ({
      'max-width': '70%',
      padding: 'var(--q-space-sm) var(--q-space-md)',
      'border-radius': 'var(--q-radius-md)',
      'background-color': 'var(--q-surface-container-high)'
    })
  ],
  [
    /^q-chat-message__name$/,
    () => ({
      'font-size': 'var(--q-caption-font-size)',
      opacity: 0.7,
      'margin-bottom': '2px'
    })
  ],
  [
    /^q-chat-message__stamp$/,
    () => ({
      'font-size': '0.7em',
      opacity: 0.6,
      'margin-top': '2px'
    })
  ],
  [
    /^q-chat-message__avatar$/,
    () => ({
      'margin-right': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-chat-message__label$/,
    () => ({
      // Label
    })
  ]
] as Rule[]
