import type { Rule } from '@unocss/core'

export const qMenuRules: Rule[] = [
  [
    /^q-menu$/,
    () => ({
      position: 'absolute',
      'z-index': '10000',
      'min-width': '100px',
      'background-color': 'var(--q-surface)',
      'border-radius': 'var(--q-radius-md)',
      'box-shadow': 'var(--q-elevation-3)',
      overflow: 'hidden'
    })
  ]
]
