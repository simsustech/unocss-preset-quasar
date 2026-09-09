import type { Rule } from '@unocss/core'

export const qCarouselRules: Rule[] = [
  [
    /^q-carousel$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ],
  [
    /^q-carousel--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-carousel--arrows$/,
    () => ({
      // Show arrows
    })
  ],
  [
    /^q-carousel--navigation$/,
    () => ({
      // Show navigation
    })
  ],
  [
    /^q-carousel--padding$/,
    () => ({
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-carousel--vertical$/,
    () => ({
      // Vertical layout
    })
  ],
  [
    /^q-carousel--fullscreen$/,
    () => ({
      position: 'fixed',
      inset: 0,
      zIndex: 6000
    })
  ],
  [
    /^q-carousel__slide$/,
    () => ({
      'min-height': '100%',
      'background-size': 'cover',
      'background-position': 'center'
    })
  ],
  [
    /^q-carousel__navigation$/,
    () => ({
      position: 'absolute',
      bottom: 'var(--q-space-sm)',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 'var(--q-space-xs)'
    })
  ],
  [
    /^q-carousel__navigation-icon$/,
    () => ({
      width: '8px',
      height: '8px',
      'border-radius': '50%',
      'background-color': 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      transition:
        'background-color var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-carousel__navigation-icon--active$/,
    () => ({
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-carousel__next$/,
    () => ({
      position: 'absolute',
      right: 'var(--q-space-sm)',
      top: '50%',
      transform: 'translateY(-50%)'
    })
  ],
  [
    /^q-carousel__prev$/,
    () => ({
      position: 'absolute',
      left: 'var(--q-space-sm)',
      top: '50%',
      transform: 'translateY(-50%)'
    })
  ],
  [
    /^q-carousel__control$/,
    () => ({
      // Control
    })
  ]
]
