import type { Rule } from '@unocss/core'

export const expansionItemRules = [
  [
    /^q-expansion-item$/,
    function* (_, { symbols }) {
      // .q-expansion-item
      yield {
        [symbols.selector]: (selector) => `${selector}__border`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__toggle-icon`,
        position: 'relative',
        transition: 'transform 0.3s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__toggle-icon--rotated`,
        rotate: '180deg',
        transform: 'rotate(180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__toggle-focus`,
        width: '1em !important',
        height: '1em !important',
        position: 'relative !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__toggle-focus + .q-expansion-item__toggle-icon`,
        'margin-top': '-1em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__toggle-section--switched.q-item__section--side`,
        'min-width': '56px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard.q-expansion-item--expanded > div > .q-expansion-item__border`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--popup`,
        transition: 'padding 0.5s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--popup > .q-expansion-item__container`,
        // Longhands, as the reference states them.
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--popup > .q-expansion-item__container > .q-separator`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--popup.q-expansion-item--collapsed`,
        padding: '0 15px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--popup.q-expansion-item--expanded`,
        padding: '15px 0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--popup.q-expansion-item--expanded + .q-expansion-item--popup.q-expansion-item--expanded`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--popup.q-expansion-item--collapsed:not(:first-child) > .q-expansion-item__container`,
        'border-top-width': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--popup.q-expansion-item--expanded + .q-expansion-item--popup.q-expansion-item--collapsed > .q-expansion-item__container`,
        'border-top-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content > .q-card`,
        'box-shadow': 'none',
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:first-child > div > .q-expansion-item__border--top`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:last-child > div > .q-expansion-item__border--bottom`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--expanded + .q-expansion-item--expanded > div > .q-expansion-item__border--top`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--expanded .q-textarea--autogrow textarea`,
        animation: 'q-expansion-done 0s'
      }
    }
  ]
] as Rule[]
