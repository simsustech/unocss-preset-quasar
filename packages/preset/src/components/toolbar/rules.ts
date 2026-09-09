import type { Rule } from '@unocss/core'

export const toolbarRules = [
  [
    /^q-toolbar$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '0 var(--q-space-md)',
      'min-height': 'var(--q-toolbar-min-height)'
    })
  ],
  [
    /^q-toolbar--inset$/,
    () => ({
      padding: '0 calc(var(--q-space-md) + 56px)'
    })
  ],
  [
    /^q-toolbar__title$/,
    () => ({
      flex: '1',
      'font-size': 'var(--q-toolbar-font-size)',
      'font-weight': 'var(--q-badge-font-weight)'
    })
  ],
  [
    /^q-toolbar--inset$/,
    () => ({
      padding: '0 calc(var(--q-space-md) + 56px)'
    })
  ],
  [
    /^q-toolbar__title$/,
    () => ({
      flex: '1',
      'font-size': '1.25em',
      'font-weight': 500,
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    })
  ]
] as Rule[]
