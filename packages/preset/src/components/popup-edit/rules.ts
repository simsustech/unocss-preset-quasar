import type { Rule } from '@unocss/core'

export const popupEditRules = [
  [
    /^q-popup-edit$/,
    function* (_, { symbols }) {
      // .q-popup-edit
      yield { 'padding-inline': '16px', 'padding-block': '8px' }
      yield {
        [symbols.selector]: (selector) => `${selector}__buttons`,
        'margin-top': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__buttons .q-btn + .q-btn`,
        'margin-left': '8px'
      }
    }
  ]
] as Rule[]
