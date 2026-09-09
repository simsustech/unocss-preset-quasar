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
    /^q-scroll-area--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-scroll-area--visible$/,
    () => ({
      // Always visible
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
    /^q-scroll-area__content$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-scroll-area__bar$/,
    () => ({
      position: 'absolute',
      'background-color': 'var(--q-surface-container-highest)',
      'border-radius': 'var(--q-radius-full)',
      opacity: 0.6,
      transition: 'opacity var(--q-duration-short) var(--q-easing-standard)'
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
      'border-radius': 'var(--q-radius-full)',
      cursor: 'grab'
    })
  ],
  [
    /^q-scroll-area__thumb--h$/,
    () => ({
      height: '100%'
    })
  ],
  [
    /^q-scroll-area__thumb--v$/,
    () => ({
      width: '100%'
    })
  ]
]
