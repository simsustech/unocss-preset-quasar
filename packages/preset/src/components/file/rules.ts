import type { Rule } from '@unocss/core'

export const fileRules = [
  [
    /^q-file$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
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
    function* () {
      yield {
        visibility: 'hidden',
        width: '100%',
        border: 'none',
        padding: '0'
      }
    }
  ],
  [
    /^q-file__dnd$/,
    function* () {
      yield { outline: '1px dashed currentColor', 'outline-offset': '-4px' }
    }
  ],
  // --- Reference parity: the native input is hidden, the filler keeps the row ---
  [
    /^q-file$/,
    function* (_, { symbols }) {
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
    /^q-file__filler$/,
    function* () {
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
    function* () {
      yield {
        'outline-color':
          'color-mix(in oklab, 1px dashed currentColor var(--un-outline-opacity), transparent)',
        'outline-offset': '-4px'
      }
    }
  ]
] as Rule[]
