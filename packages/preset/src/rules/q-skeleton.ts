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
    /^q-skeleton--dark$/,
    () => ({
      background: 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-skeleton--anim$/,
    () => ({
      animation: 'q-skeleton-blink 1.5s infinite'
    })
  ],
  [
    /^q-skeleton--bordered$/,
    () => ({
      border: '1px solid var(--q-outline-variant)'
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
    /^q-skeleton--circle$/,
    () => ({
      'border-radius': '50%'
    })
  ],
  [
    /^q-skeleton--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-skeleton--type$/,
    () => ({
      // Type
    })
  ]
]
