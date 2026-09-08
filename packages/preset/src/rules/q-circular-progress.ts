import type { Rule } from '@unocss/core'

export const qCircularProgressRules: Rule[] = [
  [
    /^q-circular-progress$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      position: 'relative'
    })
  ],
  [
    /^q-circular-progress__circle$/,
    () => ({
      fill: 'none',
      stroke: 'var(--q-primary)',
      'stroke-linecap': 'round'
    })
  ],
  [
    /^q-circular-progress__text$/,
    () => ({
      position: 'absolute',
      'font-size': '0.25em',
      'text-align': 'center'
    })
  ]
]
