import type { Rule } from '@unocss/core'

export const popupEditRules = [
  [
    /^q-popup-edit$/,
    function* () {
      yield { padding: '8px 16px' }
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
