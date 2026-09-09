import type { Rule } from '@unocss/core'

export const qIconRules: Rule[] = [
  [
    /^q-icon$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      width: '1em',
      height: '1em',
      'font-size': 'var(--q-size-icon)',
      'line-height': 1,
      'flex-shrink': 0
    })
  ],
  [
    /^q-icon--left$/,
    () => ({
      'margin-right': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-icon--right$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-icon:before$/,
    () => ({
      // Pseudo-element
    })
  ],
  [
    /^q-icon:after$/,
    () => ({
      // Pseudo-element
    })
  ]
]
