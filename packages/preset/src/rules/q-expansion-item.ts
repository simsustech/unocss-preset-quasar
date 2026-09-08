import type { Rule } from '@unocss/core'

export const qExpansionItemRules: Rule[] = [
  [
    /^q-expansion-item$/,
    () => ({
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-expansion-item__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '12px 16px',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-expansion-item__toggle-icon$/,
    () => ({
      'margin-left': 'auto',
      transition: 'transform var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-expansion-item--expanded$/,
    () => ({
      'background-color': 'var(--q-surface-container-high)'
    })
  ],
  [
    /^q-expansion-item__content$/,
    () => ({
      padding: '0 16px 16px'
    })
  ]
]
