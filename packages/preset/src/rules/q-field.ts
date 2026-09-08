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
    /^q-field__error$/,
    () => ({
      color: 'var(--q-error)',
      'font-size': '0.75em'
    })
  ]
]
