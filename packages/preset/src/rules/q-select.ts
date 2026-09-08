import type { Rule } from '@unocss/core'

export const qSelectRules: Rule[] = [
  [
    /^q-select$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      cursor: 'pointer'
    })
  ],
  [
    /^q-select__dropdown-icon$/,
    () => ({
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      transition: 'transform var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-select__mirror$/,
    () => ({
      visibility: 'hidden',
      'white-space': 'pre',
      'pointer-events': 'none'
    })
  ],
  [
    /^q-select__selection$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'flex-wrap': 'wrap',
      gap: 'var(--q-space-xs)'
    })
  ],
  [
    /^q-select__placeholder$/,
    () => ({
      color: 'var(--q-on-surface-variant)',
      opacity: 0.6
    })
  ]
]
