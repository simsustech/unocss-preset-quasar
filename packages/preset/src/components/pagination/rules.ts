import type { Rule } from '@unocss/core'

export const paginationRules = [
  [
    /^q-pagination$/,
    function* (_, { symbols }) {
      // .q-pagination
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        // Reference `.q-pagination { flex: 0 1 auto !important }`.
        flex: '0 1 auto',
        gap: 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} input`,
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} input::-webkit-inner-spin-button`,
        margin: 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} input::-webkit-outer-spin-button`,
        margin: 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disabled`,
        opacity: 0.5,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        display: 'flex',
        'align-items': 'center',
        // Reference `.q-pagination__content`: the gutter is the parent's, and the
        // children offset themselves from it.
        flex: '0 1 auto',
        'margin-top': 'var(--q-pagination-gutter-parent)',
        'margin-left': 'var(--q-pagination-gutter-parent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content > .q-btn`,
        'margin-top': 'var(--q-pagination-gutter-child)',
        'margin-left': 'var(--q-pagination-gutter-child)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content > .q-input`,
        'margin-top': 'var(--q-pagination-gutter-child)',
        'margin-left': 'var(--q-pagination-gutter-child)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__drop`
        // Drop zone
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__ellipsis`
        // Ellipsis
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__goto`
        // Go to page
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input`,
        width: '3em',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__range`
        // Range
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__middle > .q-btn`,
        'margin-top': 'var(--q-pagination-gutter-child)',
        'margin-left': 'var(--q-pagination-gutter-child)'
      }
    }
  ]
] as Rule[]
