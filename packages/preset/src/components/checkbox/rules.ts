import type { Rule } from '@unocss/core'

export const checkboxRules = [
  [
    /^q-checkbox$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        cursor: 'pointer',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled) .q-checkbox__inner:before`,
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
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus-visible .q-checkbox__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
      for (const state of ['--truthy', '--indet']) {
        yield {
          [symbols.selector]: (sel) => `.body--dark ${sel}__inner${state}`,
          color: 'var(--q-primary)'
        }
        yield {
          [symbols.selector]: (sel) =>
            `.body--dark ${sel}--dark .q-checkbox__inner${state}`,
          color: 'var(--q-primary)'
        }
      }
      yield { 'vertical-align': 'middle' }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      // The reference's own bundle lost a leading `.` on these two nested
      // selectors; the corrected form is what Quasar's sheet ships.
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):hover .q-checkbox__inner:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        'border-radius': '12.5rem',
        'background-color': 'currentColor',
        opacity: '12%',
        transform: 'scale(1.2)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus .q-checkbox__inner:before`,
        transform: 'scale(1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled`,
        opacity: '75% !important'
      }
    }
  ],
  [
    /^q-checkbox__inner$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        width: '1em',
        height: '1em',
        border: '2px solid var(--q-outline)',
        'border-radius': 'var(--q-radius-xs)',
        transition: 'all var(--q-duration-short) var(--q-easing-standard)'
      }
      yield {
        'font-size': '36px',
        'margin-right': '2px',
        'border-radius': '50%',
        width: '1em',
        'min-width': '1em',
        height: '1em',
        color: 'var(--q-on-surface-variant)'
      }
    }
  ],
  [
    /^q-checkbox__inner--truthy$/,
    function* (_, { symbols }) {
      yield {
        'border-color': 'var(--q-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__bg`,
        'background-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} path`,
        'stroke-dashoffset': '0',
        transition: 'stroke-dashoffset 0.18s cubic-bezier(0.4, 0, 0.6, 1) 0ms'
      }
    }
  ],
  [
    /^q-checkbox__inner--indet$/,
    function* (_, { symbols }) {
      yield {
        'border-color': 'var(--q-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__indet`,
        rotate: '0',
        transform: 'scale(1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__bg`,
        'background-color': 'currentColor'
      }
    }
  ],
  [
    /^q-checkbox__icon$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-on-primary)',
        'font-size': '0.7em'
      }
      yield { 'font-size': '0.5em', color: 'currentColor' }
    }
  ],
  [
    /^q-checkbox__label$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-checkbox--dense$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '0.8em'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus-visible .q-checkbox__inner:before`,
        transform: 'scale3d(1.4, 1.4, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__inner`,
        width: '0.5em',
        'min-width': '0.5em',
        height: '0.5em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__label`,
        'padding-left': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.reverse .q-checkbox__label`,
        'padding-left': '0',
        'padding-right': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__bg`,
        width: '90%',
        height: '90%',
        left: '5%',
        top: '5%'
      }
    }
  ],
  [
    /^q-checkbox--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__inner:before`,
        opacity: '0.32 !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__inner`,
        color: 'rgba(255, 255, 255, 0.7)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-checkbox__inner--indet`,
        color: 'var(--q-primary)'
      }
    }
  ],
  [
    /^q-checkbox__bg$/,
    function* (_, { symbols }) {
      yield {
        'margin-left': '-2px',
        'margin-top': '-2px',
        'border-color': 'currentColor',
        'border-radius': '2px',
        'border-style': 'solid',
        width: '50%',
        height: '50%',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        'border-width': '2px',
        transition: 'background 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms',
        top: '25%',
        left: '25%'
      }
    }
  ],
  [
    /^q-checkbox__icon-container$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center'
      }
      yield { 'user-select': 'none', '-webkit-user-select': 'none' }
    }
  ],
  [
    /^q-checkbox__native$/,
    function* (_, { symbols }) {
      yield { width: '1px', height: '1px' }
    }
  ],
  [
    /^q-checkbox__svg$/,
    () => ({
      width: '1em',
      height: '1em'
    })
  ],
  [
    /^q-checkbox__truthy$/,
    function* (_, { symbols }) {
      yield {
        'stroke-width': '3.12px',
        'stroke-dashoffset': '29.78334',
        'stroke-dasharray': '29.78334',
        stroke: 'currentColor'
      }
    }
  ],
  [
    /^q-checkbox__indet$/,
    function* (_, { symbols }) {
      yield {
        fill: 'currentColor',
        'transform-origin': '50% 50%',
        transform: 'rotate(-280deg) scale(0)'
      }
      yield {
        'transform-origin': '50% 50%',
        rotate: '-280deg',
        fill: 'currentColor'
      }
    }
  ]
] as Rule[]
