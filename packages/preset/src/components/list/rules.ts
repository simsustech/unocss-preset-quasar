import type { Rule } from '@unocss/core'

/**
 * QList — the `.q-list*` matchers were missing from the preset entirely.
 *
 * Nothing in `src/` matched `q-list`, so bordered/separator/dense lists had no
 * styles at all: rows ran edge to edge and no divider appeared between items.
 * (`item/rules.ts` owns the `.q-item*` and `.q-item__section*` rules; do not
 * duplicate them here — a second matcher for the same regex silently shadows
 * the first in UnoCSS.)
 *
 * Targets come from the deployed reference stylesheet (a published build of this
 * preset), cross-checked against specs/reference/normalized/md3-lists.json.
 */
export const listRules = [
  [
    /^q-list$/,
    () => ({
      'padding-inline': '0',
      'padding-block': '0',
      outline: '0'
    })
  ],
  [
    /^q-list--bordered$/,
    () => ({
      border: '1px solid var(--q-separator-color)'
    })
  ],
  [
    // Bordered/separator lists draw the rule between rows instead of relying on
    // <q-separator> children.
    /^q-list--separator$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-item-type + .q-item-type`,
        'border-top': '1px solid var(--q-separator-color)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-virtual-scroll__content > .q-item-type + .q-item-type`,
        'border-top': '1px solid var(--q-separator-color)'
      }
    }
  ],
  [
    /^q-list--bordered.q-list--separator$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-item-type + .q-item-type:last-of-type`,
        'border-bottom': '0'
      }
    }
  ],
  [
    /^q-list--padding$/,
    () => ({
      'padding-inline': '0',
      'padding-block': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-list--dark$/,
    () => ({
      color: 'var(--q-on-surface)',
      'border-color': 'var(--q-outline)'
    })
  ],
  // No `/^q-item-type$/` rule: the reference declares nothing for the bare
  // class, and a rule added only to force it into the sheet would land after
  // `.q-item` in the cascade — every QItem carries both classes, so it would win
  // with a `display` of its own and break the flex row (`display: block` made
  // petboarding's booking rows 154px instead of 93px). The class reaches the
  // sheet through the safelist instead; the only rule that needs it is the
  // sibling separator below.
  [
    // Dense rows tighten the block padding (Quasar: 8px -> 2px).
    /^q-list--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-item`,
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': '2px',
        'min-height': 'var(--q-item-dense-min-height)'
      }
    }
  ]
] as Rule[]
