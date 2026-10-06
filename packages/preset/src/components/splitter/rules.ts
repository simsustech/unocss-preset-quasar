import type { Rule } from '@unocss/core'

export const splitterRules = [
  [
    /^q-splitter$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-splitter__separator`,
        'background-color':
          'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--q-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--horizontal`,
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal > .q-splitter__panel`,
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal > .q-splitter__separator`,
        height: '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal > .q-splitter__separator > div`,
        top: '-6px',
        bottom: '-6px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal.q-splitter--active`,
        cursor: 'row-resize'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal.q-splitter--workable > .q-splitter__separator`,
        cursor: 'row-resize'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical > .q-splitter__panel`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical > .q-splitter__separator`,
        width: '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical > .q-splitter__separator > div`,
        left: '-6px',
        right: '-6px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical.q-splitter--active`,
        cursor: 'col-resize'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical.q-splitter--workable > .q-splitter__separator`,
        cursor: 'col-resize'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--limits`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__before`,
        overflow: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__after`,
        overflow: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__panel`,
        overflow: 'auto',
        position: 'relative',
        'z-index': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__panel > .q-splitter`,
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__separator`,
        // Reference `.q-splitter__separator`: the cursor is direction-specific, so
        // it is not set here.
        'background-color':
          'color-mix(in oklab, rgba(0, 0, 0, 0.12) var(--q-bg-opacity), transparent)',
        '-webkit-user-select': 'none',
        'user-select': 'none',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__separator-area > *`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }
  ]
] as Rule[]
