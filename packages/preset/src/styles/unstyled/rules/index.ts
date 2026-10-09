import type { Rule } from '@unocss/core'

/**
 * The unstyled entry's own rules: one reset per ported rule that states a literal
 * colour or shadow — the values no token can flip. Generated from the component
 * rules — read out of the component modules, one entry per matcher, in the order
 * those modules are walked.
 *
 * Each entry is scopeless on purpose: the style's scope supplies the prefix, so
 * the same declaration lands under `body.quasar-style-unstyled` when the entry is
 * a switchable style and unscoped when it is the baseline (see `rules/scope.ts`).
 */
export const unstyledRules: Rule[] = [
  [
    /^q-badge$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-banner$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-bar$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-btn-dropdown$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-btn-group$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-btn-toggle$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-btn$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-card$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-carousel$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-checkbox$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-chip$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-circular-progress$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-color-picker$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-date$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-dialog$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-bottom-sheet$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-drawer$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-editor$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-expansion-item$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-fab$/,
    function* (_, { symbols }) {
      yield {
        background: 'none',
        color: 'inherit',
        'box-shadow': 'none'
      }
      // The FAB's spread actions carry their own raised surface; without this the
      // list stays fully painted under `unstyled`. Found by the core walk in
      // `core-unstyled-contract.test.ts` (BUG-075).
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        background: 'none',
        'box-shadow': 'none'
      }
    }
  ],
  [
    /^q-field$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-footer$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-form$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-header$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-img$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-inner-loading$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-input$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-intersection$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-item$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-knob$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-linear-progress$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-loading$/,
    function* (_, { symbols }) {
      // The overlay states a LITERAL backdrop (`rgba(0, 0, 0, 0.7)`, and a
      // `#000` mix on the backdrop member) — no token can flip those, so
      // `unstyled` needs an explicit reset or the cell is a solid dark
      // rectangle. Found by the core walk (BUG-076).
      yield {
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__backdrop`,
        'background-color': 'transparent',
        opacity: '0'
      }
    }
  ],
  [
    /^q-markup-table$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-menu$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-message$/,
    function* (_, { symbols }) {
      yield {
        background: 'none',
        color: 'inherit'
      }
      // The bubble fill is `currentColor` (`.q-message-text` sets it), and the
      // direction members set the colour that drives it. Both live on members,
      // not the root, so the root reset alone would leave the bubbles painted
      // with the md3 surface role — the one component that stayed fully styled
      // under `unstyled`.
      yield {
        [symbols.selector]: (selector) => `${selector} .q-message-text`,
        'background-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-message-text--sent`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-message-text--received`,
        color: 'inherit'
      }
    }
  ],
  [
    /^q-no-ssr$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-notification$/,
    function* (_, { symbols }) {
      yield {
        background: 'none',
        color: 'inherit',
        'box-shadow': 'none'
      }
      // The toast paints its surface on the ROOT (`.q-notification`), unlike
      // most components, so the base rule is what shows through under
      // `unstyled` — a dark `--q-inverse-surface` slab with a literal drop
      // shadow. Same gap as BUG-067 (`q-message`): base rules are emitted
      // unscoped, so every style needs its own neutraliser here.
      //
      // The members carry their own fills and need neutralising too, or the
      // toast is a bare box with a negative badge and an opaque progress bar.
      yield {
        [symbols.selector]: (selector) => `${selector}__message`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__badge`,
        'background-color': 'transparent',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`,
        'background-color': 'transparent'
      }
    }
  ],
  [
    /^q-notifications$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-option-group$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-page$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-page-sticky$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-pagination$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-radio$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-range$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-rating$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-responsive$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-scroll-area$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-select$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-separator$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-skeleton$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-slide-item$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-slider$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-space$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-spinner$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-stepper$/,
    function* (_, { symbols }) {
      yield {
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header--border`,
        'border-bottom-color': 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--disabled .q-stepper__dot`,
        background: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--disabled .q-stepper__label`,
        color: 'inherit'
      }
      // Quasar's horizontal connector and vertical dot pseudo-elements are
      // structural separators. Their themed fills remain intentional; do not
      // neutralize these, unlike the disabled/header paint above.
    }
  ],
  [
    /^q-tab-panels$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-table$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-tab$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-time$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-timeline$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-toggle$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-toolbar$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-tooltip$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-tree$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-uploader$/,
    function* (_, { symbols }) {
      yield {
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__overlay`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-uploader__header$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-video$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-virtual-scroll$/,
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
    }
  ]
]
