import type { Rule } from '@unocss/core'

export const circularProgressRules = [
  [
    /^q-circular-progress$/,
    function* (_, { symbols }) {
      // .q-circular-progress
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
        [symbols.selector]: (selector) => `${selector}.q-focusable`,
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__svg`,
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__text`,
        'font-size': '0.25em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--indeterminate .q-circular-progress__svg`,
        'transform-origin': '50% 50%',
        animation: 'q-spin 2s linear infinite'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--indeterminate .q-circular-progress__circle`,
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
