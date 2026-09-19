import type { Rule } from '@unocss/core'

/**
 * Message component.
 *
 * Quasar names these with hyphens (`.q-message-text--sent`), not BEM `__` — the
 * reference bundle confirms it — and every compound selector hangs off a plain
 * class token, so descendants and `:last-child` variants are emitted as scoped
 * `symbols.selector` yields from the token's own rule.
 *
 * The tail (`.q-message-text:last-child:before` and the `--sent`/`--received`
 * triangles) only applies to the last bubble in a group, which is why the
 * bubble radii differ per direction.
 */
export const messageRules: Rule[] = [
  [
    /^q-message$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        'margin-bottom': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:first-child .q-message-label`,
        'margin-top': '0'
      }
    }
  ],
  [
    /^q-message-name$/,
    function* (_, { symbols }) {
      yield {
        'font-weight': '500',
        'font-size': '14px',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--sent`,
        'text-align': 'right'
      }
    }
  ],
  [
    /^q-message-label$/,
    () => ({
      color: 'var(--q-on-surface-variant)',
      'font-size': '12px',
      'margin-block': '24px',
      'margin-inline': '0',
      'text-align': 'center'
    })
  ],
  [
    /^q-message-stamp$/,
    () => ({
      color: 'inherit',
      'font-size': '11px',
      'margin-top': '4px',
      opacity: '0.6',
      display: 'none'
    })
  ],
  [
    /^q-message-text$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        'line-height': '1.2',
        padding: '8px',
        'background-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} + .q-message-text`,
        'margin-top': '3px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:last-child`,
        'min-height': '48px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:last-child:before`,
        content: '""',
        position: 'absolute',
        bottom: '0',
        width: '0',
        height: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:last-child .q-message-stamp`,
        display: 'block'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--received:last-child:before`,
        right: '100%',
        'border-right': '0 solid transparent',
        'border-left': '8px solid transparent',
        'border-bottom': '8px solid currentColor'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--sent:last-child:before`,
        left: '100%',
        'border-left': '0 solid transparent',
        'border-right': '8px solid transparent',
        'border-bottom': '8px solid currentColor'
      }
    }
  ],
  [
    /^q-message-text--sent$/,
    () => ({
      color: 'var(--q-on-primary)',
      'background-color': 'var(--q-primary)',
      'border-top-left-radius': '4px',
      'border-top-right-radius': '4px',
      'border-bottom-left-radius': '4px',
      'border-bottom-right-radius': '0'
    })
  ],
  [
    /^q-message-text--received$/,
    () => ({
      color: 'var(--q-on-surface)',
      'background-color': 'var(--q-surface-container-high)',
      'border-top-left-radius': '4px',
      'border-top-right-radius': '4px',
      'border-bottom-left-radius': '0',
      'border-bottom-right-radius': '4px'
    })
  ],
  [
    /^q-message-text-content--sent$/,
    () => ({
      color: 'var(--q-on-primary)'
    })
  ],
  [
    /^q-message-text-content--received$/,
    () => ({
      color: 'var(--q-on-surface)'
    })
  ],
  [
    /^q-message-avatar$/,
    function* (_, { symbols }) {
      yield {
        'border-radius': '50%',
        width: '48px',
        height: '48px',
        'min-width': '48px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--sent`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--received`,
        'margin-right': '8px'
      }
    }
  ],
  [
    /^q-message-container--sent$/,
    () => ({
      'flex-direction': 'row-reverse'
    })
  ]
] as Rule[]
