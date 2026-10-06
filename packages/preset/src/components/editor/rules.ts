import type { Rule } from '@unocss/core'

export const editorRules = [
  [
    /^q-editor$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        // Reference states the border as longhands and a 4px corner. The colour
        // stays the `--q-*` token: the reference reaches it through
        // `color-mix(… var(--q-border-opacity) …)`, which the gate skips.
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'var(--q-outline)',
        'border-radius': 'var(--q-corner-extra-small)',
        'background-color': 'var(--q-surface)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q btn`,
        margin: '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-btn`,
        margin: '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}>div:first-child`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__content hr`,
        'background-color': 'rgba(255, 255, 255, 0.12)'
      }
      yield {
        // No spaces around `+`: the reference is minified and the parity
        // fixture compares selector strings literally.
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__toolbar-group+.q-editor__toolbar-group:before`,
        'background-color': 'rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__toolbar`,
        display: 'flex',
        'flex-wrap': 'wrap',
        gap: 'var(--q-space-xs)',
        padding: 'var(--q-space-sm)',
        // Reference states the divider as longhands plus a 32px track.
        'border-bottom-width': '1px',
        'border-bottom-style': 'solid',
        'border-color':
          'color-mix(in srgb, var(--colors-black, #000) 12%, transparent)',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '32px'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__toolbar`,
        'border-color': 'rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__toolbars`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        flex: '1',
        // Reference `.q-editor__content`: 10px padding, the outline reset as
        // longhands, and the inherited bottom border so the content box closes
        // the toolbar's divider.
        padding: '10px',
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
        'outline-width': '0px',
        'border-bottom-style': 'inherit',
        'background-color': 'var(--q-surface-container-highest)',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '10em',
        'max-width': '100%',
        overflow: 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content:empty:not(:focus):before`,
        content: 'attr(aria-placeholder)',
        opacity: '0.7',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content hr`,
        margin: '1px',
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
        'outline-width': '0px',
        'border-style': 'none',
        'background-color':
          'color-mix(in srgb, var(--colors-black, #000) 12%, transparent)',
        height: '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content pre`,
        'white-space': 'pre-wrap'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__content`,
        color: 'var(--q-on-surface-variant)',
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__btn`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__btn-group`,
        display: 'flex',
        gap: 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__btn--active`,
        'background-color': 'var(--q-primary)',
        color: 'var(--q-on-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__btn--disabled`,
        opacity: 0.5
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__btn--readonly`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__btn--selected`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__btn--unselected`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__toolbar-group`,
        // Reference `.q-editor__toolbar-group { margin-inline: 4px;
        // margin-block: calc(var(--spacing) * 0); position: relative }`.
        'margin-inline': '4px',
        'margin-block': 'calc(var(--spacing) * 0)',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__toolbar-group+${selector}__toolbar-group:before`,
        content: '""',
        position: 'absolute',
        left: '-4px',
        top: '4px',
        bottom: '4px',
        width: '1px',
        'background-color': 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__toolbar-group + ${selector}__toolbar-group:before`,
        'background-color': 'rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disabled`,
        'border-style': 'dashed'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__toolbars-container`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit',
        'max-width': '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__toolbars-container > div:first-child`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link-input`,
        color: 'inherit',
        'text-decoration': 'none',
        'text-transform': 'none',
        // Reference states the reset as longhands.
        'border-style': 'none',
        'border-radius': '0',
        'background-image': 'none',
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
        'outline-width': '0px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flat`,
        'border-width': '0px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--flat .q-editor__toolbar`,
        'border-width': '0px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-editor__toolbar-group`,
        display: 'flex',
        'align-items': 'center',
        'flex-wrap': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        color: 'var(--q-on-surface)',
        'border-color':
          'color-mix(in srgb, var(--colors-white, #fff) var(--q-border-opacity), transparent)',
        'background-color': 'var(--q-surface-container)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-editor__toolbar`,
        'border-color':
          'color-mix(in oklab, var(--colors-white, #fff) var(--q-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-editor__content hr`,
        'border-color':
          'color-mix(in oklab, var(--colors-white, #fff) var(--q-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-editor__toolbar-group+.q-editor__toolbar-group:before`,
        'border-color':
          'color-mix(in oklab, var(--colors-white, #fff) var(--q-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-editor__toolbar-group + .q-editor__toolbar-group:before`,
        'background-color': 'rgba(255, 255, 255, 0.28)'
      }
    }
  ]
] as Rule[]
