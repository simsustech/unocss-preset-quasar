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
    /^q-timeline__entry$/,
    () => ({
      position: 'relative',
      'padding-bottom': '16px'
    })
  ],
  [
    /^q-timeline__dot$/,
    () => ({
      position: 'absolute',
      left: '-24px',
      top: '0',
      width: '12px',
      height: '12px',
      'border-radius': '50%',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-timeline__content$/,
    () => ({
      'padding-left': '12px'
    })
  ]
]
