import type { Rule } from '@unocss/core'

/**
 * QFooter — mirrored counterpart of QHeader.
 *
 * Same contract: a positioned layout section (`position: relative;
 * z-index: 2000`), with the inner `.q-toolbar` owning the box model. The
 * surface comes from `.q-layout__section--marginal`. Previously this class was
 * split across two entries in two files, so last-wins dropped the base.
 *
 * It stays on the marginal tier with the header — no split. The bar did once
 * paint over the drawer's last nav item (both sat at 2000 / 1500), but the fix
 * is the overlay drawer's own tier, 3000 in `components/drawer/rules.ts`: an
 * open drawer covers this bar wherever the bar sits, so dropping the footer to
 * 1450 changed no observable behaviour. Recorded in ADR 0007.
 */
export const footerRules = [
  [
    /^q-footer$/,
    function* (_, { symbols }) {
      // .q-footer
      yield {
        position: 'relative',
        'z-index': 2000
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-layout__shadow:after`,
        top: '10px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-layout__shadow`,
        top: '-10px'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-top': '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--elevated`,
        'box-shadow': 'var(--q-elevation-level2)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--hidden`,
        // Reference slides the section out of view rather than removing it from the
        // flow: the layout keeps the space until the transition finishes.
        transform: 'translateY(110%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--reveal`
        // Reveal
      }
    }
  ]
] as Rule[]
