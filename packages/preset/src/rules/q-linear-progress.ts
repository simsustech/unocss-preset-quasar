import type { Rule } from '@unocss/core'

export const qLinearProgressRules: Rule[] = [
  [
    /^q-linear-progress$/,
    () => ({
      position: 'relative',
      height: '4px',
      overflow: 'hidden',
      'border-radius': 'var(--q-radius-full)',
      'background-color': 'var(--q-surface-container-highest)'
    })
  ],
  [
    /^q-linear-progress--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-linear-progress--reverse$/,
    () => ({
      // Reverse
    })
  ],
  [
    /^q-linear-progress--rounded$/,
    () => ({
      // Rounded
    })
  ],
  [
    /^q-linear-progress--stripe$/,
    () => ({
      // Stripe
    })
  ],
  [
    /^q-linear-progress--striped$/,
    () => ({
      // Striped
    })
  ],
  [
    /^q-linear-progress__track$/,
    () => ({
      position: 'absolute',
      inset: '0',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-linear-progress__model$/,
    () => ({
      // Model
    })
  ]
]
