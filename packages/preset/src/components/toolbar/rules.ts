import type { Rule } from '@unocss/core'

export const toolbarRules = [
  [
    /^q-toolbar$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        // Reference states the box model as logical longhands and a 50px track.
        'padding-inline': 'var(--q-space-md)',
        'padding-block': '0',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '50px',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector: string) => `${selector} .q-avatar`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '38px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inset`,
        // Reference `.q-toolbar--inset { padding-left: 58px }` (physical, as the
        // bundle states it).
        'padding-left': '58px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title`,
        // Reference `.q-toolbar__title`: title-large type scale, `flex: 0 1 auto`
        // so it shrinks instead of pushing the actions out.
        flex: '0 1 auto',
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '21px',
        'letter-spacing': '0.01em',
        'font-weight': 'var(--fontWeight-normal)',
        'padding-inline': 'var(--q-space-md)',
        'padding-block': '0',
        'min-width': '1px',
        'max-width': '100%',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}__title:first-child`,
        'padding-left': 0
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}__title:last-child`,
        'padding-right': 0
      }
    }
  ]
] as Rule[]
