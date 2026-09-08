import type { Rule } from '@unocss/core'

export const qSkeletonRules: Rule[] = [
  [
    /^q-skeleton$/,
    () => ({
      background: 'var(--q-surface-container-highest)',
      'border-radius': 'var(--q-radius-sm)'
    })
  ],
  [
    /^q-skeleton--text$/,
    () => ({
      height: '1em',
      'border-radius': 'var(--q-radius-xs)'
    })
  ],
  [
    /^q-skeleton--rect$/,
    () => ({
      'border-radius': 'var(--q-radius-sm)'
    })
  ],
  [
    /^q-skeleton--bordered$/,
    () => ({
      border: '1px solid var(--q-outline-variant)'
    })
  ]
]
