import type { Rule } from '@unocss/core'

export const barRules = [
  [
    /^q-bar$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      padding: '0 var(--q-space-md)',
      'min-height': '32px',
      'background-color': 'var(--q-surface-container)',
      color: 'var(--q-on-surface)',
      gap: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-bar--dense$/,
    () => ({
      'min-height': '24px',
      padding: '0 var(--q-space-sm)'
    })
  ],
  [
    /^q-bar--dark$/,
    () => ({
      'background-color': 'var(--q-surface-container-high)'
    })
  ][
    (/^q-bar--standard$/,
    function* (_, { symbols }) {
      yield {
        padding: '0 12px',
        height: '32px',
        fontSize: '18px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        fontSize: '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        fontSize: '11px'
      }
    })
  ]
] as Rule[]
