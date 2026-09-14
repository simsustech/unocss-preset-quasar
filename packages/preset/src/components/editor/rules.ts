import type { Rule } from '@unocss/core'

export const editorRules = [
  [
    /^q-editor$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      border: '1px solid var(--q-outline)',
      'border-radius': 'var(--q-radius-sm)'
    })
  ],
  [
    /^q-editor__toolbar$/,
    () => ({
      display: 'flex',
      'flex-wrap': 'wrap',
      gap: 'var(--q-space-xs)',
      padding: 'var(--q-space-sm)',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-editor__toolbars$/,
    () => ({
      // Toolbars
    })
  ],
  [
    /^q-editor__content$/,
    () => ({
      flex: '1',
      padding: 'var(--q-space-md)',
      'min-height': '100px',
      outline: 'none'
    })
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
    /^q-editor__content$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-editor__content:empty:not(:focus):before`,
        content: 'attr(aria-placeholder)',
        opacity: '0.7',
        'pointer-events': 'none'
      }
    }
  ],
  [
    /^q-editor__toolbar-group$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-editor__toolbar-group + .q-editor__toolbar-group:before`,
        content: '""',
        position: 'absolute',
        left: '-4px',
        top: '4px',
        bottom: '4px',
        width: '1px',
        background: 'rgba(0, 0, 0, 0.12)'
      }
    }
  ],
  [
    /^q-editor--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-editor--dark .q-editor__toolbar-group + .q-editor__toolbar-group:before`,
        background: 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-editor--disabled$/,
    function* () {
      yield { borderStyle: 'dashed' }
    }
  ],
  [
    /^q-editor__toolbars-container$/,
    function* (_, { symbols }) {
      yield {
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        maxWidth: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:first-child`,
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit'
      }
    }
  ],
  [
    /^q-editor__link-input$/,
    function* () {
      yield {
        color: 'inherit',
        textDecoration: 'none',
        textTransform: 'none',
        border: 'none',
        borderRadius: '0',
        background: 'none',
        outline: '0'
      }
    }
  ],
  [
    /^q-editor--flat$/,
    function* (_, { symbols }) {
      yield { border: '0' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-editor__toolbar`,
        border: '0'
      }
    }
  ],
  [
    /^q-editor--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-editor__toolbar-group`,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap'
      }
    }
  ]
] as Rule[]
