import type { Rule } from '@unocss/core'

export const toolbarRules = [
  [
    /^q-toolbar$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        padding: '0 var(--q-space-md)',
        'min-height': 'var(--q-toolbar-min-height)',
        position: 'relative'
      }
      // Source: quasar.css `.q-toolbar .q-avatar`.
      yield {
        [symbols.selector]: (sel: string) => `${sel} .q-avatar`,
        'font-size': '38px'
      }
    }
  ],
  [
    /^q-toolbar--inset$/,
    () => ({
      padding: '0 calc(var(--q-space-md) + 56px)'
    })
  ],
  [
    /^q-toolbar__title$/,
    // Single entry (duplicate matchers drop earlier ones). First/last-child
    // padding from quasar.css.
    function* (_, { symbols }) {
      yield {
        flex: '1',
        'font-size': '1.25em',
        'font-weight': 500,
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
