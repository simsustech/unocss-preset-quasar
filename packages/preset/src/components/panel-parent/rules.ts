import type { Rule } from '@unocss/core'

/**
 * QDrawer/QMenu wrap their sliding panel in `.q-panel-parent`, which clips the
 * panel while it translates in and out. Without `overflow: hidden` the panel
 * paints outside its track before it is opened.
 */
export const panelParentRules = [
  [/^q-panel-parent$/, () => ({ position: 'relative', overflow: 'hidden' })]
] as Rule[]
