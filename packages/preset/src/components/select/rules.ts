import type { Rule } from '@unocss/core'

export const selectRules = [
  [
    /^q-select$/,
    function* (_, { symbols }) {
      // .q-select — this root IS the QField (`q-field q-select …`), so it must
      // not disagree with the field root: `column` put `__before`/`__after`
      // above `__inner` and the field grew a second row.
      yield {
        display: 'flex',
        'flex-direction': 'row',
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__input`,
        'min-width': '50px !important',
        cursor: 'text'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-field__input--padding`,
        'padding-left': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dropdown-icon`,
        cursor: 'pointer !important',
        transition: 'transform 0.28s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__mirror`,
        visibility: 'hidden',
        'white-space': 'pre',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__selection`,
        display: 'flex',
        'align-items': 'center',
        'flex-wrap': 'wrap',
        gap: 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__placeholder`,
        color: 'var(--q-on-surface-variant)',
        opacity: 0.6
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--without-input .q-field__control`,
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--with-input .q-field__control`,
        cursor: 'text'
      }
      // AUD-024 fold: this shorthand yield and the longhand one below both
      // targeted the same selector, and the shorthand's `outline: 0` rewrote
      // `outline-style` to `none`, which is *not* what the reference states. The
      // longhand yield carries the reference's declarations, so it is the one
      // kept.
      yield {
        [symbols.selector]: (selector) => `${selector}__focus-target`,
        padding: '0',
        'outline-style':
          'var(--un-outline-style, var(--q-outline-style)) !important',
        'outline-width': '0px !important',
        'border-width': '0px',
        opacity: '0%',
        width: '1px',
        height: '1px',
        position: 'absolute'
      }
      // Same fold as the focus target above.
      yield {
        [symbols.selector]: (selector) => `${selector}__autocomplete-input`,
        padding: '0',
        'outline-style':
          'var(--un-outline-style, var(--q-outline-style)) !important',
        'outline-width': '0px !important',
        'border-width': '0px',
        opacity: '0%',
        width: '1px',
        height: '1px',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dialog`,
        width: '90vw !important',
        'max-width': '90vw !important',
        'max-height': 'calc(100vh - 70px) !important',
        background: '#fff',
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dialog > .scroll`,
        position: 'relative',
        background: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.mobile:not(.native-mobile) ${selector}__dialog`,
        'max-height': 'calc(100vh - 108px) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dialog-close`,
        color: 'var(--q-primary)',
        background: 'transparent',
        'align-self': 'stretch',
        border: '0',
        padding: '0 4px',
        'font-size': 'var(--q-label-large-size)',
        'font-weight': 'var(--fontWeight-medium)',
        'text-decoration': 'none',
        cursor: 'pointer'
      }
      // A select can render its selected value as a q-item (the `is-item`
      // convention in @simsustech/quasar-components' LocaleSelect). The item
      // then sits inside `.q-field__control`, whose inline padding and standard
      // surface push its icon out of the list rhythm — 12 + 16px where a plain
      // q-item's icon sits at 16px — and paint a filled field behind the row.
      // Cancel both so an item-style select keeps the list's icon column.
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-field__control:has(> .q-field__control-container > .q-field__native > .q-item)`,
        'padding-inline': '0',
        'background-color': 'transparent'
      }
    }
  ]
] as Rule[]
