import type { Rule } from '@unocss/core'

export const pageRules = [
  [
    /^q-page$/,
    function* (_, { symbols }) {
      yield { padding: 'var(--q-space-md)' }
      // The unstyled style entry drops the component's own surface.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-page--padding$/,
    () => ({
      padding: 'var(--q-space-md)'
    })
  ],
  // No `/^q-page-container$/` rule: the reference defines it only inside
  // `.q-body--layout-animate` (a transition), so the container keeps its default
  // `display: block`. The rewrite's `display: flex; flex-direction: column;
  // flex: 1` chain made the page taller than the viewport (1018px against 900)
  // and clipped every page's content behind the drawer.

  [
    /^q-page-sticky$/,
    function* (_, { symbols }) {
      yield { position: 'fixed', 'z-index': '7000' }
      // The unstyled style entry drops the component's own surface.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-page-sticky--expand$/,
    () => ({
      // Expand
    })
  ],
  [
    /^q-page-sticky--shrink$/,
    function* (_, { symbols }) {
      yield { 'pointer-events': 'none' }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        display: 'inline-block',
        'pointer-events': 'auto'
      }
    }
  ]
] as Rule[]
