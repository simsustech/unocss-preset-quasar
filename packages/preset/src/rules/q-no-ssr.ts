import type { Rule } from '@unocss/core'

export const qNoSsrRules: Rule[] = [
  [
    /^q-no-ssr$/,
    () => ({
      display: 'inline'
    })
  ]
]
