import type { Rule } from '@unocss/core'

export const circularProgressRules = [
  [
    /^q-circular-progress$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'middle',
        width: '1em',
        height: '1em',
        lineHeight: '1',
        contentVisibility: 'auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-focusable`,
        borderRadius: '50%'
      }
    }
  ],
  [
    /^q-circular-progress__svg$/,
    function* () {
      yield { width: '100%', height: '100%' }
    }
  ],
  [
    /^q-circular-progress__text$/,
    function* () {
      yield { fontSize: '0.25em' }
    }
  ],
  [
    /^q-circular-progress--indeterminate$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-circular-progress__circle`,
        strokeDasharray: '1 400',
        strokeDashoffset: '0',
        transformBox: 'fill-box',
        transformOrigin: 'center',
        animation:
          'q-spin 2s linear infinite, q-circular-progress-circle 1.5s ease-in-out infinite /* rtl:ignore */'
      }
    }
  ]
] as Rule[]
