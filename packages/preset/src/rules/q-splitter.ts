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
