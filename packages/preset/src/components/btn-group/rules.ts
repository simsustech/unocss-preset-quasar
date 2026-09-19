import type { Rule } from '@unocss/core'

export const btnGroupRules = [
  [
    /^q-btn-group$/,
    () => ({
      display: 'inline-flex',
      'box-shadow': 'var(--q-elevation-1)',
      'border-radius': 'var(--q-btn-radius)'
    })
  ],
  [
    /^q-btn-group > .q-btn$/,
    function* (_, { symbols }) {
      yield {
        'border-radius': '0',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-btn-group > .q-btn',
        'background-color': 'var(--q-surface-container)'
      }
    }
  ],
  [
    /^q-btn-group$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-btn-group > .q-btn-item:before`,
        'box-shadow': 'none'
      }
      // Dark: btn-group item colour.
      yield {
        [symbols.selector]: () => '.body--dark .q-btn-group > .q-btn-item',
        color: 'var(--q-on-surface)'
      }
    }
  ],
  [
    /^q-btn-group$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-btn-group > .q-btn-group:not(:first-child) > .q-btn:first-child:before`,
        'border-left': '0'
      }
    }
  ],
  [
    /^q-btn-group$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-btn-group > .q-btn-group:not(:last-child) > .q-btn:last-child:before`,
        'border-right': '0'
      }
    }
  ],
  [
    /^q-btn-group$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-btn-group > .q-btn-item.q-btn--standard:before`,
        'z-index': '-1'
      }
    }
  ],
  [
    /^q-btn-group--outline$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-btn-group--outline > .q-btn-item + .q-btn-item:before`,
        'border-left': '0'
      }
    }
  ],
  [
    /^q-btn-group--outline$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-btn-group--outline > .q-btn-item:not(:last-child):before`,
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
    }
  ]
] as Rule[]
