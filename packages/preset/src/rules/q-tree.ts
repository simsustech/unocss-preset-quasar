import type { Rule } from '@unocss/core'

export const qTreeRules: Rule[] = [
  [
    /^q-tree$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-tree__node$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: '4px',
      padding: '2px 0'
    })
  ],
  [
    /^q-tree__node-header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: '4px',
      cursor: 'pointer'
    })
  ],
  [
    /^q-tree__arrow$/,
    () => ({
      width: '1em',
      height: '1em',
      transition: 'transform var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-tree__children$/,
    () => ({
      'padding-left': '16px'
    })
  ]
]
