import type { Rule } from '@unocss/core'

export const inputRules = [
  [
    /^q-input$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-input__progress$/,
    () => ({
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0'
    })
  ]
] as Rule[]
