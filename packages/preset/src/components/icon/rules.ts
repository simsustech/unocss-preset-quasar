import type { Rule } from '@unocss/core'

export const iconRules = [
  [
    /^material-icons$/,
    function* (_, { symbols }) {
      // .material-icons
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
    function* (_, { symbols }) {
      // .material-icons-outlined
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
    function* (_, { symbols }) {
      // .material-icons-round
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
    function* (_, { symbols }) {
      // .material-icons-sharp
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
    function* (_, { symbols }) {
      // .material-symbols-outlined
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
    function* (_, { symbols }) {
      // .material-symbols-rounded
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
    function* (_, { symbols }) {
      // .material-symbols-sharp
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
    /^q-icon$/,
    function* (_, { symbols }) {
      // .q-icon
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        width: '1em',
        height: '1em',
        'font-size': 'var(--q-comp-icon)',
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
        [symbols.selector]: (selector) =>
          `${selector} > svg, ${selector} > img`,
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:before, ${selector}:after`,
        width: '100%',
        height: '100%',
        display: 'flex !important',
        'align-items': 'center',
        'justify-content': 'center'
      }
    }
  ]
] as Rule[]
