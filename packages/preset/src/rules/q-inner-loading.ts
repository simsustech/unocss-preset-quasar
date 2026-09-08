import type { Rule } from '@unocss/core'

export const qInnerLoadingRules: Rule[] = [
  [
    /^q-inner-loading$/,
    () => ({
      position: 'absolute',
      inset: '0',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'rgba(255,255,255,0.7)',
      'z-index': '1'
    })
  ],
  [
    /^q-inner-loading__label$/,
    () => ({
      'margin-left': '8px'
    })
  ]
]
