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
        [symbols.selector]: (sel) => `${sel} .q-layout__shadow:after`,
        top: '10px'
      }
      // Reference `.q-footer .q-layout__shadow { top: -10px }` — the shadow track
      // itself sits above the footer.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-layout__shadow`,
        top: '-10px'
      }
      // Reference `body.quasar-style-unstyled .q-footer`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      // Dark: footer border.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-footer--bordered$/,
    () => ({
      'border-top': '1px solid rgba(0, 0, 0, 0.12)'
    })
  ],
  [
    /^q-footer--elevated$/,
    () => ({
      'box-shadow': 'var(--q-elevation-level2)'
    })
  ],
  [
    /^q-footer--hidden$/,
    () => ({
      // Reference slides the section out of view rather than removing it from the
      // flow: the layout keeps the space until the transition finishes.
      transform: 'translateY(110%)'
    })
  ],
  [
    /^q-footer--reveal$/,
    () => ({
      // Reveal
    })
  ]
] as Rule[]
