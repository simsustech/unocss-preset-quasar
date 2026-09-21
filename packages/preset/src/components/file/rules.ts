import type { Rule } from '@unocss/core'

export const fileRules = [
  [
    /^q-file$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__input`,
        opacity: '0% !important'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-field__input::-webkit-file-upload-button`,
        cursor: 'pointer !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__native`,
        'word-break': 'break-all',
        overflow: 'hidden'
      }
    }
  ],
  [
    /^q-file__progress$/,
    () => ({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0
    })
  ],
  [
    /^q-file__filler$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        width: '100%',
        border: 'none',
        padding: '0'
      }
      yield {
        padding: '0',
        'border-style': 'none',
        width: '100%',
        visibility: 'hidden'
      }
    }
  ],
  [
    /^q-file__dnd$/,
    function* (_, { symbols }) {
      yield { outline: '1px dashed currentColor', 'outline-offset': '-4px' }
      yield {
        'outline-color':
          'color-mix(in oklab, 1px dashed currentColor var(--un-outline-opacity), transparent)',
        'outline-offset': '-4px'
      }
    }
  ]
] as Rule[]
