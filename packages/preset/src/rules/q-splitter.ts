import type { Rule } from '@unocss/core'

export const qSplitterRules: Rule[] = [
  [
    /^q-splitter$/,
    () => ({
      display: 'flex',
      width: '100%',
      height: '100%'
    })
  ],
  [
    /^q-splitter--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-splitter--horizontal$/,
    () => ({
      'flex-direction': 'row'
    })
  ],
  [
    /^q-splitter--vertical$/,
    () => ({
      'flex-direction': 'column'
    })
  ],
  [
    /^q-splitter--limits$/,
    () => ({
      // Limits
    })
  ],
  [
    /^q-splitter__before$/,
    () => ({
      overflow: 'auto'
    })
  ],
  [
    /^q-splitter__after$/,
    () => ({
      overflow: 'auto'
    })
  ],
  [
    /^q-splitter__panel$/,
    () => ({
      overflow: 'auto'
    })
  ],
  [
    /^q-splitter__separator$/,
    () => ({
      'background-color': 'var(--q-outline-variant)',
      cursor: 'col-resize'
    })
  ]
]
