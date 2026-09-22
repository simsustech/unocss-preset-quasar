import type { Rule } from '@unocss/core'

export const selectRules = [
  [
    /^q-select$/,
    function* (_, { symbols }) {
      // .q-select
      yield {
        display: 'flex',
        'flex-direction': 'column',
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__native`,
        'padding-right': '48px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__input`,
        'padding-right': '48px',
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
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)'
        // transition comes from the yield below: the reference's `transform 0.28s`
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
      yield {
        [symbols.selector]: (selector) => `${selector}__focus-target`,
        position: 'absolute',
        outline: '0 !important',
        width: '1px',
        height: '1px',
        padding: '0',
        border: '0',
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__focus-target`,
        padding: '0',
        'outline-style': 'none !important',
        'outline-width': '0px !important',
        'border-width': '0px',
        opacity: '0%',
        width: '1px',
        height: '1px',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__autocomplete-input`,
        position: 'absolute',
        outline: '0 !important',
        width: '1px',
        height: '1px',
        padding: '0',
        border: '0',
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__autocomplete-input`,
        padding: '0',
        'outline-style': 'none !important',
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
        'font-size': '14px',
        'font-weight': '500',
        'text-decoration': 'none',
        cursor: 'pointer'
      }
    }
  ]
] as Rule[]
