import type { Rule } from '@unocss/core'

/**
 * QHeader — a positioned layout section, not a toolbar.
 *
 * Quasar keeps `.q-header` minimal (`position: relative; z-index: 2000`) and
 * lets the `.q-toolbar` inside own the flex row, padding and height. The
 * earlier rewrite duplicated the toolbar's box model here and split the class
 * across two entries; because the engine keeps only the last rule per regex,
 * the base declarations were silently dropped and the header rendered as a
 * bare transparent block.
 *
 * Surface color comes from `.q-layout__section--marginal`
 * (md.sys.color.surface-container-low), matching the reference.
 */
export const headerRules = [
  [
    /^q-header$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        'z-index': 2000
      }
      // Shadow hook: the reveal/elevate helper sits inside the header and
      // overflows below it (quasar.css `.q-header .q-layout__shadow:after`).
      yield {
        [symbols.selector]: (sel) => `${sel} .q-layout__shadow:after`,
        bottom: '10px'
      }
      // Dark: header border.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-header--bordered$/,
    () => ({
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-header--elevated$/,
    () => ({
      'box-shadow': 'var(--q-elevation-2)'
    })
  ],
  [
    /^q-header--hidden$/,
    () => ({
      display: 'none'
    })
  ],
  [
    /^q-header--reveal$/,
    () => ({
      // Reveal
    })
  ]
] as Rule[]
