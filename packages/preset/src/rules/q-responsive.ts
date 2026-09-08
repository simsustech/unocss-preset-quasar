import type { Rule } from '@unocss/core'

export const qResponsiveRules: Rule[] = [
  [
    /^q-responsive$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ]
]
