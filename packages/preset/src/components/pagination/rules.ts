import type { Rule } from '@unocss/core'

export const paginationRules = [
  [
    /^q-pagination$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        // Reference `.q-pagination { flex: 0 1 auto !important }`.
        flex: '0 1 auto',
        gap: 'var(--q-space-xs)'
      }
      // Reference `.q-pagination input` and its spin-button reset.
      yield {
        [symbols.selector]: (sel) => `${sel} input`,
        'text-align': 'center'
      }
      for (const pseudo of [
        '::-webkit-inner-spin-button',
        '::-webkit-outer-spin-button'
      ]) {
        yield {
          [symbols.selector]: (sel) => `${sel} input${pseudo}`,
          margin: 'calc(var(--spacing) * 0)'
        }
      }
      // Reference `body.quasar-style-unstyled .q-pagination`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
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
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        // Reference `.q-pagination__content`: the gutter is the parent's, and the
        // children offset themselves from it.
        flex: '0 1 auto',
        'margin-top': 'var(--q-pagination-gutter-parent)',
        'margin-left': 'var(--q-pagination-gutter-parent)'
      }
      for (const child of ['.q-btn', '.q-input']) {
        yield {
          [symbols.selector]: (sel) => `${sel} > ${child}`,
          'margin-top': 'var(--q-pagination-gutter-child)',
          'margin-left': 'var(--q-pagination-gutter-child)'
        }
      }
    }
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
