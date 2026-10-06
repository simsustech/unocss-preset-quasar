import type { Rule } from '@unocss/core'

export const avatarRules = [
  [
    /^q-avatar$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'border-radius': 'var(--q-radius-circle)',
        overflow: 'hidden',
        'flex-shrink': 0,
        // 1em, not a fixed 40px: the reference sizes avatars as width/height 1em
        // so they scale with the font-size the context sets (48px standalone,
        // 40px in a list row, 38px in a toolbar).
        width: '1em',
        height: '1em',
        // Reference `.q-avatar { font-size: 48px; vertical-align: middle;
        // position: relative }`. The context rules that shrink the avatar are
        // separate selectors (`.q-item .q-avatar`, `.q-toolbar .q-avatar`) on both
        // sides, so the base value is the reference's literal.
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '48px',
        'vertical-align': 'middle',
        position: 'relative',
        'line-height': 1
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} img:not(.q-icon):not(.q-img__image)`,
        'border-radius': 'inherit',
        width: 'inherit',
        height: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        // Reference: `.q-avatar__content { font-size:0.5em; line-height:0.5em;
        // border-radius:inherit; height:inherit; width:inherit }`. Without the
        // 0.5em font-size the content inherits the avatar's own size (40px in a
        // list row), so the letter rendered enormous and clipped the circle.
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.5em',
        'line-height': '0.5em',
        'border-radius': 'inherit',
        width: 'inherit',
        height: 'inherit',
        'object-fit': 'cover'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        'font-size': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        // `var(--radius-none)` verbatim: the reference names the wind4 theme token,
        // and `components/date/rules.ts` already relies on the same variable.
        'border-radius': 'var(--radius-none)'
      }
    }
  ]
] as Rule[]
