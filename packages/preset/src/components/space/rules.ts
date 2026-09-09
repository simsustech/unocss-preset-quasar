import type { Rule } from '@unocss/core'

export const spaceRules = [
  [
    /^q-space$/,
    () => ({
      flex: '1'
    })
  ]
] as Rule[]
