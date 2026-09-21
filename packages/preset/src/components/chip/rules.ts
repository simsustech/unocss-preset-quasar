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
        'font-size': '14px',
        color:
          'color-mix(in oklab, var(--light-on-surface-variant) var(--un-text-opacity), transparent)',
        'line-height': '20px',
        'font-weight': '500',
        margin: '4px',
        'padding-inline': '12px',
        'padding-block': '0',
        'vertical-align': 'middle',
        'outline-style': 'solid',
        'outline-width': '1px',
        'outline-color':
          'color-mix(in oklab, var(--light-outline) var(--un-outline-opacity), transparent)',
        'border-radius': 'var(--shape-corner-small)',
        'background-color':
          'color-mix(in oklab, var(--light-surface-container-low) var(--un-bg-opacity), transparent)',
        flex: '0 1 auto',
        height: '32px',
        'max-width': '100%',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-secondary-container)',
        'outline-color': 'var(--q-outline)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-chip__icon',
        color: 'var(--q-primary)'
      }
      // Reference `.q-chip .q-avatar`: the avatar shrinks into the chip's
      // inline box and only keeps the two leading corners rounded.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-avatar`,
        'font-size': '2em',
        'margin-left': '-0.45em',
        'margin-right': '0.2em',
        'border-top-left-radius': '3px',
        'border-bottom-right-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-left-radius': '3px'
      }
      // Reference `body.quasar-style-unstyled .q-chip`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-chip--square$/,
    function* (_, { symbols }) {
      yield {
        'border-radius': 'var(--shape-corner-small)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-avatar`,
        'border-top-left-radius': '3px',
        'border-bottom-right-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-left-radius': '3px'
      }
    }
  ],
  [
    /^q-chip--dense$/,
    function* (_, { symbols }) {
      yield {
        'padding-inline': '0.4em',
        'padding-block': '0',
        'border-radius': 'var(--shape-corner-medium)',
        height: '1.5em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-avatar`,
        'font-size': '1.5em',
        'margin-left': '-0.27em',
        'margin-right': '0.1em',
        'border-radius': 'var(--shape-corner-medium)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-chip__icon`,
        'font-size': '1.25em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-chip__icon--left`,
        'margin-right': '0.195em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-chip__icon--remove`,
        'margin-right': '-0.25em'
      }
    }
  ],
  [
    /^q-chip--selected$/,
    function* (_, { symbols }) {
      yield {
        'background-color': 'var(--q-primary)',
        color: 'var(--q-on-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-avatar`,
        display: 'none'
      }
    }
  ],
  [
    /^q-chip--removable$/,
    () => ({
      'padding-right': '4px'
    })
  ],
  [
    /^q-chip--dark$/,
    function* (_, { symbols }) {
      yield {
        'background-color': 'var(--q-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-chip__icon`,
        color: 'inherit'
      }
    }
  ],
  [
    /^q-chip--outline$/,
    () => ({
      'background-color': 'transparent',
      'border-color': 'currentColor',
      'border-style': 'solid',
      'border-width': '1px'
    })
  ],
  [
    /^q-chip--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-chip__icon$/,
    () => ({
      'font-size': '1.40625em',
      // Reference states the primary role through the colour-mix pair, so the
      // token stays the canonical name for the component while the resolved
      // value matches the reference.
      color:
        'color-mix(in oklab, var(--light-primary) var(--un-text-opacity), transparent)',
      margin: '-0.2em'
    })
  ],
  [
    /^q-chip__close$/,
    () => ({
      cursor: 'pointer',
      'font-size': '1.2em',
      opacity: 0.7,
      transition: 'opacity var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-chip__content$/,
    () => ({
      'font-size': '1.25em',
      'white-space': 'nowrap'
    })
  ],
  [
    /^q-chip__label$/,
    () => ({
      // Label
    })
  ],
  [
    /^q-chip--colored$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-chip__icon`,
        color: 'inherit'
      }
    }
  ],
  [
    /^q-chip__icon--left$/,
    function* () {
      yield { 'margin-right': '0.5em' }
    }
  ],
  [
    /^q-chip__icon--right$/,
    function* () {
      yield { 'margin-left': '0.5em' }
    }
  ],
  [
    /^q-chip__icon--remove$/,
    function* (_, { symbols }) {
      yield {
        'margin-left': '0.1em',
        'margin-right': '-0.5em',
        opacity: '0.6',
        outline: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:hover`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus`,
        opacity: '1'
      }
    }
  ],
  [
    /^q-chip--clickable$/,
    function* (_, { symbols }) {
      // Reference scopes both focus elevations to `body.desktop`, with the dark
      // variant overriding the shadow colour rather than the shadow shape.
      yield {
        [symbols.selector]: (sel) => `body.desktop ${sel}:focus`,
        'box-shadow':
          '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `body.desktop.body--dark ${sel}:focus`,
        'box-shadow':
          '0 1px 3px rgba(255, 255, 255, 0.2), 0 1px 1px rgba(255, 255, 255, 0.14), 0 2px 1px -1px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus-visible`,
        'box-shadow':
          '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)'
      }
    }
  ]
] as Rule[]
