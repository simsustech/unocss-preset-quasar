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
    /^q-tree--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-tree--dense$/,
    () => ({
      // Dense variant
    })
  ],
  [
    /^q-tree__node$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-xs)',
      padding: '2px 0'
    })
  ],
  [
    /^q-tree__node--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-tree__node--link$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  [
    /^q-tree__node--parent$/,
    () => ({
      // Parent node
    })
  ],
  [
    /^q-tree__node--child$/,
    () => ({
      // Child node
    })
  ],
  [
    /^q-tree__node--selected$/,
    () => ({
      'background-color': 'var(--q-primary-container)'
    })
  ],
  [
    /^q-tree__node-header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-xs)',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-tree__node-header--selected$/,
    () => ({
      'background-color': 'var(--q-primary-container)'
    })
  ],
  [
    /^q-tree__node-header--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-tree__node-header--link$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  [
    /^q-tree__node-header--toggle$/,
    () => ({
      // Toggle state
    })
  ],
  [
    /^q-tree__node-body$/,
    () => ({
      // Node body
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
      'padding-left': 'var(--q-space-md)'
    })
  ]
]
