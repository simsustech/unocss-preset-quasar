import type { Rule } from '@unocss/core'

export const radioRules = [
  [
    /^q-radio$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        cursor: 'pointer',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled) .q-radio__inner:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'border-radius': '50%',
        background: 'currentColor',
        opacity: '0.12',
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus-visible .q-radio__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__inner`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__check`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}--dark .q-radio__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield { 'vertical-align': 'middle' }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled`,
        opacity: '75% !important'
      }
      // The halo grows out of the ring on hover/focus and only exists on
      // desktops (touch devices have no hover state).
      yield {
        [symbols.selector]: (sel) =>
          `body.desktop ${sel}:not(.disabled) .q-radio__inner:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'border-radius': '50%',
        background: 'currentColor',
        opacity: '0.12',
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms'
      }
      yield {
        [symbols.selector]: (sel) =>
          `body.desktop ${sel}:not(.disabled):hover .q-radio__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `body.desktop ${sel}:not(.disabled):focus .q-radio__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
    }
  ],
  [
    /^q-radio__inner$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        width: '1em',
        height: '1em',
        border: '2px solid var(--q-outline)',
        'border-radius': '50%',
        transition: 'all var(--q-duration-short) var(--q-easing-standard)'
      }
      yield {
        'font-size': '40px',
        color: 'var(--q-on-surface-variant)',
        'border-radius': '50%',
        width: '1em',
        'min-width': '1em',
        height: '1em'
      }
    }
  ],
  [
    /^q-radio__inner--truthy$/,
    () => ({
      'border-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-radio__inner--falsy$/,
    () => ({
      // Falsy state
    })
  ],
  [
    /^q-radio__label$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-radio--dense$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '0.8em'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus-visible .q-radio__inner:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
      // The halo grows further on dense radios, and the reference scopes these to
      // desktops only.
      yield {
        [symbols.selector]: (sel) =>
          `body.desktop ${sel}:not(.disabled):hover .q-radio__inner:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `body.desktop ${sel}:not(.disabled):focus .q-radio__inner:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-radio__inner`,
        width: '0.5em',
        'min-width': '0.5em',
        height: '0.5em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-radio__label`,
        'padding-left': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.reverse .q-radio__label`,
        'padding-left': '0',
        'padding-right': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-radio__bg`,
        width: '100%',
        height: '100%',
        left: '0',
        top: '0'
      }
    }
  ],
  [
    /^q-radio--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-radio__inner:before`,
        opacity: '0.32 !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-radio__inner`,
        color: 'rgba(255, 255, 255, 0.7)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-radio__inner--truthy`,
        color: 'var(--q-primary)'
      }
    }
  ],
  [
    /^q-radio__bg$/,
    function* (_, { symbols }) {
      yield {
        width: '50%',
        height: '50%',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        top: '25%',
        left: '25%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} path`,
        fill: 'currentColor'
      }
    }
  ],
  [
    /^q-radio__native$/,
    function* (_, { symbols }) {
      yield { width: '1px', height: '1px' }
    }
  ],
  [
    /^q-radio__icon$/,
    // The md3 radio is an outlined circle whose dot is drawn with
    // `currentColor`, inheriting the inner's primary; `on-primary` would make
    // the dot the same colour as the ring's interior, i.e. invisible. The
    // `0.6em`/`var(--q-on-primary)` pair this entry also carried was a wrong
    // guess that the literal copy used to hide.
    () => ({ 'font-size': '0.5em', color: 'currentColor' })
  ],
  [
    /^q-radio__icon-container$/,
    function* () {
      yield { 'user-select': 'none', '-webkit-user-select': 'none' }
    }
  ],
  [
    /^q-radio__check$/,
    function* (_, { symbols }) {
      yield {
        'transform-origin': '50% 50%',
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms'
      }
      yield {
        [symbols.selector]: (sel) => `.q-radio__inner--truthy ${sel}`,
        transform: 'scale3d(1, 1, 1)'
      }
    }
  ]
] as Rule[]
