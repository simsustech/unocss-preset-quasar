import type { Rule } from '@unocss/core'

export const qPopupEditRules: Rule[] = [
  [
    /^q-popup-edit$/,
    () => ({
      position: 'absolute',
      'z-index': '10000',
      'background-color': 'var(--q-surface)',
      'border-radius': 'var(--q-radius-md)',
      'box-shadow': 'var(--q-elevation-3)',
      padding: '16px'
    })
  ]
]
