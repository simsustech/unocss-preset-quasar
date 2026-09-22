import type { Rule } from '@unocss/core'

export const chatRules = [
  [
    /^q-chat-message$/,
    function* (_, { symbols }) {
      // .q-chat-message
      yield {
        display: 'flex',
        'margin-bottom': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--sent`,
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--received`,
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__text`,
        'max-width': '70%',
        padding: 'var(--q-space-sm) var(--q-space-md)',
        'border-radius': 'var(--q-radius-md)',
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__name`,
        'font-size': 'var(--q-caption-font-size)',
        opacity: 0.7,
        'margin-bottom': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__stamp`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.7em',
        opacity: 0.6,
        'margin-top': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar`,
        'margin-right': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`
        // Label
      }
    }
  ]
] as Rule[]
