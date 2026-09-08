import type { Rule } from '@unocss/core'

export const qRadioRules: Rule[] = [
  [
    /^q-radio$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-radio__inner$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      width: '1em',
      height: '1em',
      border: '2px solid var(--q-outline)',
      'border-radius': '50%'
    })
  ],
  [
    /^q-radio__inner--truthy$/,
    () => ({
      'border-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-radio__label$/,
    () => ({
      'margin-left': '8px'
    })
  ],
  [
    /^q-radio--dense$/,
    () => ({
      'font-size': '0.8em'
    })
  ]
]
