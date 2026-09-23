import type { Rule } from '@unocss/core'

/**
 * QScrollArea — was an empty stub (`export const scrollAreaRules = []`), so the
 * component rendered completely unstyled: no `contain`, no bar/thumb geometry
 * and therefore no scrollbar chrome at all.
 *
 * The reference deployment ships these eleven `q-scrollarea*` classes; the
 * declarations below mirror them. Quasar adds every class here from JS at
 * runtime, so they are all in the safelist too (they appear in no scanned
 * source, and without a safelist entry the rules would never emit).
 */
export const scrollAreaRules = [
  [
    /^q-scrollarea$/,
    function* (_, { symbols }) {
      // .q-scrollarea
      yield {
        contain: 'strict',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        'min-height': '100%',
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bar`,
        opacity: 0.2,
        transition: 'opacity 0.3s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb`,
        // quasar: Quasar's scrollbar-thumb corner (3px is MD2's extra-small, not MD3's 4px)
        'border-radius': '3px',
        'background-color': '#000',
        opacity: 0.2,
        transition: 'opacity 0.3s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-scrollarea--dark ${selector}__thumb`,
        'background-color': '#fff'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bar--h`,
        height: '10px',
        bottom: 0
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--h`,
        height: '10px',
        bottom: 0
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bar--v`,
        width: '10px',
        right: 0
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--v`,
        width: '10px',
        right: 0
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bar--invisible`,
        opacity: '0 !important',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--invisible`,
        opacity: '0 !important',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`
        // Colour overrides hang off the thumb rule above via symbols.selector.
      }
    }
  ],
  [
    /^q-scroll-area$/,
    function* () {
      // .q-scroll-area
    }
  ]
] as Rule[]
