import type { Rule } from '@unocss/core'

export const qLayoutRules: Rule[] = [
  [
    /^q-layout$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'min-height': '100vh'
    })
  ],
  [
    /^q-layout--containerized$/,
    () => ({
      // Containerized
    })
  ],
  [
    /^q-layout--view$/,
    () => ({
      // View
    })
  ],
  [
    /^q-layout__section$/,
    () => ({
      display: 'flex',
      'flex-direction': 'row'
    })
  ],
  [
    /^q-layout__container$/,
    () => ({
      flex: '1',
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-layout__content$/,
    () => ({
      // Content
    })
  ]
]
