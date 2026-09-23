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
    /^q-no-ssr$/,
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
    function* () {
      yield {
        background: 'none',
        color: 'inherit'
      }
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
