import type { Rule } from '@unocss/core'

export const loadingRules: Rule[] = [
  [
    /^q-loading$/,
    () => ({
      // `!important` matches quasar.css: the overlay must stay fixed even when
      // the app sets a positioning context on an ancestor.
      position: 'fixed !important',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'rgba(0, 0, 0, 0.7)',
      color: 'var(--q-on-primary)',
      'z-index': 9500
    })
  ]
]
