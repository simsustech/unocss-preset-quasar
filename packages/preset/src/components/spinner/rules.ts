import type { Rule } from '@unocss/core'

export const spinnerRules = [
  [
    /^q-spinner$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        // Reference `.q-spinner { vertical-align: middle }`.
        'vertical-align': 'middle'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--gears`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--oval`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--radio`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--tail`
      }
    }
  ],
  [
    /^q-spinner-mat$/,
    function* (_, { symbols }) {
      yield {
        'transform-origin': 'center center',
        animation: 'q-spin 2s linear infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .path`,
        animation: 'q-mat-dash 1.5s ease-in-out infinite'
      }
    }
  ],
  [
    /^q-spinner-comment$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} circle:nth-of-type(1)`,
        animation: 'q-comment-typing1 1s linear infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} circle:nth-of-type(2)`,
        animation: 'q-comment-typing2 1s linear infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} circle:nth-of-type(3)`,
        animation: 'q-comment-typing3 1s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-dots$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} circle`,
        animation: 'q-dots-pulse 0.8s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-grid$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} circle`,
        animation: 'q-grid-fade 1s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-hearts$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} path[fill-opacity]`,
        animation: 'q-hearts-pulse 1.4s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-infinity$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} path`,
        animation: 'q-infinity-dash 2s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-ios$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} line`,
        animation: 'q-ios-fade 750ms linear infinite'
      }
    }
  ],
  [
    /^q-spinner-puff$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} circle`,
        animation:
          'q-puff-expand 1.8s cubic-bezier(0.165, 0.84, 0.44, 1) infinite, q-puff-fade 1.8s cubic-bezier(0.3, 0.61, 0.355, 1) infinite'
      }
    }
  ],
  [
    /^q-spinner-radio$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} g > *`,
        animation: 'q-radio-fade 1s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-rings$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} circle`,
        animation: 'q-rings-expand 3s linear infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} circle:nth-of-type(3)`,
        animation: 'q-rings-center 1.5s linear infinite'
      }
    }
  ]
] as Rule[]
