import type { Rule } from '@unocss/core'

export const btnToggleRules = [
  [
    /^q-btn-toggle$/,
    () => ({
      display: 'inline-flex',
      'border-radius': 'var(--q-btn-radius)'
    })
  ]
] as Rule[]
