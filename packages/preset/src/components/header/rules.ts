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
      yield {
        [symbols.selector]: (selector) => `${selector} .q-layout__shadow:after`,
        bottom: '10px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-layout__shadow`,
        bottom: '-10px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-toolbar__title`,
        'flex-grow': '1000'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--elevated`,
        'box-shadow': 'var(--q-elevation-level2)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--hidden`,
        transform: 'translateY(-110%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--reveal`
      }
    }
  ]
] as Rule[]
