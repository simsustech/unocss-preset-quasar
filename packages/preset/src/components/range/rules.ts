import type { Rule } from '@unocss/core'

export const rangeRules = [
  [
    /^q-range$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        height: '1.5em',
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track`,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        height: '4px',
        'background-color': 'var(--q-surface-container-highest)',
        'border-radius': 'var(--q-radius-full)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track-container`,
        position: 'relative',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__selection`,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        height: '4px',
        'background-color': 'var(--q-primary)',
        'border-radius': 'var(--q-radius-full)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__handle`,
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1.2em',
        height: '1.2em',
        'border-radius': '50%',
        'background-color': 'var(--q-primary)',
        border: '2px solid var(--q-surface)',
        cursor: 'grab'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__handle-container`,
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__hint`,
        position: 'absolute',
        top: '-1.5em',
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.75em',
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__hint-value`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--active`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--inactive`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marker-label-container`,
        position: 'relative',
        height: '1em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marker-labels`,
        display: 'flex',
        'justify-content': 'space-between'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__active`
      }
    }
  ]
] as Rule[]
