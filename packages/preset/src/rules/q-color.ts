import type { Rule } from '@unocss/core'

export const qColorRules: Rule[] = [
  [
    /^q-color$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'max-width': '300px'
    })
  ],
  [
    /^q-color__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'margin-bottom': '8px'
    })
  ],
  [
    /^q-color__spectrum$/,
    () => ({
      position: 'relative',
      width: '100%',
      height: '200px',
      'border-radius': 'var(--q-radius-sm)',
      overflow: 'hidden'
    })
  ],
  [
    /^q-color__hue$/,
    () => ({
      width: '100%',
      height: '12px',
      'margin-top': '8px'
    })
  ],
  [
    /^q-color__footer$/,
    () => ({
      display: 'flex',
      'justify-content': 'flex-end',
      gap: '8px',
      'margin-top': '8px'
    })
  ]
]
