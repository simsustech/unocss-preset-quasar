import type { Rule } from '@unocss/core'

export const qChipRules: Rule[] = [
  [
    /^q-chip$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'border-radius': 'var(--q-radius-full)',
      'background-color': 'var(--q-surface-container-high)',
      color: 'var(--q-on-surface)',
      'font-size': '13px',
      'line-height': 1.2,
      padding: '6px 12px',
      'min-height': '32px',
      gap: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-chip--square$/,
    () => ({
      'border-radius': 'var(--q-radius-sm)'
    })
  ],
  [
    /^q-chip--dense$/,
    () => ({
      'min-height': '24px',
      padding: '2px 8px'
    })
  ],
  [
    /^q-chip--selected$/,
    () => ({
      'background-color': 'var(--q-primary)',
      color: 'var(--q-on-primary)'
    })
  ],
  [
    /^q-chip--removable$/,
    () => ({
      'padding-right': '4px'
    })
  ],
  [
    /^q-chip--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-chip--outline$/,
    () => ({
      'background-color': 'transparent',
      border: '1px solid var(--q-outline)'
    })
  ],
  [
    /^q-chip--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-chip__icon$/,
    () => ({
      'font-size': '1.2em'
    })
  ],
  [
    /^q-chip__close$/,
    () => ({
      cursor: 'pointer',
      'font-size': '1.2em',
      opacity: 0.7,
      transition: 'opacity var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-chip__content$/,
    () => ({
      'white-space': 'nowrap'
    })
  ],
  [
    /^q-chip__label$/,
    () => ({
      // Label
    })
  ]
]
