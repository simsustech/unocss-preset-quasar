import type { Rule } from '@unocss/core'

export const qFieldRules: Rule[] = [
  [
    /^q-field$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      position: 'relative'
    })
  ],
  [
    /^q-field__control$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      position: 'relative',
      'border-radius': 'var(--q-radius-sm)',
      'background-color': 'var(--q-surface-container-highest)',
      'min-height': '40px'
    })
  ],
  [
    /^q-field__label$/,
    () => ({
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      transition: 'all var(--q-duration-short) var(--q-easing-standard)',
      'pointer-events': 'none'
    })
  ],
  [
    /^q-field__label--floating$/,
    () => ({
      top: '8px',
      transform: 'translateY(0)',
      'font-size': '0.75em'
    })
  ],
  [
    /^q-field__native$/,
    () => ({
      width: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '16px 12px 8px'
    })
  ],
  [
    /^q-field__bottom$/,
    () => ({
      display: 'flex',
      'justify-content': 'space-between',
      'min-height': '20px',
      padding: '4px 12px 0'
    })
  ],
  [
    /^q-field--filled$/,
    () => ({
      'background-color': 'var(--q-surface-container-highest)'
    })
  ],
  [
    /^q-field--outlined$/,
    () => ({
      'background-color': 'transparent',
      border: '1px solid var(--q-outline)'
    })
  ],
  [
    /^q-field--standard$/,
    () => ({
      'background-color': 'var(--q-surface-container-highest)'
    })
  ],
  [
    /^q-field--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-field--dense$/,
    () => ({
      'min-height': '32px'
    })
  ],
  [
    /^q-field--labeled$/,
    () => ({
      // Label is positioned absolutely, no extra styles needed
    })
  ],
  [
    /^q-field--float$/,
    () => ({
      // Floating label state handled by label variant
    })
  ],
  [
    /^q-field--focused$/,
    () => ({
      // Focus state handled by focus-helper
    })
  ],
  [
    /^q-field--error$/,
    () => ({
      color: 'var(--q-error)'
    })
  ],
  [
    /^q-field--disabled$/,
    () => ({
      opacity: '0.6',
      cursor: 'not-allowed'
    })
  ],
  [
    /^q-field--readonly$/,
    () => ({
      // Read-only state
    })
  ],
  [
    /^q-field--auto-height$/,
    () => ({
      'min-height': 'auto'
    })
  ],
  [
    /^q-field--item-aligned$/,
    () => ({
      'align-items': 'center'
    })
  ],
  [
    /^q-field--with-bottom$/,
    () => ({
      // Bottom section visible
    })
  ],
  [
    /^q-field--hide-bottom-space$/,
    () => ({
      // Bottom section hidden
    })
  ],
  [
    /^q-field--borderless$/,
    () => ({
      border: 'none'
    })
  ],
  [
    /^q-field--rounded$/,
    () => ({
      'border-radius': 'var(--q-radius-xl)'
    })
  ],
  [
    /^q-field--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-field--standout$/,
    () => ({
      'background-color': 'var(--q-surface-container-highest)'
    })
  ]
]
