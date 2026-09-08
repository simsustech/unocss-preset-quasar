import type { Rule } from '@unocss/core'

export const qVideoRules: Rule[] = [
  [
    /^q-video$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ]
]
