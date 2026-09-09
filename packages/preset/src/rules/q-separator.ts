import type { Rule } from '@unocss/core'

export const qSeparatorRules: Rule[] = [
  [
    /^q-separator$/,
    () => ({
      'background-color': 'var(--q-outline-variant)',
      border: 'none'
    })
  ],
  [
    /^q-separator--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-separator--horizontal$/,
    () => ({
      height: '1px',
      margin: 'var(--q-space-sm) 0'
    })
  ],
  [
    /^q-separator--vertical$/,
    () => ({
      width: '1px',
      margin: '0 var(--q-space-sm)'
    })
  ],
  [
    /^q-separator--inset$/,
    () => ({
      // Inset
    })
  ],
  [
    /^q-separator--spaced$/,
    () => ({
      margin: 'var(--q-space-md) 0'
    })
  ]
]
