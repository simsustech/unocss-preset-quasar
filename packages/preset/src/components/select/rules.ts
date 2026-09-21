import type { Rule } from '@unocss/core'

export const selectRules = [
  [
    /^q-select$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__native`,
        'padding-right': '48px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__input`,
        'padding-right': '48px',
        'min-width': '50px !important',
        cursor: 'text'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__input--padding`,
        'padding-left': '4px'
      }
    }
  ],
  [
    /^q-select__dropdown-icon$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)'
        // transition comes from the yield below: the reference's `transform 0.28s`
      }
      yield {
        cursor: 'pointer !important',
        transition: 'transform 0.28s'
      }
    }
  ],
  [
    /^q-select__mirror$/,
    () => ({
      visibility: 'hidden',
      'white-space': 'pre',
      'pointer-events': 'none'
    })
  ],
  [
    /^q-select__selection$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'flex-wrap': 'wrap',
      gap: 'var(--q-space-xs)'
    })
  ],
  [
    /^q-select__placeholder$/,
    () => ({
      color: 'var(--q-on-surface-variant)',
      opacity: 0.6
    })
  ],
  [
    /^q-select--without-input$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        cursor: 'pointer'
      }
    }
  ],
  [
    /^q-select--with-input$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        cursor: 'text'
      }
    }
  ],
  [
    /^q-select__focus-target$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        outline: '0 !important',
        width: '1px',
        height: '1px',
        padding: '0',
        border: '0',
        opacity: '0%'
      }
      yield {
        padding: '0',
        'outline-style': 'none !important',
        'outline-width': '0px !important',
        'border-width': '0px',
        opacity: '0%',
        width: '1px',
        height: '1px',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-select__autocomplete-input$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        outline: '0 !important',
        width: '1px',
        height: '1px',
        padding: '0',
        border: '0',
        opacity: '0%'
      }
      yield {
        padding: '0',
        'outline-style': 'none !important',
        'outline-width': '0px !important',
        'border-width': '0px',
        opacity: '0%',
        width: '1px',
        height: '1px',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-select__dialog$/,
    function* (_, { symbols }) {
      yield {
        width: '90vw !important',
        'max-width': '90vw !important',
        'max-height': 'calc(100vh - 70px) !important',
        background: '#fff',
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .scroll`,
        position: 'relative',
        background: 'inherit'
      }
      // On a phone the select dialog is capped below the status bar.
      yield {
        [symbols.selector]: (sel) => `body.mobile:not(.native-mobile) ${sel}`,
        'max-height': 'calc(100vh - 108px) !important'
      }
    }
  ],
  [
    /^q-select__dialog-close$/,
    function* () {
      yield {
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
