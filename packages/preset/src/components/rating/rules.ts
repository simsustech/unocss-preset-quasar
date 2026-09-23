import type { Rule } from '@unocss/core'

export const ratingRules = [
  [
    /^q-rating$/,
    function* (_, { symbols }) {
      // .q-rating
      yield {
        display: 'inline-flex',
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        color:
          'color-mix(in oklab, #ffeb3b var(--q-text-opacity), transparent)',
        'vertical-align': 'middle'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`
        // Dark mode
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--editable`,
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-reset`
        // No reset
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.5em',
        cursor: 'pointer'
        // `color` and the transition come from the yield below: the reference's
        // `currentColor` and its `transform`/`opacity` 0.2s pair. The copies that
        // used to sit here recoloured every star after the fold.
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        color: 'currentColor',
        opacity: '40%',
        'text-shadow':
          '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: 'transform 0.2s ease-in, opacity 0.2s ease-in',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--active`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--exselected`,
        opacity: '70%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--hovered`,
        transform: 'scale(1.3)'
      }
      // AUD-024 fold: `opacity: 100%` here and `opacity: 1` in the padding pass
      // below were the same declaration twice; the later one is kept.
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--active`,
        color: '#f9a825'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--inactive`,
        color: 'var(--q-surface-container-highest)'
      }
      // AUD-024 fold: the `outline: 0` yield here and the longhand one below are
      // one block now — the shorthand wrote `outline-style: none`, the reference
      // states the wind4 outline variable.
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__icon-container + .q-rating__icon-container`,
        'margin-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon-container`,
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
        'outline-width': '0px',
        height: '1em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__icon-container + ${selector}__icon-container`,
        'margin-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-rating--editable ${selector}__icon-container`,
        cursor: 'pointer !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--hovered`,
        transform: 'scale(1.3)'
      }
      // AUD-024 fold: the `0.7` copy of `__icon--exselected`'s opacity is gone; the reference states `70%`.
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--no-dimming .q-rating__icon`,
        opacity: '1'
      }
    }
  ]
] as Rule[]
