import type { Rule } from '@unocss/core'

export const intersectionRules = [
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
] as Rule[]
