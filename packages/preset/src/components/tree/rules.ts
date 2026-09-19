import type { Rule } from '@unocss/core'

export const treeRules = [
  [
    /^q-tree$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-tree--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-tree--dense$/,
    () => ({
      // Dense variant
    })
  ],
  [
    /^q-tree__node$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-xs)',
      padding: '2px 0'
    })
  ],
  [
    /^q-tree__node--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-tree__node--link$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  [
    /^q-tree__node--parent$/,
    () => ({
      // Parent node
    })
  ],
  [
    /^q-tree__node--child$/,
    () => ({
      // Child node
    })
  ],
  [
    /^q-tree__node--selected$/,
    () => ({
      'background-color': 'var(--q-primary-container)'
    })
  ],
  [
    /^q-tree__node-header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-xs)',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-tree__node-header--selected$/,
    () => ({
      'background-color': 'var(--q-primary-container)'
    })
  ],
  [
    /^q-tree__node-header--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-tree__node-header--link$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  [
    /^q-tree__node-header--toggle$/,
    () => ({
      // Toggle state
    })
  ],
  [
    /^q-tree__node-body$/,
    () => ({
      // Node body
    })
  ],
  [
    /^q-tree__arrow$/,
    () => ({
      width: '1em',
      height: '1em',
      transition: 'transform var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-tree__children$/,
    () => ({
      'padding-left': 'var(--q-space-md)'
    })
  ],
  [
    /^q-tree__node$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        content: '""',
        position: 'absolute',
        top: '-3px',
        bottom: '0',
        width: '2px',
        right: 'auto',
        left: '-13px',
        'border-left': '1px solid currentColor'
      }
    }
  ],
  [
    /^q-tree__node$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:last-child:after`,
        display: 'none'
      }
    }
  ],
  [
    /^q-tree__node-header$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        content: '""',
        position: 'absolute',
        top: '-3px',
        bottom: '50%',
        width: '31px',
        left: '-35px',
        'border-left': '1px solid currentColor',
        'border-bottom': '1px solid currentColor'
      }
    }
  ],
  [
    /^q-tree__node--parent$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-tree__node-header:before`,
        width: '15px',
        left: '-15px'
      }
    }
  ],
  [
    /^q-tree__node--parent$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-tree__node-collapsible > .q-tree__node-body:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        width: '2px',
        height: '100%',
        right: 'auto',
        left: '12px',
        'border-left': '1px solid currentColor',
        bottom: '50px'
      }
    }
  ],
  [
    /^q-tree$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-tree__node:after, ${sel} > .q-tree__node > .q-tree__node-header:before`,
        display: 'none'
      }
    }
  ],
  [
    /^q-tree--no-connectors$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node:after,`,
        display: 'none !important'
      }
    }
  ],
  [
    /^q-tree__vguide--line$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '-3px',
        left: '12px',
        'border-left': '1px solid currentColor'
      }
    }
  ],
  [
    /^q-tree__vguide--connector$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '50%',
        left: '12px',
        right: '-18px',
        'border-left': '1px solid currentColor',
        'border-bottom': '1px solid currentColor'
      }
    }
  ],
  [
    /^q-tree__vnode--parent$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__vguide--connector:after`,
        right: '-2px'
      }
    }
  ],
  [
    /^q-tree--virtual$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node-header:before`,
        display: 'none'
      }
    }
  ],
  [
    /^q-tree--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node:after`,
        top: '0',
        left: '-8px'
      }
    }
  ],
  [
    /^q-tree--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node-header:before`,
        top: '0',
        left: '-8px',
        width: '8px'
      }
    }
  ],
  [
    /^q-tree--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tree__node--child > .q-tree__node-header:before`,
        left: '-25px',
        width: '21px'
      }
    }
  ],
  [
    /^q-tree--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tree__node--parent > .q-tree__node-collapsible > .q-tree__node-body:after`,
        left: '8px'
      }
    }
  ],
  [
    /^q-tree--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__vguide--line:before`,
        left: '8px',
        bottom: '0'
      }
    }
  ],
  [
    /^q-tree--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__vguide--connector:after`,
        left: '8px',
        right: '-13px'
      }
    }
  ],
  [
    /^q-tree--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tree__vnode--parent .q-tree__vguide--connector:after`,
        right: '0'
      }
    }
  ],
  [
    /^q-tree__node-header-content$/,
    function* () {
      yield { color: '#000', transition: 'color 0.3s' }
    }
  ],
  [
    /^q-tree__icon$/,
    function* () {
      yield { 'font-size': '21px' }
    }
  ],
  [
    /^q-tree__img$/,
    function* () {
      yield { height: '42px', 'border-radius': '2px' }
    }
  ],
  [
    /^q-tree__avatar$/,
    function* () {
      yield {
        'border-radius': '50%',
        width: '28px',
        height: '28px'
      }
    }
  ],
  [
    /^q-tree__spinner$/,
    function* () {
      yield { 'font-size': '16px', 'margin-right': '4px' }
    }
  ],
  [
    /^q-tree__arrow--rotate$/,
    function* () {
      yield { transform: 'rotate3d(0, 0, 1, 90deg)' }
    }
  ],
  [
    /^q-tree__tickbox$/,
    function* () {
      yield { 'margin-right': '4px' }
    }
  ],
  [
    /^q-tree__vnode$/,
    function* () {
      yield { 'padding-bottom': '3px' }
    }
  ],
  [
    /^q-tree__vguide$/,
    function* () {
      yield {
        position: 'relative',
        flex: '0 0 25px',
        width: '25px'
      }
    }
  ]
] as Rule[]
