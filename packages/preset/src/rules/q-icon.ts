import type { Rule } from '@unocss/core'

export const qIconRules: Rule[] = [
  [
    /^q-icon$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      width: '1em',
      height: '1em',
      'font-size': 'var(--q-size-icon)',
      'line-height': '1',
      'flex-shrink': '0'
    })
  ]
]
