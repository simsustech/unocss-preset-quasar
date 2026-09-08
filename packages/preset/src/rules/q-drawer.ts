import type { Rule } from '@unocss/core'

export const qDrawerRules: Rule[] = [
  [
    /^q-drawer$/,
    () => ({
      position: 'fixed',
      top: '0',
      bottom: '0',
      width: '300px',
      'background-color': 'var(--q-surface)',
      'box-shadow': 'var(--q-elevation-3)',
      'z-index': '1000'
    })
  ],
  [
    /^q-drawer--left$/,
    () => ({
      left: '0'
    })
  ],
  [
    /^q-drawer--right$/,
    () => ({
      right: '0'
    })
  ],
  [
    /^q-drawer__content$/,
    () => ({
      height: '100%',
      'overflow-y': 'auto'
    })
  ]
]
