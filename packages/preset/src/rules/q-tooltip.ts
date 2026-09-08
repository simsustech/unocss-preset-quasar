import type { Rule } from '@unocss/core'

export const qTooltipRules: Rule[] = [
  [
    /^q-tooltip$/,
    () => ({
      position: 'absolute',
      'z-index': '10000',
      'pointer-events': 'none',
      'max-width': '300px',
      padding: '8px 12px',
      'border-radius': 'var(--q-radius-sm)',
      'background-color': 'var(--q-inverse-surface)',
      color: 'var(--q-inverse-on-surface)',
      'font-size': '0.85em',
      'box-shadow': 'var(--q-elevation-2)'
    })
  ]
]
