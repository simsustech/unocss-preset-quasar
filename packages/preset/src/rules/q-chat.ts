import type { Rule } from '@unocss/core'

export const qChatRules: Rule[] = [
  [
    /^q-chat-message$/,
    () => ({
      display: 'flex',
      'margin-bottom': '8px'
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
      padding: '8px 12px',
      'border-radius': 'var(--q-radius-md)',
      'background-color': 'var(--q-surface-container-high)'
    })
  ],
  [
    /^q-chat-message__name$/,
    () => ({
      'font-size': '0.75em',
      opacity: '0.7',
      'margin-bottom': '2px'
    })
  ],
  [
    /^q-chat-message__stamp$/,
    () => ({
      'font-size': '0.7em',
      opacity: '0.6',
      'margin-top': '2px'
    })
  ]
]
