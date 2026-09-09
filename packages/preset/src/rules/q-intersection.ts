import type { Rule } from '@unocss/core'

export const qIntersectionRules: Rule[] = [
  [
    /^q-intersection$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-intersection--once$/,
    () => ({
      // Once
    })
  ],
  [
    /^q-intersection--disable$/,
    () => ({
      // Disable
    })
  ]
]
