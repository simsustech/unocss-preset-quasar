import type { Rule } from '@unocss/core'

export const iconRules = [
  [
    // One matcher per regex: the file previously registered `/^q-icon$/` twice and
    // UnoCSS silently dropped the first entry's declarations.
    /^q-icon$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        width: '1em',
        height: '1em',
        'font-size': 'var(--q-size-icon)',
        // Reference declares the line box through the wind4 spacing step
        // (`calc(var(--spacing) * 1)` = 4px), not a unitless `1`.
        'line-height': 'calc(var(--spacing) * 1)',
        'letter-spacing': 'var(--tracking-normal)',
        'vertical-align': 'middle',
        'flex-shrink': 0,
        color: 'inherit',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        'white-space': 'nowrap',
        'overflow-wrap': 'normal',
        'word-break': 'normal',
        'text-transform': 'none',
        cursor: 'inherit',
        position: 'relative',
        overflow: 'visible'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before, ${sel}:after`,
        width: '100%',
        height: '100%',
        display: 'flex !important',
        'align-items': 'center',
        'justify-content': 'center'
      }
    }
  ],
  [
    /^material-icons$/,
    function* () {
      yield {
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'inherit',
        'font-size': 'inherit',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'vertical-align': 'middle'
      }
    }
  ],
  [
    /^material-icons-outlined$/,
    function* () {
      yield {
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'inherit',
        'font-size': 'inherit',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'vertical-align': 'middle'
      }
    }
  ],
  [
    /^material-icons-round$/,
    function* () {
      yield {
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'inherit',
        'font-size': 'inherit',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'vertical-align': 'middle'
      }
    }
  ],
  [
    /^material-icons-sharp$/,
    function* () {
      yield {
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'inherit',
        'font-size': 'inherit',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'vertical-align': 'middle'
      }
    }
  ],
  [
    /^material-symbols-outlined$/,
    function* () {
      yield {
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'inherit',
        'font-size': 'inherit',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'vertical-align': 'middle'
      }
    }
  ],
  [
    /^material-symbols-rounded$/,
    function* () {
      yield {
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'inherit',
        'font-size': 'inherit',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'vertical-align': 'middle'
      }
    }
  ],
  [
    /^material-symbols-sharp$/,
    function* () {
      yield {
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'inherit',
        'font-size': 'inherit',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'vertical-align': 'middle'
      }
    }
  ]
] as Rule[]
