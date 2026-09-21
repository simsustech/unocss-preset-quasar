import type { Rule } from '@unocss/core'

export const popupEditRules = [
  [
    /^q-popup-edit$/,
    function* () {
      // Reference states the padding as logical longhands (`padding-inline:
      // 16px; padding-block: 8px`), so the declaration is the one the gate
      // measures and RTL gets it for free.
      yield { 'padding-inline': '16px', 'padding-block': '8px' }
    }
  ],
  [
    /^q-popup-edit__buttons$/,
    function* (_, { symbols }) {
      yield { 'margin-top': '8px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn + .q-btn`,
        'margin-left': '8px'
      }
    }
  ]
] as Rule[]
