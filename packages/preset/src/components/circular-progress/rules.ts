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
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
      // Reference `body.quasar-style-unstyled .q-circular-progress`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
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
      // The reference runs the spin on the SVG and the dash on the circle; the
      // preset used to stack both animations on the circle, so the `animation`
      // list compared unequal and the SVG had no rotation of its own.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-circular-progress__svg`,
        'transform-origin': '50% 50%',
        animation: 'q-spin 2s linear infinite'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-circular-progress__circle`,
        'stroke-dasharray': '1 400',
        'stroke-dashoffset': '0',
        'transform-box': 'fill-box',
        'transform-origin': 'center',
        animation:
          'q-circular-progress-circle 1.5s ease-in-out infinite /* rtl:ignore */'
      }
    }
  ]
] as Rule[]
