import type { Rule } from '@unocss/core'

export const qItemRules: Rule[] = [
  [
    /^q-item$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '8px 16px',
      'min-height': '48px',
      gap: '16px'
    })
  ],
  [
    /^q-item--clickable$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  [
    /^q-item--active$/,
    () => ({
      'background-color': 'var(--q-primary-container)',
      color: 'var(--q-on-primary-container)'
    })
  ],
  [
    /^q-item__section$/,
    () => ({
      display: 'flex',
      'align-items': 'center'
    })
  ],
  [
    /^q-item__section--side$/,
    () => ({
      'justify-content': 'center',
      'min-width': '40px',
      'flex-shrink': '0'
    })
  ],
  [
    /^q-item__section--main$/,
    () => ({
      flex: '1',
      'min-width': '0'
    })
  ],
  [
    /^q-item__label$/,
    () => ({
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    })
  ],
  [
    /^q-item__label--caption$/,
    () => ({
      'font-size': '0.75em',
      opacity: '0.7'
    })
  ],
  [
    /^q-item--dense$/,
    () => ({
      'min-height': '32px',
      padding: '4px 16px'
    })
  ]
]
