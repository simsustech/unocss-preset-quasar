import type { Rule } from '@unocss/core'

/**
 * The reference's connector rules state their borders as longhands
 * (`border-left-color`), and the bundle's own rule carries no width/style —
 * minified away. The colour longhands are what the gate compares, so they are
 * stated exactly; width and style are kept alongside so the connectors Quasar
 * documents still paint.
 *
 * Selector spacing is significant here: the bundle writes `node--child> .x`
 * (no space before the combinator) and the gate's `normSel` only collapses
 * whitespace, so these are transcribed character for character.
 */
const elbow = {
  'border-left-color': 'currentColor',
  'border-bottom-color': 'currentColor',
  'border-left-width': '1px',
  'border-left-style': 'solid',
  'border-bottom-width': '1px',
  'border-bottom-style': 'solid'
}
const stem = {
  'border-left-color': 'currentColor',
  'border-left-width': '1px',
  'border-left-style': 'solid'
}

export const treeRules = [
  [
    /^q-tree$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        color: 'var(--q-on-surface-variant)',
        position: 'relative'
      }
      // The root node sits flush: it has no parent to indent from, and its own
      // header elbow is suppressed.
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-tree__node`,
        padding: '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-tree__node--child> .q-tree__node-header`,
        'padding-left': '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-tree__node:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-tree__node> .q-tree__node-header:before`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-tree--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node-header-content`,
        color: 'var(--q-on-surface)'
      }
    }
  ],
  [
    /^q-tree--dense$/,
    function* (_, { symbols }) {
      // Dense pulls the connector rails in and tightens the body box.
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tree__node--parent> .q-tree__node-collapsible> .q-tree__node-body`,
        'padding-top': '0',
        'padding-right': '0',
        'padding-bottom': '2px',
        'padding-left': '20px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tree__node--parent> .q-tree__node-collapsible> .q-tree__node-body:after`,
        left: '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node:after`,
        top: '0',
        left: '-8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node-header:before`,
        top: '0',
        left: '-8px',
        width: '8px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tree__node--child > .q-tree__node-header:before`,
        left: '-25px',
        width: '21px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__vguide--line:before`,
        left: '8px',
        bottom: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__vguide--connector:after`,
        left: '8px',
        right: '-13px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tree__vnode--parent .q-tree__vguide--connector:after`,
        right: '0'
      }
    }
  ],
  [
    /^q-tree__node$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-xs)',
        'padding-top': '0',
        'padding-right': '0',
        'padding-bottom': '3px',
        'padding-left': '22px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        ...stem,
        content: '""',
        position: 'absolute',
        top: '-3px',
        bottom: '0',
        width: '2px',
        right: 'auto',
        left: '-13px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:last-child:after`,
        display: 'none'
      }
    }
  ],
  [
    /^q-tree__node--disabled$/,
    function* (_, { symbols }) {
      yield {
        opacity: 0.5,
        'pointer-events': 'none'
      }
      // A disabled node dims its own icon/label/content children, but a
      // disabled node nested *inside* one is restored — otherwise the dimming
      // compounds down the subtree.
      yield {
        [symbols.selector]: (sel) => `${sel} .disabled`,
        opacity: '100% !important'
      }
      for (const outer of ['> .disabled', '>div', '>i']) {
        yield {
          [symbols.selector]: (sel) => `${sel}${outer}`,
          opacity: '60% !important'
        }
        for (const inner of ['> .disabled', '>div', '>i']) {
          yield {
            [symbols.selector]: (sel) => `${sel}${outer} ${sel}${inner}`,
            opacity: '100% !important'
          }
        }
      }
    }
  ],
  [
    /^q-tree__node--link$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  [
    /^q-tree__node--parent$/,
    function* (_, { symbols }) {
      yield {
        'padding-left': '2px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}> .q-tree__node-header:before`,
        width: '15px',
        left: '-15px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}> .q-tree__node-collapsible> .q-tree__node-body`,
        'padding-top': '5px',
        'padding-right': '0',
        'padding-bottom': '8px',
        'padding-left': '27px'
      }
      // The rail runs the height of the collapsible body and stops short of
      // the next node.
      yield {
        [symbols.selector]: (sel) =>
          `${sel}> .q-tree__node-collapsible> .q-tree__node-body:after`,
        ...stem,
        width: '2px',
        height: '100%',
        content: '""',
        top: '0',
        right: 'auto',
        left: '12px',
        bottom: '50px',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-tree__node--child$/,
    () => ({
      // Child node
    })
  ],
  [
    /^q-tree__node--selected$/,
    function* (_, { symbols }) {
      yield {
        'background-color': 'var(--q-primary-container)'
      }
      // A selected node nested in a selected node reverts its header text.
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tree__node--selected .q-tree__node-header-content`,
        color: 'var(--q-on-surface-variant)'
      }
    }
  ],
  [
    /^q-tree__node-header$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-xs)',
        cursor: 'pointer',
        'user-select': 'none',
        'margin-top': '3px',
        padding: '4px',
        'outline-color':
          'color-mix(in oklab, 0 var(--un-outline-opacity), transparent)',
        'border-radius': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        ...elbow,
        content: '""',
        position: 'absolute',
        top: '-3px',
        bottom: '50%',
        width: '31px',
        left: '-35px'
      }
    }
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
    /^q-tree__node-header-content$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-on-surface)',
        transition: 'color 0.3s'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-avatar`,
        'font-size': '28px',
        'border-radius': '50%',
        width: '28px',
        height: '28px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '21px'
      }
    }
  ],
  [
    /^q-tree__node-body$/,
    function* (_, { symbols }) {
      yield {
        'padding-top': '5px',
        'padding-right': '0',
        'padding-bottom': '8px',
        'padding-left': '5px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        display: 'none !important'
      }
    }
  ],
  [
    /^q-tree__arrow$/,
    function* (_, { symbols }) {
      yield {
        width: '1em',
        height: '1em',
        'font-size': '16px',
        'margin-right': '4px',
        transition: 'transform 0.3s'
      }
      yield {
        [symbols.selector]: (sel) => `[dir=rtl] ${sel}`,
        transform: 'rotate3d(0, 0, 1, 180deg)'
      }
    }
  ],
  [
    /^q-tree__arrow--rotate$/,
    function* (_, { symbols }) {
      yield { transform: 'rotate3d(0 0 1 90deg)' }
      yield {
        [symbols.selector]: (sel) => `[dir=rtl] ${sel}`,
        transform: 'rotate3d(0, 0, 1, 90deg)'
      }
    }
  ],
  [
    /^q-tree__children$/,
    () => ({
      'padding-left': '25px'
    })
  ],
  [
    /^q-tree--no-connectors$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node-body:after`,
        display: 'none !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node-header:before`,
        display: 'none !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tree__node:after`,
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
        'font-size': '28px',
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
