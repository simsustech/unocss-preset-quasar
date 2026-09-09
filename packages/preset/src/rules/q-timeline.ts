import type { Rule } from '@unocss/core'

export const qTimelineRules: Rule[] = [
  [
    /^q-timeline$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'padding-left': '24px'
    })
  ],
  [
    /^q-timeline--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-timeline--dense$/,
    () => ({
      // Dense
    })
  ],
  [
    /^q-timeline--responsive$/,
    () => ({
      // Responsive
    })
  ],
  [
    /^q-timeline--reverse$/,
    () => ({
      // Reverse
    })
  ],
  [
    /^q-timeline__entry$/,
    () => ({
      position: 'relative',
      'padding-bottom': 'var(--q-space-md)'
    })
  ],
  [
    /^q-timeline__heading$/,
    () => ({
      // Heading
    })
  ],
  [
    /^q-timeline__dot$/,
    () => ({
      position: 'absolute',
      left: '-24px',
      top: 0,
      width: '12px',
      height: '12px',
      'border-radius': '50%',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-timeline__content$/,
    () => ({
      'padding-left': 'var(--q-space-md)'
    })
  ],
  [
    /^q-timeline__subtitle$/,
    () => ({
      'font-size': '0.75em',
      color: 'var(--q-on-surface-variant)'
    })
  ]
]
