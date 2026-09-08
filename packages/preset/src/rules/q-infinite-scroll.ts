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
      padding: '16px'
    })
  ]
]
