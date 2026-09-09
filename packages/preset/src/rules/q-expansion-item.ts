import type { Rule } from '@unocss/core'

export const qExpansionItemRules: Rule[] = [
  [
    /^q-expansion-item$/,
    () => ({
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-expansion-item--expanded$/,
    () => ({
      'background-color': 'var(--q-surface-container-high)'
    })
  ],
  [
    /^q-expansion-item--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-expansion-item--header$/,
    () => ({
      // Header
    })
  ],
  [
    /^q-expansion-item--popup$/,
    () => ({
      // Popup
    })
  ],
  [
    /^q-expansion-item--standard$/,
    () => ({
      // Standard
    })
  ],
  [
    /^q-expansion-item__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: 'var(--q-space-md)',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-expansion-item__container$/,
    () => ({
      // Container
    })
  ],
  [
    /^q-expansion-item__content$/,
    () => ({
      padding: '0 var(--q-space-md) var(--q-space-md)'
    })
  ],
  [
    /^q-expansion-item__toggle-icon$/,
    () => ({
      'margin-left': 'auto',
      transition: 'transform var(--q-duration-short) var(--q-easing-standard)'
    })
  ]
]
