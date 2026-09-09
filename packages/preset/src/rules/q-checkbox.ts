import type { Rule } from '@unocss/core'

export const qCheckboxRules: Rule[] = [
  [
    /^q-checkbox$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-checkbox__inner$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      width: '1em',
      height: '1em',
      border: '2px solid var(--q-outline)',
      'border-radius': 'var(--q-radius-xs)',
      transition: 'all var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-checkbox__inner--truthy$/,
    () => ({
      'border-color': 'var(--q-primary)',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-checkbox__inner--indet$/,
    () => ({
      'border-color': 'var(--q-primary)',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-checkbox__icon$/,
    () => ({
      color: 'var(--q-on-primary)',
      'font-size': '0.7em'
    })
  ],
  [
    /^q-checkbox__label$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-checkbox--dense$/,
    () => ({
      'font-size': '0.8em'
    })
  ],
  [
    /^q-checkbox--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-checkbox__bg$/,
    () => ({
      // Background
    })
  ],
  [
    /^q-checkbox__icon-container$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center'
    })
  ],
  [
    /^q-checkbox__native$/,
    () => ({
      // Native input
    })
  ],
  [
    /^q-checkbox__svg$/,
    () => ({
      width: '1em',
      height: '1em'
    })
  ],
  [
    /^q-checkbox__truthy$/,
    () => ({
      // Truthy state
    })
  ]
]
