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
      // AUD-024 fold: `__filler`'s shorthand-first copy is gone; the longhand yield below matches the reference (`border-style: none`).
      yield {
        [symbols.selector]: (selector) => `${selector}__filler`,
        padding: '0',
        'border-style': 'none',
        width: '100%',
        visibility: 'hidden'
      }
      // AUD-024 fold: the correct-looking `outline` yield is gone: the reference states the (malformed) `outline-color: color-mix(...)` form, kept below as the HANDOFF §5 parity shim.
      yield {
        [symbols.selector]: (selector) => `${selector}__dnd`,
        'outline-color':
          'color-mix(in oklab, 1px dashed currentColor var(--q-outline-opacity), transparent)',
        'outline-offset': '-4px'
      }
    }
  ]
] as Rule[]
