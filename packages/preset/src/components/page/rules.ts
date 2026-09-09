import type { Rule } from '@unocss/core'

export const pageRules = [
  [
    /^q-page$/,
    () => ({
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-page--padding$/,
    () => ({
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-page-container$/,
    () => ({
      flex: '1',
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-page-sticky$/,
    () => ({
      position: 'fixed',
      'z-index': 7000
    })
  ],
  [
    /^q-page-sticky--expand$/,
    () => ({
      // Expand
    })
  ][
    (/^q-page-sticky--shrink$/,
    function* (_, { symbols }) {
      yield { pointerEvents: 'none' }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        display: 'inline-block',
        pointerEvents: 'auto'
      }
    })
  ]
] as Rule[]
