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
      'border-radius': '50%',
      transition: 'all var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-radio__inner--truthy$/,
    () => ({
      'border-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-radio__inner--falsy$/,
    () => ({
      // Falsy state
    })
  ],
  [
    /^q-radio__label$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-radio--dense$/,
    () => ({
      'font-size': '0.8em'
    })
  ],
  [
    /^q-radio--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-radio__bg$/,
    () => ({
      // Background
    })
  ],
  [
    /^q-radio__native$/,
    () => ({
      // Native input
    })
  ],
  [
    /^q-radio__icon$/,
    () => ({
      'font-size': '0.6em',
      color: 'var(--q-on-primary)'
    })
  ]
]
