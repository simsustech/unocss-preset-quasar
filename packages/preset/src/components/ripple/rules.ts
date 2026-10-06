import type { Rule } from '@unocss/core'

/**
 * Ripple directive (`v-ripple`). Quasar's directive injects both elements while
 * the app runs, so no consuming source names these classes: they are carried by
 * `quasarSafelist` instead.
 *
 * Declarations mirror quasar/dist/quasar.css verbatim (the directive's own
 * `.q-ripple` block plus the two transition states), `rtl:ignore` markers
 * included.
 *
 * Placement: `src/components/ripple/` mirrors Quasar's own tree (its
 * `ui/src/directives/Ripple.js` ships these classes) the same way the core
 * helpers do for `q-document--*`; see the ADR on the audit tooling contract.
 */
export const rippleRules = [
  [
    /^q-ripple$/,
    function* () {
      yield {
        position: 'absolute',
        top: '0',
        left: '0 /* rtl:ignore */',
        width: '100%',
        height: '100%',
        color: 'inherit',
        'border-radius': 'inherit',
        'z-index': '0',
        'pointer-events': 'none',
        overflow: 'hidden',
        contain: 'strict'
      }
    }
  ],
  [
    /^q-ripple__inner$/,
    function* () {
      yield {
        position: 'absolute',
        top: '0',
        left: '0 /* rtl:ignore */',
        opacity: '0',
        color: 'inherit',
        'border-radius': '50%',
        background: 'currentColor',
        'pointer-events': 'none',
        'will-change': 'transform, opacity'
      }
    }
  ],
  [
    /^q-ripple__inner--enter$/,
    function* () {
      yield {
        transition:
          'transform 0.225s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  ],
  [
    /^q-ripple__inner--leave$/,
    function* () {
      yield {
        transition:
          'transform 0.225s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  ]
] as Rule[]
