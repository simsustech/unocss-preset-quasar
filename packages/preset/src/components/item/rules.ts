import type { Rule } from '@unocss/core'

export const itemRules = [
  [
    /^q-item$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: 'var(--q-space-sm) var(--q-space-md)',
      'min-height': 'var(--q-item-min-height)',
      gap: 'var(--q-item-gap)'
    })
  ],
  [
    /^q-item--clickable$/,
    () => ({
      cursor: 'pointer',
      'user-select': 'none'
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
    /^q-item--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-item--dense$/,
    () => ({
      'min-height': 'var(--q-item-dense-min-height)',
      gap: 'var(--q-space-md)'
    })
  ],
  [
    /^q-item--clickable$/,
    () => ({
      cursor: 'pointer',
      'user-select': 'none'
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
    /^q-item--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-item--dense$/,
    () => ({
      'min-height': '32px',
      padding: 'var(--q-space-xs) var(--q-space-md)'
    })
  ],
  [
    /^q-item--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-item--inset$/,
    () => ({
      'padding-left': 'calc(var(--q-space-md) + 56px)'
    })
  ],
  [
    /^q-item--section$/,
    () => ({
      // Section item
    })
  ],
  [
    /^q-item--tag$/,
    () => ({
      // Tag item
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
      'flex-shrink': 0
    })
  ],
  [
    /^q-item__section--main$/,
    () => ({
      flex: '1',
      'min-width': 0
    })
  ],
  [
    /^q-item__section--avatar$/,
    () => ({
      'min-width': '40px'
    })
  ],
  [
    /^q-item__section--thumbnail$/,
    () => ({
      'min-width': '80px'
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
      opacity: 0.7
    })
  ],
  [
    /^q-item__label--header$/,
    () => ({
      'font-weight': 600
    })
  ],
  [
    /^q-item__label--inset$/,
    () => ({
      // Inset label
    })
  ],
  [
    /^q-item__section--nowrap$/,
    function* () {
      yield { 'white-space': 'nowrap' }
    }
  ],
  [
    /^q-item__label--overline$/,
    function* () {
      yield { color: 'color-mix(in srgb, currentColor 70%, transparent)' }
    }
  ]
] as Rule[]
