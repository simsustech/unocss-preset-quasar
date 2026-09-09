import type { Rule } from '@unocss/core'

export const selectRules = [
  [
    /^q-select$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      cursor: 'pointer'
    })
  ],
  [
    /^q-select__dropdown-icon$/,
    () => ({
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      transition: 'transform var(--q-duration-short) var(--q-easing-standard)'
    })
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
  ][
    (/^q-select--without-input$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        cursor: 'pointer'
      }
    })
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
    function* () {
      yield {
        position: 'absolute',
        outline: '0 !important',
        width: '1px',
        height: '1px',
        padding: '0',
        border: '0',
        opacity: '0'
      }
    }
  ],
  [
    /^q-select__autocomplete-input$/,
    function* () {
      yield {
        position: 'absolute',
        outline: '0 !important',
        width: '1px',
        height: '1px',
        padding: '0',
        border: '0',
        opacity: '0'
      }
    }
  ],
  [
    /^q-select__dialog$/,
    function* (_, { symbols }) {
      yield {
        width: '90vw !important',
        maxWidth: '90vw !important',
        maxHeight: 'calc(100vh - 70px) !important',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .scroll`,
        position: 'relative',
        background: 'inherit'
      }
    }
  ],
  [
    /^q-select__dialog-close$/,
    function* () {
      yield {
        color: 'var(--q-primary)',
        background: 'transparent',
        alignSelf: 'stretch',
        border: '0',
        padding: '0 4px',
        fontSize: '14px',
        fontWeight: '500',
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }
  ]
] as Rule[]
