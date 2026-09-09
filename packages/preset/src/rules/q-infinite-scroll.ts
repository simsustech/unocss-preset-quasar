import type { Rule } from '@unocss/core'

export const qInfiniteScrollRules: Rule[] = [
  [
    /^q-infinite-scroll$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-infinite-scroll__loading$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-infinite-scroll__message$/,
    () => ({
      'text-align': 'center',
      padding: 'var(--q-space-sm)',
      color: 'var(--q-on-surface-variant)'
    })
  ]
]
