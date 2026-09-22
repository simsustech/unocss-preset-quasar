import type { Rule } from '@unocss/core'

export const btnDropdownRules = [
  [
    /^q-btn-dropdown$/,
    function* (_, { symbols }) {
      // .q-btn-dropdown
      yield {
        display: 'inline-flex'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__arrow`,
        // Reference states the rotation transition rather than a generic one:
        // `transition-property: transform,translate,scale,rotate; transition-duration: 280ms`.
        'margin-left': '4px',
        'transition-property': 'transform,translate,scale,rotate',
        'transition-duration': '280ms'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--split .q-btn-dropdown__arrow-container`,
        // Logical padding longhands, as the reference states them.
        'padding-inline': 'var(--q-space-xs)',
        'padding-block': 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--split .q-btn-dropdown__arrow-container.q-btn--outline`,
        'border-left-width': '1px',
        'border-left-color': 'currentColor',
        'border-left-style': 'solid'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--split .q-btn-dropdown__arrow-container:not(.q-btn--outline)`,
        'border-left-width': '1px',
        'border-left-color':
          'color-mix(in oklab, var(--colors-white) var(--un-border-left-opacity), transparent)',
        'border-left-style': 'solid'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--simple+.q-btn-dropdown__arrow`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--current`,
        'flex-grow': '1'
      }
    }
  ]
] as Rule[]
