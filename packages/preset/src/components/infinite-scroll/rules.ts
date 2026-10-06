import type { Rule } from '@unocss/core'

export const infiniteScrollRules = [
  [
    /^q-infinite-scroll$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector}__sentinel`,
        height: '1px',
        'margin-top': '-1px',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--reverse .q-infinite-scroll__sentinel`,
        'margin-top': '0',
        'margin-bottom': '-1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-anchoring`,
        'overflow-anchor': 'none'
      }
      // Quasar 2.34 split the sentinel onto the edge it marks. The 2.31
      // `__sentinel` block above stays for the parity fixture; these resolve the
      // `--top/--bottom/--start/--end` classes the 2.34 runtime applies (and the
      // `--horizontal` scroller).
      yield {
        [symbols.selector]: (selector) => `${selector}--horizontal`,
        display: 'flex',
        'min-width': 'fit-content'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__sentinel--top, ${selector}__sentinel--bottom`,
        height: '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sentinel--bottom`,
        'margin-top': '-1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sentinel--top`,
        'margin-bottom': '-1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__sentinel--start, ${selector}__sentinel--end`,
        width: '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sentinel--end`,
        'margin-inline-start': '-1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sentinel--start`,
        'margin-inline-end': '-1px'
      }
    }
  ]
] as Rule[]
