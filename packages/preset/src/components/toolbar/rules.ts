import type { Rule } from '@unocss/core'

export const toolbarRules = [
  [
    /^q-toolbar$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        // Reference states the box model as logical longhands and a 50px track.
        'padding-inline': '12px',
        'padding-block': '0',
        'min-height': '50px',
        position: 'relative'
      }
      // Source: quasar.css `.q-toolbar .q-avatar`.
      yield {
        [symbols.selector]: (sel: string) => `${sel} .q-avatar`,
        'font-size': '38px'
      }
      // Reference `body.quasar-style-unstyled .q-toolbar`.
      yield {
        [symbols.selector]: (sel: string) =>
          `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-toolbar--inset$/,
    () => ({
      // Reference `.q-toolbar--inset { padding-left: 58px }` (physical, as the
      // bundle states it).
      'padding-left': '58px'
    })
  ],
  [
    /^q-toolbar__title$/,
    // Single entry (duplicate matchers drop earlier ones). First/last-child
    // padding from quasar.css.
    function* (_, { symbols }) {
      yield {
        // Reference `.q-toolbar__title`: title-large type scale, `flex: 0 1 auto`
        // so it shrinks instead of pushing the actions out.
        flex: '0 1 auto',
        'font-size': '21px',
        'letter-spacing': '0.01em',
        'font-weight': 'var(--fontWeight-normal)',
        'padding-inline': '12px',
        'padding-block': '0',
        'min-width': '1px',
        'max-width': '100%',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}:first-child`,
        'padding-left': 0
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel}:last-child`,
        'padding-right': 0
      }
    }
  ]
] as Rule[]
