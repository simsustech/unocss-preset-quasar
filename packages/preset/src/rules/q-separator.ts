import type { Rule } from '@unocss/core'

export const qSeparatorRules: Rule[] = [
  [
    /^q-separator$/,
    () => ({
      'background-color': 'var(--q-outline-variant)',
      border: 'none'
    })
  ],
  [
    /^q-separator--horizontal$/,
    () => ({
      height: '1px',
      margin: '8px 0'
    })
  ],
  [
    /^q-separator--vertical$/,
    () => ({
      width: '1px',
      margin: '0 8px'
    })
  ]
]
