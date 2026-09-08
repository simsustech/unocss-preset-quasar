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
      bottom: '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '4px'
    })
  ],
  [
    /^q-carousel__navigation-icon$/,
    () => ({
      width: '8px',
      height: '8px',
      'border-radius': '50%',
      'background-color': 'rgba(255,255,255,0.5)',
      cursor: 'pointer'
    })
  ]
]
