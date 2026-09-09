import type { Rule } from '@unocss/core'

export const qPopupEditRules: Rule[] = [
  [
    /^q-popup-edit$/,
    () => ({
      position: 'absolute',
      'z-index': 9500,
      'background-color': 'var(--q-surface)',
      'border-radius': 'var(--q-radius-md)',
      'box-shadow': 'var(--q-elevation-3)',
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-popup-edit__buttons$/,
    () => ({
      display: 'flex',
      'justify-content': 'flex-end',
      gap: 'var(--q-space-sm)',
      'margin-top': 'var(--q-space-md)'
    })
  ],
  [
    /^q-popup-edit__content$/,
    () => ({
      // Content
    })
  ]
]
