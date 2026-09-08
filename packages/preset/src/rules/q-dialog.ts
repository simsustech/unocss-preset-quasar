import type { Rule } from '@unocss/core'

export const qDialogRules: Rule[] = [
  [
    /^q-dialog$/,
    () => ({
      position: 'fixed',
      inset: '0',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'z-index': '1000'
    })
  ],
  [
    /^q-dialog__backdrop$/,
    () => ({
      position: 'absolute',
      inset: '0',
      'background-color': 'rgba(0,0,0,0.5)'
    })
  ],
  [
    /^q-dialog__inner$/,
    () => ({
      position: 'relative',
      display: 'flex',
      'flex-direction': 'column',
      'max-width': '90vw',
      'max-height': '90vh',
      'border-radius': 'var(--q-radius-lg)',
      'background-color': 'var(--q-surface)',
      'box-shadow': 'var(--q-elevation-5)'
    })
  ],
  [
    /^q-dialog__inner--maximized$/,
    () => ({
      'max-width': '100vw',
      'max-height': '100vh',
      'border-radius': '0'
    })
  ]
]
