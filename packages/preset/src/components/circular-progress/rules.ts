import type { Rule } from '@unocss/core'

export const circularProgressRules = [
  [
    /^q-circular-progress$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-block',
        position: 'relative',
        'vertical-align': 'middle',
        width: '1em',
        height: '1em',
        'line-height': '1',
        'content-visibility': 'auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-focusable`,
        'border-radius': '50%'
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
      yield { 'font-size': '0.25em' }
    }
  ],
  [
    /^q-circular-progress--indeterminate$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-circular-progress__circle`,
        'stroke-dasharray': '1 400',
        'stroke-dashoffset': '0',
        'transform-box': 'fill-box',
        'transform-origin': 'center',
        animation:
          'q-spin 2s linear infinite, q-circular-progress-circle 1.5s ease-in-out infinite /* rtl:ignore */'
      }
    }
  ]
] as Rule[]
