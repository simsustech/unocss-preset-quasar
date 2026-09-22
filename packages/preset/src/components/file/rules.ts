import type { Rule } from '@unocss/core'

export const fileRules = [
  [
    /^q-file$/,
    function* (_, { symbols }) {
      // .q-file
      yield {
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__input`,
        opacity: '0% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-field__input::-webkit-file-upload-button`,
        cursor: 'pointer !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__native`,
        'word-break': 'break-all',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__filler`,
        visibility: 'hidden',
        width: '100%',
        border: 'none',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__filler`,
        padding: '0',
        'border-style': 'none',
        width: '100%',
        visibility: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dnd`,
        outline: '1px dashed currentColor',
        'outline-offset': '-4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dnd`,
        'outline-color':
          'color-mix(in oklab, 1px dashed currentColor var(--un-outline-opacity), transparent)',
        'outline-offset': '-4px'
      }
    }
  ]
] as Rule[]
