import type { Rule } from '@unocss/core'

export const qEditorRules: Rule[] = [
  [
    /^q-editor$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      border: '1px solid var(--q-outline)',
      'border-radius': 'var(--q-radius-sm)'
    })
  ],
  [
    /^q-editor__toolbar$/,
    () => ({
      display: 'flex',
      'flex-wrap': 'wrap',
      gap: '4px',
      padding: '8px',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-editor__content$/,
    () => ({
      flex: '1',
      padding: '16px',
      'min-height': '100px',
      outline: 'none'
    })
  ]
]
