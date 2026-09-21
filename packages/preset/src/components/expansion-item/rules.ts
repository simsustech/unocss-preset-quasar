import type { Rule } from '@unocss/core'

export const expansionItemRules = [
  [
    /^q-expansion-item__border$/,
    function* () {
      yield { opacity: '0' }
    }
  ],
  [
    /^q-expansion-item__toggle-icon$/,
    function* () {
      yield { position: 'relative', transition: 'transform 0.3s' }
    }
  ],
  [
    /^q-expansion-item__toggle-icon--rotated$/,
    function* () {
      // The reference rotates through the standalone `rotate` property (not the
      // `transform` shorthand); `transform` stays as an extra for engines that
      // predate it.
      yield { rotate: '180deg', transform: 'rotate(180deg)' }
    }
  ],
  [
    /^q-expansion-item__toggle-focus$/,
    function* (_, { symbols }) {
      yield {
        width: '1em !important',
        height: '1em !important',
        position: 'relative !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} + .q-expansion-item__toggle-icon`,
        'margin-top': '-1em'
      }
    }
  ],
  [
    /^q-expansion-item__toggle-section--switched$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}.q-item__section--side`,
        'min-width': '56px'
      }
    }
  ],
  [
    /^q-expansion-item--standard$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-expansion-item--expanded > div > .q-expansion-item__border`,
        opacity: '1'
      }
    }
  ],
  [
    /^q-expansion-item--popup$/,
    function* (_, { symbols }) {
      yield { transition: 'padding 0.5s' }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-expansion-item__container`,
        // Longhands, as the reference states them.
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-expansion-item__container > .q-separator`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-expansion-item--collapsed`,
        padding: '0 15px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-expansion-item--expanded`,
        padding: '15px 0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-expansion-item--expanded + .q-expansion-item--popup.q-expansion-item--expanded`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-expansion-item--collapsed:not(:first-child) > .q-expansion-item__container`,
        'border-top-width': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-expansion-item--expanded + .q-expansion-item--popup.q-expansion-item--collapsed > .q-expansion-item__container`,
        'border-top-width': '1px'
      }
    }
  ],
  [
    /^q-expansion-item__content$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-card`,
        'box-shadow': 'none',
        'border-radius': '0'
      }
    }
  ],
  [
    /^q-expansion-item$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:first-child > div > .q-expansion-item__border--top`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:last-child > div > .q-expansion-item__border--bottom`,
        opacity: '0'
      }
      // Reference `body.quasar-style-unstyled .q-expansion-item`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-expansion-item--expanded$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} + .q-expansion-item--expanded > div > .q-expansion-item__border--top`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-textarea--autogrow textarea`,
        animation: 'q-expansion-done 0s'
      }
    }
  ]
] as Rule[]
