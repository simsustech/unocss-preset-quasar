import type { Rule } from '@unocss/core'

/**
 * QTabPanels — was an empty stub, so the panel container never inherited the
 * parent's background and the unstyled style entry's reset had nowhere to land.
 */
export const tabPanelsRules = [
  [
    /^q-tab-panels$/,
    function* (_, { symbols }) {
      yield { 'background-color': 'inherit' }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  // --- Reference parity: every panel keeps the 16px gutter ---
  [/^q-tab-panel$/, () => ({ padding: '16px' })],
  // --- Reference parity: every panel keeps the 16px gutter ---
  [/^q-tab-panel$/, () => ({ padding: '16px' })]
] as Rule[]
