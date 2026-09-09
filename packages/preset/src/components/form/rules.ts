import type { Rule } from '@unocss/core'

export const formRules = [
  [
    /^q-form$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ]
] as Rule[]
