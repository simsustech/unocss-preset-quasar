import type { Rule } from '@unocss/core'

export const pageRules = [
  [
    /^q-page$/,
    function* (_, { symbols }) {
      // .q-page
      yield { padding: 'var(--q-space-md)' }
      yield {
        [symbols.selector]: (selector) => `${selector}--padding`,
        padding: 'var(--q-space-md)'
      }
    }
  ],
  [
    /^q-page-sticky$/,
    function* (_, { symbols }) {
      // .q-page-sticky
      // ADR 0007 (overlay layering scale): floating page content belongs above
      // the page but below every overlay — 1400, under the overlay drawer (1500)
      // so a modal drawer blocks a floating action button, and well under the
      // dialog/menu tier (6000). It was 7000: above dialogs, and the reference
      // carries no z-index for this selector at all.
      yield { position: 'fixed', 'z-index': '1400' }
      yield {
        [symbols.selector]: (selector) => `${selector}--expand`
        // Expand
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--shrink`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--shrink > div`,
        display: 'inline-block',
        'pointer-events': 'auto'
      }
    }
  ]
] as Rule[]
