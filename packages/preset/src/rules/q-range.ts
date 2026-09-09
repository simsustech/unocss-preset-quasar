import type { Rule } from '@unocss/core'

export const qRangeRules: Rule[] = [
  [
    /^q-range$/,
    () => ({
      position: 'relative',
      height: '1.5em',
      cursor: 'pointer'
    })
  ],
  [
    /^q-range--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-range--dense$/,
    () => ({
      // Dense variant
    })
  ],
  [
    /^q-range__track$/,
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
    /^q-range__track-container$/,
    () => ({
      position: 'relative',
      height: '100%'
    })
  ],
  [
    /^q-range__selection$/,
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
    /^q-range__handle$/,
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
    /^q-range__handle-container$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-range__hint$/,
    () => ({
      position: 'absolute',
      top: '-1.5em',
      'font-size': '0.75em',
      'white-space': 'nowrap'
    })
  ],
  [
    /^q-range__hint-value$/,
    () => ({
      // Hint value
    })
  ],
  [
    /^q-range__inner$/,
    () => ({
      // Inner
    })
  ],
  [
    /^q-range__inner--active$/,
    () => ({
      // Active state
    })
  ],
  [
    /^q-range__inner--inactive$/,
    () => ({
      // Inactive state
    })
  ],
  [
    /^q-range__marker-label-container$/,
    () => ({
      position: 'relative',
      height: '1em'
    })
  ],
  [
    /^q-range__marker-labels$/,
    () => ({
      display: 'flex',
      'justify-content': 'space-between'
    })
  ],
  [
    /^q-range__active$/,
    () => ({
      // Active
    })
  ]
]
