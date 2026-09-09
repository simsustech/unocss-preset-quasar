import type { Rule } from '@unocss/core'

export const qToggleRules: Rule[] = [
  [
    /^q-toggle$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-toggle__track$/,
    () => ({
      position: 'relative',
      width: '2.4em',
      height: '1.2em',
      'border-radius': 'var(--q-radius-full)',
      'background-color': 'var(--q-surface-container-highest)',
      transition:
        'background-color var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-toggle__inner$/,
    () => ({
      position: 'absolute',
      top: '50%',
      left: '0.1em',
      transform: 'translateY(-50%)',
      width: '1em',
      height: '1em',
      'border-radius': '50%',
      'background-color': 'var(--q-on-surface)',
      transition: 'left var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-toggle__inner--truthy$/,
    () => ({
      left: 'calc(100% - 1.1em)',
      'background-color': 'var(--q-on-primary)'
    })
  ],
  [
    /^q-toggle__inner--falsy$/,
    () => ({
      // Falsy state
    })
  ],
  [
    /^q-toggle__label$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-toggle--dense$/,
    () => ({
      'font-size': '0.8em'
    })
  ],
  [
    /^q-toggle--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-toggle__native$/,
    () => ({
      // Native input
    })
  ]
]
