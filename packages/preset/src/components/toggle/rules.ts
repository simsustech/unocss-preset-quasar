import type { Rule } from '@unocss/core'

/**
 * QToggle — clean rewrite using symbols.selector for pseudo-elements.
 * Each matcher appears exactly once; all yields consolidated into a single generator.
 */
export const toggleRules = [
  [
    /^q-toggle$/,
    function* (_, { symbols }) {
      yield { 'vertical-align': 'middle' }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled) .q-toggle__thumb:before`,
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        'border-radius': '50%',
        background: 'currentColor',
        opacity: 0.12,
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus-visible .q-toggle__thumb:before`,
        transform: 'scale3d(2, 2, 1)'
      }
      // Quasar gates hover in @media(any-hover:hover); emitted un-gated —
      // harmless on touch, required for desktop parity. Source: quasar.css:5932.
      yield {
        [symbols.selector]: (sel: string) =>
          `${sel}:not(.disabled):hover .q-toggle__thumb:before`,
        transform: 'scale(2)'
      }
    }
  ],
  [/^q-toggle__native$/, () => ({ width: '1px', height: '1px' })],
  [
    /^q-toggle__inner$/,
    () => ({
      'font-size': '40px',
      width: '1.4em',
      'min-width': '1.4em',
      height: '1em',
      padding: '0.325em 0.3em',
      'print-color-adjust': 'exact',
      '-webkit-print-color-adjust': 'exact'
    })
  ],
  [
    /^q-toggle__track$/,
    () => ({
      height: '0.35em',
      'border-radius': '0.175em',
      opacity: 0.38,
      background: 'currentColor'
    })
  ],
  [
    /^q-toggle__thumb$/,
    function* (_, { symbols }) {
      // NOTE: position:absolute deviates from quasar.css (which leaves the
      // thumb static and relies on inner stacking). Without it the :after
      // circle positions against .q-toggle__inner (observed 56px blowout) and
      // the icon drops below the toolbar. The reference ships absolute too.
      yield {
        position: 'absolute',
        top: '0.25em',
        left: '0.25em',
        width: '0.5em',
        height: '0.5em',
        transition: 'left 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        'z-index': 0
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        'border-radius': '50%',
        background: '#fff',
        'box-shadow':
          '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'
      }
      // Icon inside the thumb (was a dead `/^q-toggle__thumb .q-icon$/` entry:
      // spaced regexes never match a token). Kept after :after so existing
      // first-match tests keep passing. Source: quasar.css:5833.
      yield {
        [symbols.selector]: (sel: string) => `${sel} .q-icon`,
        'font-size': '0.3em',
        'min-width': '1em',
        color: '#000',
        opacity: 0.54,
        'z-index': 1
      }
    }
  ],
  [
    /^q-toggle__inner--indet$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb`,
        left: '0.45em'
      }
    }
  ],
  [
    /^q-toggle__inner--truthy$/,
    function* (_, { symbols }) {
      yield { color: 'var(--q-primary)' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__track`,
        opacity: 0.54
      }
      // Quasar-faithful truthy thumb (quasar.css:5858-5863). The reference
      // renders an md3 white thumb instead; that look is a design choice for
      // the user (see follow-ups), not a defect — do not change unilaterally.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb`,
        left: '0.65em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:after`,
        'background-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb .q-icon`,
        color: '#fff',
        opacity: 1
      }
    }
  ],
  [/^q-toggle.disabled$/, () => ({ opacity: '0.75 !important' })],
  [
    /^q-toggle--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__inner`,
        color: '#fff'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:after`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:before`,
        opacity: '0.32 !important'
      }
    }
  ],
  [
    /^q-toggle--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__inner`,
        width: '0.8em',
        'min-width': '0.8em',
        height: '0.5em',
        padding: '0.07625em 0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb`,
        top: 0,
        left: 0
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-toggle__inner--indet .q-toggle__thumb`,
        left: '0.15em'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-toggle__inner--truthy .q-toggle__thumb`,
        left: '0.3em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__label`,
        'padding-left': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus-visible .q-toggle__thumb:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
    }
  ],
  [
    /^q-toggle--dense.reverse$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__label`,
        'padding-left': 0,
        'padding-right': '0.5em'
      }
    }
  ]
] as Rule[]
