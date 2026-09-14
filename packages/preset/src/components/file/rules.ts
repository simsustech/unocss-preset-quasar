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
      yield { outline: '1px dashed currentColor', outlineOffset: '-4px' }
    }
  ]
] as Rule[]
