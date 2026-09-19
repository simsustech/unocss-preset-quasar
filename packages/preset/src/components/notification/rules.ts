import type { Rule } from '@unocss/core'

export const notificationRules: Rule[] = [
  [
    /^q-notification$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'min-width': '300px',
        'max-width': '95vw',
        'border-radius': 'var(--q-radius-sm)',
        background: 'var(--q-inverse-surface)',
        color: 'var(--q-inverse-on-surface)',
        'box-shadow': 'var(--q-elevation-6)',
        'word-break': 'break-word'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-notification',
        color: 'var(--q-inverse-on-surface)',
        'background-color': 'var(--q-inverse-surface)'
      }
    }
  ],
  [
    /^q-notification__actions$/,
    function* (_, { symbols }) {
      yield { 'margin-left': 'auto' }
      yield {
        [symbols.selector]: () => '.body--dark .q-notification__actions',
        color: 'var(--q-primary)'
      }
    }
  ],
  [
    /^q-notification--standard$/,
    () => ({
      'min-height': '56px',
      padding: '14px 16px'
    })
  ],
  [
    /^q-notification--multi-line$/,
    () => ({
      'min-height': '68px'
    })
  ]
]
