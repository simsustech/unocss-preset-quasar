import type { Rule } from '@unocss/core'

export const qScrollAreaRules: Rule[] = [
  [
    /^q-scroll-area$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ],
  [
    /^q-scroll-area__container$/,
    () => ({
      width: '100%',
      height: '100%',
      overflow: 'auto'
    })
  ],
  [
    /^q-scroll-area__bar$/,
    () => ({
      position: 'absolute',
      'background-color': 'var(--q-surface-container-highest)',
      'border-radius': 'var(--q-radius-full)',
      opacity: '0.6'
    })
  ],
  [
    /^q-scroll-area__bar--h$/,
    () => ({
      height: '6px',
      bottom: '2px',
      left: '2px',
      right: '2px'
    })
  ],
  [
    /^q-scroll-area__bar--v$/,
    () => ({
      width: '6px',
      right: '2px',
      top: '2px',
      bottom: '2px'
    })
  ],
  [
    /^q-scroll-area__thumb$/,
    () => ({
      'background-color': 'var(--q-on-surface-variant)',
      'border-radius': 'var(--q-radius-full)'
    })
  ]
]
