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
      gap: 'var(--q-space-xs)',
      padding: 'var(--q-space-sm)',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-editor__toolbars$/,
    () => ({
      // Toolbars
    })
  ],
  [
    /^q-editor__content$/,
    () => ({
      flex: '1',
      padding: 'var(--q-space-md)',
      'min-height': '100px',
      outline: 'none'
    })
  ],
  [
    /^q-editor__btn$/,
    () => ({
      // Button
    })
  ],
  [
    /^q-editor__btn-group$/,
    () => ({
      display: 'flex',
      gap: 'var(--q-space-xs)'
    })
  ],
  [
    /^q-editor__btn--active$/,
    () => ({
      'background-color': 'var(--q-primary)',
      color: 'var(--q-on-primary)'
    })
  ],
  [
    /^q-editor__btn--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-editor__btn--readonly$/,
    () => ({
      // Readonly
    })
  ],
  [
    /^q-editor__btn--selected$/,
    () => ({
      // Selected
    })
  ],
  [
    /^q-editor__btn--unselected$/,
    () => ({
      // Unselected
    })
  ]
]
