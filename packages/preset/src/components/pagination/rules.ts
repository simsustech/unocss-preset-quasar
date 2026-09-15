import type { Rule } from '@unocss/core'

export const paginationRules = [
  [
    /^q-pagination$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      gap: 'var(--q-space-xs)'
    })
  ],
  [
    /^q-pagination--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-pagination__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: '2px'
    })
  ],
  [
    /^q-pagination__drop$/,
    () => ({
      // Drop zone
    })
  ],
  [
    /^q-pagination__ellipsis$/,
    () => ({
      // Ellipsis
    })
  ],
  [
    /^q-pagination__goto$/,
    () => ({
      // Go to page
    })
  ],
  [
    /^q-pagination__input$/,
    () => ({
      width: '3em',
      'text-align': 'center'
    })
  ],
  [
    /^q-pagination__range$/,
    () => ({
      // Range
    })
  ],
  [
    /^q-pagination__middle$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn`,
        'margin-top': 'var(--q-pagination-gutter-child)',
        'margin-left': 'var(--q-pagination-gutter-child)'
      }
    }
  ]
] as Rule[]
