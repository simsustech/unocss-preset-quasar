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
    () => ({
      contain: 'strict',
      position: 'relative'
    })
  ],
  [
    /^q-scrollarea__content$/,
    () => ({
      'min-height': '100%',
      width: '100%'
    })
  ],
  [
    /^q-scrollarea__bar$/,
    () => ({
      opacity: 0.2,
      transition: 'opacity 0.3s'
    })
  ],
  [
    /^q-scrollarea__thumb$/,
    function* (_, { symbols }) {
      yield {
        'border-radius': '3px',
        'background-color': '#000',
        opacity: 0.2,
        transition: 'opacity 0.3s'
      }
      // Dark styling swaps the thumb to white (was `.q-scrollarea--dark
      // .q-scrollarea__thumb`).
      yield {
        [symbols.selector]: (sel) => `.q-scrollarea--dark ${sel}`,
        'background-color': '#fff'
      }
    }
  ],
  [
    /^q-scrollarea__bar--h$/,
    () => ({
      height: '10px',
      bottom: 0
    })
  ],
  [
    /^q-scrollarea__thumb--h$/,
    () => ({
      height: '10px',
      bottom: 0
    })
  ],
  [
    /^q-scrollarea__bar--v$/,
    () => ({
      width: '10px',
      right: 0
    })
  ],
  [
    /^q-scrollarea__thumb--v$/,
    () => ({
      width: '10px',
      right: 0
    })
  ],
  [
    /^q-scrollarea__bar--invisible$/,
    () => ({
      opacity: '0 !important',
      'pointer-events': 'none'
    })
  ],
  [
    /^q-scrollarea__thumb--invisible$/,
    () => ({
      opacity: '0 !important',
      'pointer-events': 'none'
    })
  ],
  [
    // Quasar zeroes the inline padding when a scroll area fills a drawer.
    /^q-scrollarea--dark$/,
    () => ({
      // Colour overrides hang off the thumb rule above via symbols.selector.
    })
  ]
] as Rule[]
