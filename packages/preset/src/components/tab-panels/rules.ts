import type { Rule } from '@unocss/core'

/**
 * QTabPanels — was an empty stub, so the panel container never inherited the
 * parent's background and the unstyled style entry's reset had nowhere to land.
 */
export const tabPanelsRules = [
  [
    /^q-tab-panels$/,
    function* (_, { symbols }) {
      // .q-tab-panels
      yield { 'background-color': 'inherit' }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-tab-panel$/,
    function* (_, { symbols }) {
      // .q-tab-panel
      yield { padding: '16px' }
      yield { padding: '16px' }
    }
  ]
] as Rule[]
