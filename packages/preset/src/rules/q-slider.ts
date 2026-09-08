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
  ]
]
