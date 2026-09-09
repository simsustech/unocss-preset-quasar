import type { Rule } from '@unocss/core'

export const qSliderRules: Rule[] = [
  [
    /^q-slider$/,
    () => ({
      position: 'relative',
      height: '1.5em',
      cursor: 'pointer'
    })
  ],
  [
    /^q-slider--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-slider--dense$/,
    () => ({
      // Dense variant
    })
  ],
  [
    /^q-slider__track$/,
    () => ({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
      height: '4px',
      'background-color': 'var(--q-surface-container-highest)',
      'border-radius': 'var(--q-radius-full)'
    })
  ],
  [
    /^q-slider__track-container$/,
    () => ({
      position: 'relative',
      height: '100%'
    })
  ],
  [
    /^q-slider__selection$/,
    () => ({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '4px',
      'background-color': 'var(--q-primary)',
      'border-radius': 'var(--q-radius-full)'
    })
  ],
  [
    /^q-slider__handle$/,
    () => ({
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1.2em',
      height: '1.2em',
      'border-radius': '50%',
      'background-color': 'var(--q-primary)',
      border: '2px solid var(--q-surface)',
      cursor: 'grab'
    })
  ],
  [
    /^q-slider__handle-container$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-slider__hint$/,
    () => ({
      position: 'absolute',
      top: '-1.5em',
      'font-size': '0.75em',
      'white-space': 'nowrap'
    })
  ],
  [
    /^q-slider__hint-value$/,
    () => ({
      // Hint value
    })
  ],
  [
    /^q-slider__inner$/,
    () => ({
      // Inner
    })
  ],
  [
    /^q-slider__inner--active$/,
    () => ({
      // Active state
    })
  ],
  [
    /^q-slider__inner--inactive$/,
    () => ({
      // Inactive state
    })
  ],
  [
    /^q-slider__marker-label-container$/,
    () => ({
      position: 'relative',
      height: '1em'
    })
  ],
  [
    /^q-slider__marker-labels$/,
    () => ({
      display: 'flex',
      'justify-content': 'space-between'
    })
  ],
  [
    /^q-slider__active$/,
    () => ({
      // Active
    })
  ]
]
