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
    function* (_, { symbols }) {
      // .q-list
      yield {
        'padding-inline': '0',
        'padding-block': '0',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        // Reference states the border as longhands; the divider colour comes from
        // the colour-mix pair it uses, whose alpha channel is not compared.
        'border-style': 'solid',
        'border-width': '1px',
        'border-color':
          'color-mix(in oklab, rgba(0, 0, 0, 0.12) var(--un-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--padding`,
        'padding-inline': '0',
        'padding-block': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        color: 'var(--q-on-surface)',
        'border-color': 'var(--q-outline)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-item__label--caption`,
        color:
          'color-mix(in oklab, rgba(255, 255, 255, 0.8) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-item__label--overline`,
        color:
          'color-mix(in oklab, rgba(255, 255, 255, 0.8) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-item__label--header`,
        color:
          'color-mix(in oklab, rgba(255, 255, 255, 0.64) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-item__section--side:not(.q-item__section--avatar)`,
        color:
          'color-mix(in oklab, rgba(255, 255, 255, 0.7) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--separator > .q-item-type + .q-item-type`,
        'border-top': '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--separator > .q-virtual-scroll__content > .q-item-type + .q-item-type`,
        'border-top': '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense > .q-item`,
        'padding-inline': 'var(--q-space-lg)',
        // quasar: this value is Quasar's own, not a forked token
        'padding-block': '2px',
        'min-height': 'var(--q-item-dense-min-height)'
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
  ]
] as Rule[]
