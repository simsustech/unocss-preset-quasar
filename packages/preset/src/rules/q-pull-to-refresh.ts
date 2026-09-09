import type { Rule } from '@unocss/core'

export const qPullToRefreshRules: Rule[] = [
  [
    /^q-pull-to-refresh$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ],
  [
    /^q-pull-to-refresh__content$/,
    () => ({
      transition: 'transform var(--q-duration-medium) var(--q-easing-standard)'
    })
  ],
  [
    /^q-pull-to-refresh__pointer$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-pull-to-refresh__icon$/,
    () => ({
      // Icon
    })
  ],
  [
    /^q-pull-to-refresh__message$/,
    () => ({
      // Message
    })
  ]
]
