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
      // Reference `body.quasar-style-unstyled .q-spinner`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-spinner-mat$/,
    function* (_, { symbols }) {
      // Reference `.q-spinner-mat { transform-origin: center center; animation:
      // q-spin 2s linear infinite }` and `.q-spinner-mat .path { animation:
      // q-mat-dash 1.5s ease-in-out infinite }`. The keyframes themselves are
      // step 9's; they are declared here because this module owns the animation.
      yield {
        'transform-origin': 'center center',
        animation: 'q-spin 2s linear infinite'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .path`,
        animation: 'q-mat-dash 1.5s ease-in-out infinite'
      }
    }
  ],
  [
    /^q-spinner--gears$/,
    () => ({
      // Gears spinner
    })
  ],
  [
    /^q-spinner--oval$/,
    () => ({
      // Oval spinner
    })
  ],
  [
    /^q-spinner--radio$/,
    () => ({
      // Radio spinner
    })
  ],
  [
    /^q-spinner--tail$/,
    () => ({
      // Tail spinner
    })
  ],
  [
    /^q-spinner-comment$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} circle:nth-of-type(1)`,
        animation: 'q-comment-typing1 1s linear infinite'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} circle:nth-of-type(2)`,
        animation: 'q-comment-typing2 1s linear infinite'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} circle:nth-of-type(3)`,
        animation: 'q-comment-typing3 1s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-dots$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} circle`,
        animation: 'q-dots-pulse 0.8s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-grid$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} circle`,
        animation: 'q-grid-fade 1s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-hearts$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} path[fill-opacity]`,
        animation: 'q-hearts-pulse 1.4s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-infinity$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} path`,
        animation: 'q-infinity-dash 2s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-ios$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} line`,
        animation: 'q-ios-fade 750ms linear infinite'
      }
    }
  ],
  [
    /^q-spinner-puff$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} circle`,
        animation:
          'q-puff-expand 1.8s cubic-bezier(0.165, 0.84, 0.44, 1) infinite, q-puff-fade 1.8s cubic-bezier(0.3, 0.61, 0.355, 1) infinite'
      }
    }
  ],
  [
    /^q-spinner-radio$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} g > *`,
        animation: 'q-radio-fade 1s linear infinite'
      }
    }
  ],
  [
    /^q-spinner-rings$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} circle`,
        animation: 'q-rings-expand 3s linear infinite'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} circle:nth-of-type(3)`,
        animation: 'q-rings-center 1.5s linear infinite'
      }
    }
  ]
] as Rule[]
