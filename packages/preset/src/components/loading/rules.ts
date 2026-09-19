import type { Rule } from '@unocss/core'

export const loadingRules: Rule[] = [
  [
    /^q-loading$/,
    () => ({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'rgba(0, 0, 0, 0.7)',
      color: 'var(--q-on-primary)',
      'z-index': 9500
    })
  ]
]
