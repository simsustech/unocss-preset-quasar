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
      // .q-tree
      yield {
        display: 'flex',
        'flex-direction': 'column',
        color: 'var(--q-on-surface-variant)',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > .q-tree__node`,
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-tree__node--child> .q-tree__node-header`,
        'padding-left': '24px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > .q-tree__node:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-tree__node> .q-tree__node-header:before`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-tree__node-header-content`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-tree__node--parent> .q-tree__node-collapsible> .q-tree__node-body`,
        'padding-top': '0',
        'padding-right': '0',
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '2px',
        'padding-left': '20px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-tree__node--parent> .q-tree__node-collapsible> .q-tree__node-body:after`,
        left: '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-tree__node:after`,
        top: '0',
        left: '-8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-tree__node-header:before`,
        top: '0',
        left: '-8px',
        width: '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-tree__node--child > .q-tree__node-header:before`,
        left: '-25px',
        width: '21px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-tree__vguide--line:before`,
        left: '8px',
        bottom: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-tree__vguide--connector:after`,
        left: '8px',
        right: '-13px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-tree__vnode--parent .q-tree__vguide--connector:after`,
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node`,
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-xs)',
        'padding-top': '0',
        'padding-right': '0',
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '3px',
        'padding-left': '22px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node:after`,
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
        [symbols.selector]: (selector) => `${selector}__node:last-child:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node--disabled`,
        opacity: 0.5,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled .disabled`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled> .disabled`,
        opacity: '60% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled> .disabled ${selector}__node--disabled> .disabled`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled> .disabled ${selector}__node--disabled>div`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled> .disabled ${selector}__node--disabled>i`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node--disabled>div`,
        opacity: '60% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled>div ${selector}__node--disabled> .disabled`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled>div ${selector}__node--disabled>div`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled>div ${selector}__node--disabled>i`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node--disabled>i`,
        opacity: '60% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled>i ${selector}__node--disabled> .disabled`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled>i ${selector}__node--disabled>div`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--disabled>i ${selector}__node--disabled>i`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node--link`,
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node--parent`,
        'padding-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--parent> .q-tree__node-header:before`,
        width: '15px',
        left: '-15px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--parent> .q-tree__node-collapsible> .q-tree__node-body`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '5px',
        'padding-right': '0',
        'padding-bottom': 'var(--q-space-sm)',
        'padding-left': '27px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--parent> .q-tree__node-collapsible> .q-tree__node-body:after`,
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
      yield {
        [symbols.selector]: (selector) => `${selector}__node--child`
        // Child node
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node--selected`,
        'background-color': 'var(--q-primary-container)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node--selected .q-tree__node--selected .q-tree__node-header-content`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-header`,
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-xs)',
        cursor: 'pointer',
        'user-select': 'none',
        'margin-top': '3px',
        padding: '4px',
        'outline-color':
          'color-mix(in oklab, 0 var(--q-outline-opacity), transparent)',
        'border-radius': 'var(--q-corner-extra-small)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-header:before`,
        ...elbow,
        content: '""',
        position: 'absolute',
        top: '-3px',
        bottom: '50%',
        width: '31px',
        left: '-35px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-header--selected`,
        'background-color': 'var(--q-primary-container)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-header--disabled`,
        opacity: 0.5
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-header--link`,
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-header--toggle`
        // Toggle state
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-header-content`,
        color: 'var(--q-on-surface)',
        transition: 'color 0.3s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node-header-content .q-avatar`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '28px',
        'border-radius': '50%',
        width: '28px',
        height: '28px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__node-header-content .q-icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '21px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-body`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '5px',
        'padding-right': '0',
        'padding-bottom': 'var(--q-space-sm)',
        'padding-left': '5px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__node-body:after`,
        display: 'none !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__arrow`,
        width: '1em',
        height: '1em',
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '16px',
        'margin-right': '4px',
        transition: 'transform 0.3s'
      }
      yield {
        [symbols.selector]: (selector) => `[dir=rtl] ${selector}__arrow`,
        transform: 'rotate3d(0, 0, 1, 180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__arrow--rotate`,
        transform: 'rotate3d(0 0 1 90deg)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `[dir=rtl] ${selector}__arrow--rotate`,
        transform: 'rotate3d(0, 0, 1, 90deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__children`,
        'padding-left': '25px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--no-connectors .q-tree__node-body:after`,
        display: 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--no-connectors .q-tree__node-header:before`,
        display: 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--no-connectors .q-tree__node:after`,
        display: 'none !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__vguide--line:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '-3px',
        left: '12px',
        'border-left': '1px solid currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__vguide--connector:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '50%',
        left: '12px',
        right: '-18px',
        'border-left': '1px solid currentColor',
        'border-bottom': '1px solid currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__vnode--parent .q-tree__vguide--connector:after`,
        right: '-2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--virtual .q-tree__node-header:before`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '21px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__img`,
        height: '42px',
        // quasar: this value is Quasar's own, not a forked token
        'border-radius': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '28px',
        'border-radius': '50%',
        width: '28px',
        height: '28px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spinner`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '16px',
        'margin-right': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__tickbox`,
        'margin-right': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__vnode`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '3px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__vguide`,
        position: 'relative',
        flex: '0 0 25px',
        width: '25px'
      }
      // AUD-023 residue (specs/audit/DISPOSITION.md, the two `q-tree__vnode` rows):
      // dist styles a *virtual-scroll* family the runtime only adds when the tree
      // is virtual (`q-tree__vnode` plus `--parent/--child/--root`). The element
      // token never carries those classes, so each selector is stated whole from
      // the component token, verbatim from dist — including the dense/virtual
      // combinations, which dist writes separately.
      yield {
        // quasar: dist `.q-tree__vnode { padding-bottom: 3px }`
        [symbols.selector]: () => '.q-tree__vnode',
        'padding-bottom': '3px'
      }
      yield {
        // quasar: dist states the connector nudge for the virtual parent row.
        [symbols.selector]: () =>
          '.q-tree__vnode--parent .q-tree__vguide--connector:after',
        right: '-2px'
      }
      yield {
        // quasar: dist's virtual-scroll header indents.
        [symbols.selector]: () =>
          '.q-tree--virtual .q-tree__vnode--parent .q-tree__node-header',
        'padding-left': '6px'
      }
      yield {
        // quasar: dist's virtual-scroll body indent.
        [symbols.selector]: () =>
          '.q-tree--virtual .q-tree__vnode--parent .q-tree__node-body',
        'padding-left': '27px'
      }
      yield {
        // quasar: dist's virtual-scroll child indent.
        [symbols.selector]: () =>
          '.q-tree--virtual .q-tree__vnode--child .q-tree__node-header',
        'padding-left': '26px'
      }
      yield {
        // quasar: the two root rows dist states as doubled-up modifiers.
        [symbols.selector]: () =>
          '.q-tree--virtual .q-tree__vnode--root.q-tree__vnode--parent .q-tree__node-header',
        'padding-left': '4px'
      }
      yield {
        // quasar: root + child, 24px.
        [symbols.selector]: () =>
          '.q-tree--virtual .q-tree__vnode--root.q-tree__vnode--child .q-tree__node-header',
        'padding-left': '24px'
      }
      yield {
        // quasar: dense resets and re-indents the virtual rows.
        [symbols.selector]: () => '.q-tree--dense .q-tree__vnode',
        'padding-bottom': '0'
      }
      yield {
        // quasar: dense connector nudge.
        [symbols.selector]: () =>
          '.q-tree--dense .q-tree__vnode--parent .q-tree__vguide--connector:after',
        right: '0'
      }
      yield {
        // quasar: dense + virtual child indent.
        [symbols.selector]: () =>
          '.q-tree--dense.q-tree--virtual .q-tree__vnode--child .q-tree__node-header',
        'padding-left': '18px'
      }
      yield {
        // quasar: dense + virtual parent indent.
        [symbols.selector]: () =>
          '.q-tree--dense.q-tree--virtual .q-tree__vnode--parent .q-tree__node-header',
        'padding-left': '1px'
      }
      yield {
        // quasar: dense + virtual parent body indent.
        [symbols.selector]: () =>
          '.q-tree--dense.q-tree--virtual .q-tree__vnode--parent .q-tree__node-body',
        'padding-left': '20px'
      }
    }
  ]
] as Rule[]
