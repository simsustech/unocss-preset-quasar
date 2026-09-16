import type { Rule } from '@unocss/core'

export const fieldRules = [
  [
    /^q-field$/,
    function* () {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        position: 'relative'
      }
    }
  ],
  [
    /^q-field__control$/,
    function* (_, { symbols }) {
      // No background here: Quasar sets control backgrounds per variant
      // (filled). An unconditional fill paints outlined/standard controls
      // lavender (the broken control-panel look). Source: quasar.css.
      yield {
        display: 'flex',
        'align-items': 'center',
        position: 'relative',
        'border-radius': 'var(--q-radius-sm)',
        'min-height': '40px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'pointer-events': 'none',
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'pointer-events': 'none'
      }
    }
  ],
  [
    /^q-field__label$/,
    function* () {
      yield {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'all var(--q-duration-short) var(--q-easing-standard)',
        'pointer-events': 'none'
      }
    }
  ],
  [
    /^q-field__label--floating$/,
    function* () {
      yield { top: '8px', transform: 'translateY(0)', 'font-size': '0.75em' }
    }
  ],
  [
    /^q-field__native$/,
    function* () {
      yield {
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        padding: '16px 12px 8px'
      }
    }
  ],
  [
    /^q-field__bottom$/,
    function* () {
      yield {
        display: 'flex',
        'justify-content': 'space-between',
        'min-height': '20px',
        padding: '4px 12px 0'
      }
    }
  ],
  [
    /^q-field--filled$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel: string) => `${sel} .q-field__control`,
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:before`,
        background: 'rgba(0, 0, 0, 0.05)',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.42)',
        opacity: '0',
        transition:
          'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:hover:before`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:after`,
        height: '2px',
        top: 'auto',
        'transform-origin': 'center bottom',
        transform: 'scale3d(0, 1, 1)',
        background: 'currentColor',
        transition: 'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__control:before`,
        opacity: '1',
        background: 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__control:after`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark .q-field__control, ${sel}.q-field--dark .q-field__control:before`,
        background: 'rgba(255, 255, 255, 0.07)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__control:before`,
        background: 'rgba(255, 255, 255, 0.1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--readonly .q-field__control:before`,
        opacity: '1',
        background: 'transparent',
        'border-bottom-style': 'dashed'
      }
    }
  ],
  [
    /^q-field--outlined$/,
    function* (_, { symbols }) {
      yield {
        'background-color': 'transparent',
        border: '1px solid var(--q-outline)'
      }
      // Source: quasar.css `.q-field--outlined .q-field__control`.
      yield {
        [symbols.selector]: (sel: string) => `${sel} .q-field__control`,
        'border-radius': '4px',
        padding: '0 12px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:before`,
        border: '1px solid rgba(0, 0, 0, 0.24)',
        transition: 'border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:hover:before`,
        'border-color': '#000'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:after`,
        height: 'inherit',
        'border-radius': 'inherit',
        border: '2px solid transparent',
        transition: 'border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__control:hover:before`,
        'border-color': 'transparent'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__control:after`,
        'border-color': 'currentColor',
        'border-width': '2px',
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--readonly .q-field__control:before`,
        'border-style': 'dashed'
      }
    }
  ],
  [
    /^q-field--standard$/,
    function* (_, { symbols }) {
      yield { 'background-color': 'var(--q-surface-container-highest)' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:before`,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.24)',
        transition: 'border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:hover:before`,
        'border-color': '#000'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:after`,
        height: '2px',
        top: 'auto',
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit',
        'transform-origin': 'center bottom',
        transform: 'scale3d(0, 1, 1)',
        background: 'currentColor',
        transition: 'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__control:after`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--readonly .q-field__control:before`,
        'border-bottom-style': 'dashed'
      }
    }
  ],
  [
    /^q-field--dark$/,
    function* (_, { symbols }) {
      yield { 'background-color': 'var(--q-surface-variant)' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:before`,
        'border-color': 'rgba(255, 255, 255, 0.6)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:hover:before`,
        'border-color': '#fff'
      }
    }
  ],
  [
    /^q-field--dense$/,
    function* (_, { symbols }) {
      yield { 'min-height': '32px' }
      // Source: quasar.css `.q-field--dense .q-field__label`.
      yield {
        [symbols.selector]: (sel: string) => `${sel} .q-field__label`,
        'font-size': '14px',
        top: '10px'
      }
    }
  ],
  [
    /^q-field--labeled$/,
    function* (_, { symbols }) {
      // Source: quasar.css `.q-field--labeled .q-field__native, ...prefix, ...suffix`.
      yield {
        [symbols.selector]: (sel: string) =>
          `${sel} .q-field__native, ${sel} .q-field__prefix, ${sel} .q-field__suffix`,
        'line-height': '24px',
        'padding-top': '24px',
        'padding-bottom': '8px'
      }
    }
  ],
  [
    /^q-field--float$/,
    function* (_, { symbols }) {
      // Source: quasar.css `.q-field--float .q-field__label`.
      yield {
        [symbols.selector]: (sel: string) => `${sel} .q-field__label`,
        'max-width': '133%',
        transform: 'translateY(-40%) scale(0.75)',
        transition:
          'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.396s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  ],
  [
    /^q-field--focused$/,
    function* () {
      // Focus state handled by focus-helper
    }
  ],
  [
    /^q-field--error$/,
    function* () {
      yield { color: 'var(--q-error)' }
    }
  ],
  [
    /^q-field--disabled$/,
    function* () {
      yield { opacity: '0.6', cursor: 'not-allowed' }
    }
  ],
  [
    /^q-field--readonly$/,
    function* () {
      // Read-only state
    }
  ],
  [
    /^q-field--auto-height$/,
    function* () {
      yield { 'min-height': 'auto' }
    }
  ],
  [
    /^q-field--item-aligned$/,
    function* () {
      yield { 'align-items': 'center' }
    }
  ],
  [
    /^q-field--with-bottom$/,
    function* () {
      // Bottom section visible
    }
  ],
  [
    /^q-field--hide-bottom-space$/,
    function* () {
      // Bottom section hidden
    }
  ],
  [
    /^q-field--borderless$/,
    function* () {
      yield { border: 'none' }
    }
  ],
  [
    /^q-field--rounded$/,
    function* () {
      yield { 'border-radius': 'var(--q-radius-xl)' }
    }
  ],
  [
    /^q-field--square$/,
    function* () {
      yield { 'border-radius': '0' }
    }
  ],
  [
    /^q-field--standout$/,
    function* (_, { symbols }) {
      yield { 'background-color': 'var(--q-surface-container-highest)' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:before`,
        background: 'rgba(0, 0, 0, 0.07)',
        opacity: '0',
        transition:
          'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:hover:before`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--readonly .q-field__control:before`,
        opacity: '1',
        background: 'transparent',
        border: '1px dashed rgba(0, 0, 0, 0.24)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark .q-field__control:before`,
        background: 'rgba(255, 255, 255, 0.07)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--readonly .q-field__control:before`,
        'border-color': 'rgba(255, 255, 255, 0.24)'
      }
    }
  ],
  [
    /^q-field__marginal$/,
    function* (_, { symbols }) {
      yield {
        height: '56px',
        color: 'rgba(0, 0, 0, 0.54)',
        'font-size': '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > * + *`,
        'margin-left': '2px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-avatar`,
        'font-size': '32px'
      }
    }
  ],
  [
    /^q-field__before$/,
    function* () {
      yield { 'padding-right': '12px' }
    }
  ],
  [
    /^q-field__prepend$/,
    function* () {
      yield { 'padding-right': '12px' }
    }
  ],
  [
    /^q-field__after$/,
    function* (_, { symbols }) {
      yield { 'padding-left': '12px' }
      yield {
        [symbols.selector]: (sel) => `${sel}:empty`,
        display: 'none'
      }
    }
  ],
  [
    /^q-field__append$/,
    function* (_, { symbols }) {
      yield { 'padding-left': '12px' }
      yield {
        [symbols.selector]: (sel) => `${sel}:empty`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} + .q-field__append`,
        'padding-left': '2px'
      }
    }
  ],
  [
    /^q-field__inner$/,
    function* () {
      yield { 'text-align': 'left' }
    }
  ],
  [
    /^q-field__messages$/,
    function* (_, { symbols }) {
      yield { 'line-height': '1' }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'word-break': 'break-word',
        'word-wrap': 'break-word',
        'overflow-wrap': 'break-word'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div + div`,
        'margin-top': '4px'
      }
    }
  ],
  [
    /^q-field__counter$/,
    function* () {
      yield { 'padding-left': '8px', 'line-height': '1' }
    }
  ],
  [
    /^q-field__control-container$/,
    function* () {
      yield { height: 'inherit' }
    }
  ],
  [
    /^q-field__shadow$/,
    function* (_, { symbols }) {
      yield {
        top: '8px',
        opacity: '0',
        overflow: 'hidden',
        'white-space': 'pre-wrap',
        transition: 'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} + .q-field__native::placeholder`,
        transition: 'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} + .q-field__native:focus::placeholder`,
        opacity: '0'
      }
    }
  ],
  [
    /^q-field__prefix$/,
    function* () {
      yield {
        'font-weight': '400',
        'line-height': '28px',
        'letter-spacing': '0.00937em',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        border: 'none',
        'border-radius': '0',
        background: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        outline: '0',
        padding: '6px 0',
        transition: 'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
        'white-space': 'nowrap',
        'padding-right': '4px'
      }
    }
  ],
  [
    /^q-field__suffix$/,
    function* () {
      yield {
        'font-weight': '400',
        'line-height': '28px',
        'letter-spacing': '0.00937em',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        border: 'none',
        'border-radius': '0',
        background: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        outline: '0',
        padding: '6px 0',
        transition: 'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
        'white-space': 'nowrap',
        'padding-left': '4px'
      }
    }
  ],
  [
    /^q-field__input$/,
    function* (_, { symbols }) {
      yield {
        'font-weight': '400',
        'line-height': '24px',
        'letter-spacing': '0.00937em',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        border: 'none',
        'border-radius': '0',
        background: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        outline: '0 !important',
        padding: '0',
        width: '100%',
        'min-width': '0',
        'user-select': 'auto',
        '-webkit-user-select': 'auto',
        height: '0',
        'min-height': '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:autofill`,
        'animation-name': 'q-autofill',
        'animation-fill-mode': 'both'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:invalid`,
        'box-shadow': 'none'
      }
    }
  ],
  [
    /^q-field--highlighted$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__label`,
        color: 'currentColor'
      }
    }
  ],
  [
    /^q-field__focusable-action$/,
    function* (_, { symbols }) {
      yield {
        opacity: '0.6',
        cursor: 'pointer',
        outline: '0 !important',
        border: '0',
        color: 'inherit',
        background: 'transparent',
        padding: '0'
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
  ]
] as Rule[]
