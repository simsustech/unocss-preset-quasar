import type { Rule } from '@unocss/core'

/**
 * QFooter — mirrored counterpart of QHeader.
 *
 * Same contract: a positioned layout section (`position: relative;
 * z-index: 2000`), with the inner `.q-toolbar` owning the box model. The
 * surface comes from `.q-layout__section--marginal`. Previously this class was
 * split across two entries in two files, so last-wins dropped the base.
 */
export const footerRules = [
  [
    /^q-footer$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        'z-index': 2000
      }
      yield {
        [symbols.selector]: () => '.q-footer .q-layout__shadow:after',
        top: '10px'
      }
      // Dark: footer border.
      yield {
        [symbols.selector]: () => '.body--dark .q-footer',
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-footer--bordered$/,
    () => ({
      'border-top': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-footer--elevated$/,
    () => ({
      'box-shadow': 'var(--q-elevation-2)'
    })
  ],
  [
    /^q-footer--hidden$/,
    () => ({
      display: 'none'
    })
  ],
  [
    /^q-footer--reveal$/,
    () => ({
      // Reveal
    })
  ]
] as Rule[]
