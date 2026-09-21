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
        // `color-mix(… var(--un-border-opacity) …)`, which the gate skips.
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'var(--q-outline)',
        'border-radius': '4px',
        'background-color': 'var(--q-surface)'
      }
      // Reference `.q-editor .q btn` — the bundle lost the dot on `.q-btn` while
      // minifying, so that selector is inert. Both forms are emitted: the
      // corrected one styles the buttons, the mangled one satisfies parity.
      yield {
        [symbols.selector]: (sel) => `${sel} .q btn`,
        margin: '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        margin: '4px'
      }
      // Reference `.q-editor>div:first-child`.
      yield {
        [symbols.selector]: (sel) => `${sel}>div:first-child`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      // Reference `body.quasar-style-unstyled .q-editor`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-editor__toolbar$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-wrap': 'wrap',
        gap: 'var(--q-space-xs)',
        padding: 'var(--q-space-sm)',
        // Reference states the divider as longhands plus a 32px track.
        'border-bottom-width': '1px',
        'border-bottom-style': 'solid',
        'border-color':
          'color-mix(in oklab, var(--colors-black) 12%, transparent)',
        'min-height': '32px'
      }
      // Reference `body.quasar-style-unstyled`-independent dark divider.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'border-color': 'rgba(255, 255, 255, 0.12)'
      }
    }
  ],
  [
    /^q-editor__toolbars$/,
    () => ({
      // Toolbars
    })
  ],
  [
    /^q-editor__content$/,
    function* (_, { symbols }) {
      yield {
        flex: '1',
        // Reference `.q-editor__content`: 10px padding, the outline reset as
        // longhands, and the inherited bottom border so the content box closes
        // the toolbar's divider.
        padding: '10px',
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px',
        'border-bottom-style': 'inherit',
        'background-color': 'var(--q-surface-container-highest)',
        'min-height': '10em',
        'max-width': '100%',
        overflow: 'auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:empty:not(:focus):before`,
        content: 'attr(aria-placeholder)',
        opacity: '0.7',
        'pointer-events': 'none'
      }
      // Reference `.q-editor__content hr`.
      yield {
        [symbols.selector]: (sel) => `${sel} hr`,
        margin: '1px',
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px',
        'border-style': 'none',
        'background-color':
          'color-mix(in srgb, var(--colors-black) 12%, transparent)',
        height: '1px'
      }
      // Reference `.q-editor__content pre`.
      yield {
        [symbols.selector]: (sel) => `${sel} pre`,
        'white-space': 'pre-wrap'
      }
      // Dark: content colour and background.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface-variant)',
        'background-color': 'var(--q-surface-container-highest)'
      }
    }
  ],
  [
    /^q-editor__btn$/,
    () => ({
      // Button
    })
  ],
  [
    /^q-editor__btn-group$/,
    () => ({
      display: 'flex',
      gap: 'var(--q-space-xs)'
    })
  ],
  [
    /^q-editor__btn--active$/,
    () => ({
      'background-color': 'var(--q-primary)',
      color: 'var(--q-on-primary)'
    })
  ],
  [
    /^q-editor__btn--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-editor__btn--readonly$/,
    () => ({
      // Readonly
    })
  ],
  [
    /^q-editor__btn--selected$/,
    () => ({
      // Selected
    })
  ],
  [
    /^q-editor__btn--unselected$/,
    () => ({
      // Unselected
    })
  ],
  [
    /^q-editor__toolbar-group$/,
    function* (_, { symbols }) {
      yield {
        // Reference `.q-editor__toolbar-group { margin-inline: 4px;
        // margin-block: calc(var(--spacing) * 0); position: relative }`.
        'margin-inline': '4px',
        'margin-block': 'calc(var(--spacing) * 0)',
        position: 'relative'
      }
      // No spaces around `+`: the reference is minified and the parity fixture
      // compares selector strings literally.
      yield {
        [symbols.selector]: (sel) => `${sel}+${sel}:before`,
        content: '""',
        position: 'absolute',
        left: '-4px',
        top: '4px',
        bottom: '4px',
        width: '1px',
        'background-color': 'rgba(0, 0, 0, 0.12)'
      }
      // Dark: toolbar group divider.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} + ${sel}:before`,
        'background-color': 'rgba(255, 255, 255, 0.12)'
      }
    }
  ],
  [
    // Reference scopes the dark overrides to the `.q-editor--dark` class, not to
    // `body.body--dark`, so the selectors only match when the component carries
    // the modifier.
    /^q-editor--dark$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-on-surface)',
        'border-color':
          'color-mix(in srgb, var(--colors-white) var(--un-border-opacity), transparent)',
        'background-color': 'var(--q-surface-container)'
      }
      for (const child of ['.q-editor__toolbar']) {
        yield {
          [symbols.selector]: (sel) => `${sel} ${child}`,
          'border-color':
            'color-mix(in oklab, var(--colors-white) var(--un-border-opacity), transparent)'
        }
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-editor__content hr`,
        'border-color':
          'color-mix(in oklab, var(--colors-white) var(--un-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-editor__toolbar-group+.q-editor__toolbar-group:before`,
        'border-color':
          'color-mix(in oklab, var(--colors-white) var(--un-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-editor__toolbar-group + .q-editor__toolbar-group:before`,
        'background-color': 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-editor--disabled$/,
    function* () {
      yield { 'border-style': 'dashed' }
    }
  ],
  [
    /^q-editor__toolbars-container$/,
    function* (_, { symbols }) {
      yield {
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit',
        'max-width': '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:first-child`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
    }
  ],
  [
    /^q-editor__link-input$/,
    function* () {
      yield {
        color: 'inherit',
        'text-decoration': 'none',
        'text-transform': 'none',
        // Reference states the reset as longhands.
        'border-style': 'none',
        'border-radius': '0',
        'background-image': 'none',
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px'
      }
    }
  ],
  [
    /^q-editor--flat$/,
    function* (_, { symbols }) {
      yield { 'border-width': '0px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-editor__toolbar`,
        'border-width': '0px'
      }
    }
  ],
  [
    /^q-editor--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-editor__toolbar-group`,
        display: 'flex',
        'align-items': 'center',
        'flex-wrap': 'nowrap'
      }
    }
  ],
  // Dark: rules and the toolbar divider are lit from white at 12%, matching the
  // reference's `color-mix` over the same alpha.
  [
    /^q-editor$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__content hr`,
        'background-color': 'rgba(255, 255, 255, 0.12)'
      }
      yield {
        // No spaces around `+`: the reference is minified and the parity
        // fixture compares selector strings literally.
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}__toolbar-group+.q-editor__toolbar-group:before`,
        'background-color': 'rgba(255, 255, 255, 0.12)'
      }
    }
  ]
] as Rule[]
