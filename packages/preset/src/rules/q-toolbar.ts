import type { Rule } from '@unocss/core'

export const qToolbarRules: Rule[] = [
  [
    /^q-toolbar$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '0 16px',
      'min-height': '50px'
    })
  ],
  [
    /^q-toolbar__title$/,
    () => ({
      flex: '1',
      'font-size': '1.25em',
      'font-weight': '500'
    })
  ]
]
