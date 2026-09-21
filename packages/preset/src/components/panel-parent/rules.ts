import type { Rule } from '@unocss/core'

/**
 * QDrawer/QMenu wrap their sliding panel in `.q-panel-parent`, which clips the
 * panel while it translates in and out. Without `overflow: hidden` the panel
 * paints outside its track before it is opened.
 *
 * `.q-panel` itself is the transitioning box: the reference gives it the full
 * size of its parent and nothing else, because the panel's own sizing
 * (`QDrawer`'s `width`, `QMenu`'s `min-width`) is written inline by the runtime.
 */
export const panelParentRules = [
  [/^q-panel-parent$/, () => ({ position: 'relative', overflow: 'hidden' })],
  [
    /^q-panel$/,
    function* (_, { symbols }) {
      yield { height: '100%', width: '100%' }
      // Reference `.q-panel>div` (written without a space in the bundle).
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        height: '100%',
        width: '100%'
      }
    }
  ]
] as Rule[]
