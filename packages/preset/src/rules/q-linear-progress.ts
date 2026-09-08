import type { Rule } from '@unocss/core'

export const qLinearProgressRules: Rule[] = [
  [
    /^q-linear-progress$/,
    () => ({
      position: 'relative',
      height: '4px',
      overflow: 'hidden',
      'border-radius': 'var(--q-radius-full)',
      'background-color': 'var(--q-surface-container-highest)'
    })
  ],
  [
    /^q-linear-progress__track$/,
    () => ({
      position: 'absolute',
      inset: '0',
      'background-color': 'var(--q-primary)'
    })
  ]
]
