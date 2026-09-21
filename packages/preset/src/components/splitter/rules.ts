import type { Rule } from '@unocss/core'

export const splitterRules = [
  [
    /^q-splitter$/,
    () => ({
      display: 'flex',
      width: '100%',
      height: '100%'
    })
  ],
  [
    /^q-splitter--dark$/,
    function* (_, { symbols }) {
      // Reference `.q-splitter--dark .q-splitter__separator`.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-splitter__separator`,
        'background-color':
          'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--un-bg-opacity), transparent)'
      }
    }
  ],
  [
    /^q-splitter--horizontal$/,
    function* (_, { symbols }) {
      yield { 'flex-direction': 'row' }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-splitter__panel`,
        width: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-splitter__separator`,
        height: '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-splitter__separator > div`,
        top: '-6px',
        bottom: '-6px'
      }
      // The grab cursor belongs to the *direction*, not the separator: the
      // reference states it on the active/workable combination.
      yield {
        [symbols.selector]: (sel) => `${sel}.q-splitter--active`,
        cursor: 'row-resize'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-splitter--workable > .q-splitter__separator`,
        cursor: 'row-resize'
      }
    }
  ],
  [
    /^q-splitter--vertical$/,
    function* (_, { symbols }) {
      yield { 'flex-direction': 'column' }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-splitter__panel`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-splitter__separator`,
        width: '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-splitter__separator > div`,
        left: '-6px',
        right: '-6px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-splitter--active`,
        cursor: 'col-resize'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-splitter--workable > .q-splitter__separator`,
        cursor: 'col-resize'
      }
    }
  ],
  [
    /^q-splitter--limits$/,
    () => ({
      // Limits
    })
  ],
  [
    /^q-splitter__before$/,
    () => ({
      overflow: 'auto'
    })
  ],
  [
    /^q-splitter__after$/,
    () => ({
      overflow: 'auto'
    })
  ],
  [
    /^q-splitter__panel$/,
    function* (_, { symbols }) {
      yield {
        overflow: 'auto',
        position: 'relative',
        'z-index': '0'
      }
      // Reference `.q-splitter__panel > .q-splitter` — a nested splitter fills
      // its panel in both directions.
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-splitter`,
        width: '100%',
        height: '100%'
      }
    }
  ],
  [
    /^q-splitter__separator$/,
    () => ({
      // Reference `.q-splitter__separator`: the cursor is direction-specific, so
      // it is not set here.
      'background-color':
        'color-mix(in oklab, rgba(0, 0, 0, 0.12) var(--un-bg-opacity), transparent)',
      '-webkit-user-select': 'none',
      'user-select': 'none',
      position: 'relative'
    })
  ],
  [
    /^q-splitter__separator-area$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }
  ]
] as Rule[]
