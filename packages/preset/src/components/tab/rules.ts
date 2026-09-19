import type { Rule } from '@unocss/core'

export const tabRules = [
  [
    /^q-tab$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: 'var(--q-space-sm) var(--q-space-md)',
      'min-height': 'var(--q-item-min-height)',
      cursor: 'pointer',
      'user-select': 'none',
      transition: 'color var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-tab--active$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-tab--active',
        color: 'var(--q-primary)'
      }
    }
  ],
  [
    /^q-tab--inactive$/,
    () => ({
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-tab--disabled$/,
    () => ({
      opacity: 0.4,
      cursor: 'not-allowed'
    })
  ],
  [
    /^q-tab__icon$/,
    () => ({
      'font-size': '1.5em',
      'margin-right': 'var(--q-space-xs)'
    })
  ],
  [
    /^q-tab__label$/,
    () => ({
      'font-size': '0.875em',
      'font-weight': 500
    })
  ]
] as Rule[]
