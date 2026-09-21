import type { Rule } from '@unocss/core'

export const responsiveRules = [
  [
    /^q-responsive$/,
    () => ({
      // Reference: `max-width: 100%; max-height: 100%; position: relative` (no
      // `overflow: hidden` — that was the rewrite's own addition).
      'max-width': '100%',
      'max-height': '100%',
      position: 'relative'
    })
  ],
  // The unstyled style entry drops the component's surface. The rest of the
  // per-style rule overrides land with the style-switching work; this one is
  // kept here because `.q-responsive` is what it overrides.
  [
    /^q-responsive$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-responsive--ratio$/,
    () => ({
      // Ratio
    })
  ],
  [
    /^q-responsive__filler$/,
    function* () {
      yield {
        width: 'inherit',
        'max-width': 'inherit',
        height: 'inherit',
        'max-height': 'inherit'
      }
    }
  ],
  [
    /^q-responsive__content$/,
    function* (_, { symbols }) {
      yield { 'border-radius': 'inherit' }
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        width: '100% !important',
        height: '100% !important',
        'max-height': '100% !important',
        'max-width': '100% !important'
      }
    }
  ]
] as Rule[]
