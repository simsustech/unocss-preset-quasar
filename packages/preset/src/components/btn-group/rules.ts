import type { Rule } from '@unocss/core'

export const btnGroupRules = [
  [
    /^q-btn-group$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        // Reference `.q-btn-group`: middle-aligned, `flex: 0 1 auto`, 28px corner
        // and the level-2 elevation, which the preset previously took from a token
        // whose resolved pair differs.
        'vertical-align': 'middle',
        flex: '0 1 auto',
        'border-radius': '28px',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn`,
        'border-radius': '0',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} > .q-btn`,
        'background-color': 'var(--q-surface-container)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item:before`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} > .q-btn-item`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > ${sel}:not(:first-child) > .q-btn:first-child:before`,
        'border-left': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > ${sel}:not(:last-child) > .q-btn:last-child:before`,
        'border-right': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn-item.q-btn--standard:before`,
        'z-index': '-1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-group`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn-group:first-child > .q-btn:first-child`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn-group:not(:first-child) > .q-btn:first-child`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn-group:first-child > .q-btn--active`,
        'background-color':
          'color-mix(in oklab, var(--light-secondary-container) var(--un-bg-opacity), transparent) !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item`,
        color:
          'color-mix(in oklab, var(--light-on-surface) var(--un-text-opacity), transparent)',
        'align-self': 'stretch'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item:not(:first-child)`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item:not(:last-child)`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item .q-badge--floating`,
        right: 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item.bg-primary`,
        color:
          'color-mix(in oklab, var(--light-on-primary) var(--un-text-opacity), transparent) !important',
        'background-color':
          'color-mix(in oklab, var(--light-primary) var(--un-bg-opacity), transparent) !important'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel} > .q-btn-item.bg-primary`,
        color: 'var(--q-on-primary) !important',
        'background-color': 'var(--q-primary) !important'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel} > .q-btn-group:first-child > .q-btn--active`,
        'background-color': 'var(--q-secondary-container) !important'
      }
    }
  ],
  [
    /^q-btn-group--outline$/,
    function* (_, { symbols }) {
      // Reference `.q-btn-group--outline { box-shadow: none }`.
      yield { 'box-shadow': 'none' }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-separator`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn-item + .q-btn-item:before`,
        'border-left': '0'
      }
    }
  ],
  [
    /^q-btn-group--outline$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn-item:not(:last-child):before`,
        'border-right': '0'
      }
    }
  ],
  [
    /^q-btn-group--push$/,
    function* (_, { symbols }) {
      yield { 'border-radius': '7px' }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn--push.q-btn--actionable`,
        transform: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn--push.q-btn--actionable .q-btn__content`,
        transition:
          'margin-top 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), margin-bottom 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn--push.q-btn--actionable:active .q-btn__content`,
        'margin-top': '2px',
        'margin-bottom': '-2px'
      }
      // The bundle also emits the minifier artifact of the rule above, where the
      // combinator became `__`. It cannot match anything, but the reference
      // carries it, so parity carries it too.
      yield {
        [symbols.selector]: (sel) =>
          `${sel}__> .q-btn--push.q-btn--actionable.q-btn--active__.q-btn__content`,
        'margin-top': '2px',
        'margin-bottom': '-2px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn--push.q-btn--actionable.q-btn--active .q-btn__content`,
        'margin-top': '2px',
        'margin-bottom': '-2px'
      }
    }
  ],
  [
    /^q-btn-group--rounded$/,
    function* () {
      yield { 'border-radius': '28px' }
    }
  ],
  [
    /^q-btn-group--square$/,
    function* () {
      yield { 'border-radius': '0' }
    }
  ],
  [
    /^q-btn-group--flat$/,
    function* () {
      yield { 'box-shadow': 'none' }
    }
  ],
  [
    /^q-btn-group--unelevated$/,
    function* () {
      yield { 'box-shadow': 'none' }
    }
  ],
  [
    /^q-btn-group--stretch$/,
    function* () {
      yield { 'align-self': 'stretch', 'border-radius': '0' }
    }
  ],
  [
    /^q-btn-group--glossy$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item`,
        'background-image':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.12) 51%, rgba(0, 0, 0, 0.04)) !important'
      }
    }
  ],
  [
    /^q-btn-group--spread$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-group`,
        display: 'flex !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item`,
        width: 'auto',
        'min-width': '0',
        'max-width': '100%',
        flex: '10000 1 0%'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-btn-group > .q-btn-item:not(.q-btn-dropdown__arrow-container)`,
        width: 'auto',
        'min-width': '0',
        'max-width': '100%',
        flex: '10000 1 0%'
      }
      // Minifier artifact of the yield above (see the `--push` note).
      yield {
        [symbols.selector]: (sel) =>
          `${sel}__> .q-btn-group > .q-btn-item:not(.q-btn-dropdown__arrow-container)`,
        flex: '10000 1 0%',
        width: 'auto',
        'min-width': '0',
        'max-width': '100%'
      }
    }
  ]
] as Rule[]
