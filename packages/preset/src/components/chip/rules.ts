import type { Rule } from '@unocss/core'

export const chipRules = [
  [
    /^q-chip$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        // Reference `.q-chip`: MD3 label-large type scale, `4px` block margin,
        // `12px` inline padding and a 32px track. Values are transcribed from
        // `specs/reference/raw/reference-bundle.css.txt`.
        // The chip label is the MD3 label-large role (500 14px/20px); the
        // shorthand also carries Roboto, and `--q-label-large` is style-forked,
        // so MD2 and `unstyled` get their own label-large.
        font: 'var(--q-label-large)',
        color:
          'color-mix(in oklab, var(--light-on-surface-variant) var(--q-text-opacity), transparent)',
        margin: '4px',
        'padding-inline': 'var(--q-space-md)',
        'padding-block': '0',
        'vertical-align': 'middle',
        'outline-style': 'solid',
        'outline-width': '1px',
        'outline-color':
          'color-mix(in oklab, var(--light-outline) var(--q-outline-opacity), transparent)',
        'border-radius': 'var(--shape-corner-small)',
        'background-color':
          'color-mix(in oklab, var(--light-surface-container-low) var(--q-bg-opacity), transparent)',
        flex: '0 1 auto',
        height: '32px',
        'max-width': '100%',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        color:
          'color-mix(in oklab, var(--dark-on-secondary-container) var(--q-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--dark-secondary-container) var(--q-bg-opacity), transparent)',
        'outline-color': 'var(--dark-outline)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-chip__icon',
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-avatar`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '2em',
        'margin-left': '-0.45em',
        'margin-right': '0.2em',
        'border-top-left-radius': '3px',
        'border-bottom-right-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-left-radius': '3px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        'border-radius': 'var(--shape-corner-small)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square .q-avatar`,
        'border-top-left-radius': '3px',
        'border-bottom-right-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-left-radius': '3px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-inline': '0.4em',
        'padding-block': '0',
        'border-radius': 'var(--shape-corner-medium)',
        height: '1.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-avatar`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.5em',
        'margin-left': '-0.27em',
        'margin-right': '0.1em',
        'border-radius': 'var(--shape-corner-medium)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-chip__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.25em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-chip__icon--left`,
        'margin-right': '0.195em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-chip__icon--remove`,
        'margin-right': '-0.25em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--selected`,
        'background-color': 'var(--q-primary)',
        color: 'var(--q-on-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--selected .q-avatar`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--removable`,
        'padding-right': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        // Dark roles, not the `--q-*` aliases: those follow the body class.
        'background-color': 'var(--dark-surface-container)',
        color:
          'color-mix(in oklab, var(--dark-on-surface) var(--q-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-chip__icon`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--outline`,
        'background-color': 'transparent',
        'border-color': 'currentColor',
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disabled`,
        opacity: 0.5,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.40625em',
        // Reference states the primary role through the colour-mix pair, so the
        // token stays the canonical name for the component while the resolved
        // value matches the reference.
        color:
          'color-mix(in oklab, var(--light-primary) var(--q-text-opacity), transparent)',
        margin: '-0.2em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__close`,
        cursor: 'pointer',
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.2em',
        opacity: 0.7,
        transition: 'opacity var(--q-duration-short) var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.25em',
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--colored .q-chip__icon`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--left`,
        'margin-right': '0.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--right`,
        'margin-left': '0.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--remove`,
        'margin-left': '0.1em',
        'margin-right': '-0.5em',
        opacity: '0.6',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--remove:hover`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--remove:focus`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.desktop ${selector}--clickable:focus`,
        'box-shadow':
          '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.desktop.body--dark ${selector}--clickable:focus`,
        'box-shadow':
          '0 1px 3px rgba(255, 255, 255, 0.2), 0 1px 1px rgba(255, 255, 255, 0.14), 0 2px 1px -1px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--clickable:focus-visible`,
        'box-shadow':
          '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)'
      }
    }
  ]
] as Rule[]
