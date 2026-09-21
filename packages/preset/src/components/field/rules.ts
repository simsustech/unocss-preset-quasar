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
      // Dark: control text colour.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
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
    function* (_, { symbols }) {
      yield {
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        padding: '16px 12px 8px'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: '#fff'
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
      // Dark: filled control bg + text colour.
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel} > .q-field__inner > .q-field__control`,
        color: 'var(--q-on-surface-variant)',
        'background-color': 'var(--q-surface-container-highest)'
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
      // Dark: standard control bg.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} .q-field__control`,
        'background-color': 'var(--q-surface-container-highest)'
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
          `${sel}.q-field--highlighted .q-field__control`,
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
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
      // Dark: marginal icon colour.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} > .q-icon`,
        color: 'var(--q-on-surface-variant)'
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
    function* (_, { symbols }) {
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
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: '#fff'
      }
    }
  ],
  [
    /^q-field__suffix$/,
    function* (_, { symbols }) {
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
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: '#fff'
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
      // Dark: input text colour.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: '#fff'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark .q-field--standout.q-field--dark.q-field--highlighted ${sel} > .q-btn-item`,
        color: 'var(--q-on-surface)'
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
  ],
  // ===========================================================================
  // Reference parity — MD3 type scale, field geometry and state colours
  // ===========================================================================
  // The reference states type roles through wind4 primitives
  // (`--fontWeight-normal` = 400, `--leading-none` = 1, `--leading-tight` = 1.25,
  // `--radius-none` = 0, `--un-tracking`). The preset has no type-token layer
  // yet, so the equivalent literals are used here; moving them into the style
  // entries is the token-model step's job.
  [
    /^q-field$/,
    function* (_, { symbols }) {
      yield { 'font-size': '14px' }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-field__control$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-primary)',
        'outline-style': 'none',
        display: 'flex',
        'flex-direction': 'row',
        width: '100%',
        height: '56px',
        'max-width': '100%'
      }
    }
  ],
  [
    /^q-field__label$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '16px',
        'line-height': '1.25',
        'letter-spacing': '0.00937em',
        'font-weight': '400',
        'max-width': '100%',
        'transform-origin': 'left top',
        color: 'var(--q-on-surface-variant)',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        transition:
          'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.324s cubic-bezier(0.4, 0, 0.2, 1)',
        'backface-visibility': 'hidden',
        left: '0',
        top: '18px'
      }
    }
  ],
  [
    /^q-field__native$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '16px',
        'line-height': '24px',
        'letter-spacing': '0.00937em',
        'font-weight': '400',
        'padding-inline': '0',
        'outline-style': 'none !important',
        'border-radius': '0',
        'border-style': 'none',
        'background-color': 'transparent',
        width: '100%',
        'min-width': '0',
        'user-select': 'auto',
        '-webkit-user-select': 'auto',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}[type='file']`,
        'line-height': '1em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:-webkit-autofill`,
        'margin-top': '1px',
        'margin-bottom': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}::placeholder`,
        color: 'transparent'
      }
    }
  ],
  [
    /^q-field__input$/,
    function* (_, { symbols }) {
      yield {
        'line-height': '24px',
        'letter-spacing': '0.00937em',
        'font-weight': '400',
        'padding-inline': '0',
        'padding-block': '6px',
        'outline-style': 'none !important',
        'border-radius': '0',
        'border-style': 'none',
        'background-color': 'transparent',
        'min-width': '0',
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:-webkit-autofill`,
        'margin-top': '1px',
        'margin-bottom': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}::placeholder`,
        color: 'transparent'
      }
    }
  ],
  [
    /^q-field__prefix$/,
    function* (_, { symbols }) {
      yield {
        'line-height': '28px',
        'letter-spacing': '0.00937em',
        'font-weight': '400',
        'padding-inline': '0',
        'padding-block': '6px',
        'padding-right': '4px',
        'outline-style': 'none',
        'border-radius': '0',
        'border-style': 'none',
        'background-color': 'transparent',
        'white-space': 'nowrap',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        color: 'var(--q-on-surface)',
        transition: 'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.q-field--auto-height.q-field--labeled ${sel}`,
        'padding-top': '0'
      }
    }
  ],
  [
    /^q-field__suffix$/,
    function* (_, { symbols }) {
      yield {
        'line-height': '28px',
        'letter-spacing': '0.00937em',
        'font-weight': '400',
        'padding-inline': '0',
        'padding-block': '6px',
        'padding-left': '4px',
        'outline-style': 'none',
        'border-radius': '0',
        'border-style': 'none',
        'background-color': 'transparent',
        'white-space': 'nowrap',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        color: 'var(--q-on-surface)',
        transition: 'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.q-field--auto-height.q-field--labeled ${sel}`,
        'padding-top': '0'
      }
    }
  ],
  [
    /^q-field__bottom$/,
    function* () {
      yield {
        'font-size': '12px',
        'line-height': '1',
        'margin-top': '4px',
        'padding-inline': '12px',
        'padding-bottom': '0',
        'background-color': 'transparent',
        color: 'var(--q-on-surface-variant)',
        'backface-visibility': 'hidden'
      }
    }
  ],
  [
    /^q-field__marginal$/,
    function* () {
      yield {
        'font-size': '24px',
        color: 'var(--q-on-surface-variant)'
      }
    }
  ],
  [
    /^q-field__after$/,
    function* () {
      yield { 'padding-left': '12px', flex: '0 1 auto' }
    }
  ],
  [
    /^q-field__append$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-icon`,
        color: 'var(--q-on-surface-variant)',
        cursor: 'pointer !important'
      }
    }
  ],
  [
    /^q-field__control-container$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-field--auto-height ${sel}`,
        'padding-top': '0'
      }
    }
  ],
  [
    /^q-field--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__bottom`,
        'font-size': '11px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__marginal .q-avatar`,
        'font-size': '24px'
      }
    }
  ],
  [
    /^q-field--auto-height$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__native`,
        'line-height': '18px',
        'min-height': '56px',
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__prefix`,
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__suffix`,
        'line-height': '18px'
      }
    }
  ],
  [
    /^q-field--item-aligned$/,
    function* () {
      yield { 'padding-inline': '16px', 'padding-block': '8px' }
    }
  ],
  [
    /^q-field--outlined$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        'padding-inline': '12px',
        'padding-block': '0',
        'border-radius': '4px'
      }
    }
  ],
  [
    /^q-field--standard$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        'padding-inline': '12px',
        'background-color': 'var(--q-surface-container-highest)',
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
    }
  ],
  [
    /^q-field--standout$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        'padding-inline': '12px',
        'padding-block': '0',
        'border-radius': '4px',
        'background-color': 'var(--q-surface-container-highest)',
        transition:
          'box-shadow 0.36s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__native`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__prefix`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__suffix`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__append`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__prepend`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--highlighted .q-field__input`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__native`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__prefix`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__suffix`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__append`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__prepend`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__input`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__input > .q-btn-item`,
        color: 'var(--q-on-surface)',
        'align-self': 'stretch'
      }
    }
  ],
  [
    /^q-field--filled$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-field__inner > .q-field__control`,
        color: 'var(--q-on-surface-variant)',
        'padding-inline': '16px',
        'padding-block': '0',
        'border-top-left-radius': '4px',
        'border-top-right-radius': '4px',
        'border-bottom-left-radius': '0px',
        'border-bottom-right-radius': '0px',
        'background-color': 'rgba(0, 0, 0, 0.05)'
      }
    }
  ],
  [
    /^q-field--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__native`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__prefix`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__suffix`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__input`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__bottom`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__marginal`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-field--highlighted) .q-field__label`,
        color: 'var(--q-on-surface-variant)'
      }
    }
  ],
  [
    /^q-field--error$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__bottom`,
        color: 'var(--q-negative)'
      }
      // The label shakes on error; `q-field-label` ships with the reference's
      // keyframes (motion step).
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__label`,
        animation: 'q-field-label 0.36s'
      }
    }
  ],
  [
    /^q-field--labeled$/,
    function* (_, { symbols }) {
      // Placeholders stay invisible until the label floats, so the two texts
      // never overlap.
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-field--float) .q-field__native::placeholder`,
        color: 'transparent'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-field--float) .q-field__input::placeholder`,
        color: 'transparent'
      }
    }
  ],
  // ===========================================================================
  // Reference parity — variant geometry, state layers and label offsets
  // ===========================================================================
  [
    /^q-field$/,
    function* (_, { symbols }) {
      // IE/Edge clear-button suppression (the reference scopes these to the
      // field root's descendants). Folded into `/^q-field$/` rather than given its
      // own overlapping regex: a rule whose regex also matches an earlier rule's
      // token shadows that whole group in UnoCSS.
      yield {
        [symbols.selector]: (sel) => `${sel} ::-ms-clear, ${sel} ::-ms-reveal`,
        display: 'none'
      }
    }
  ],
  [
    /^q-field__control-container$/,
    function* () {
      yield { height: 'inherit', 'flex-grow': '1000', 'align-items': 'center' }
    }
  ],
  [
    /^q-field__append$/,
    function* () {
      yield { 'padding-left': '12px', flex: '0 1 auto' }
    }
  ],
  [
    /^q-field__before$/,
    function* () {
      yield { 'padding-right': '12px', flex: '0 1 auto' }
    }
  ],
  [
    /^q-field__prepend$/,
    function* () {
      yield { 'padding-right': '12px', flex: '0 1 auto' }
    }
  ],
  [
    /^q-field--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        height: '40px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__shadow`,
        top: '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-field__append + .q-field__append`,
        'padding-left': '2px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field--with-bottom`,
        'padding-bottom': '19px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--float .q-field__label`,
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--labeled.q-field--dense .q-field__native`,
        'padding-top': '14px',
        'padding-bottom': '2px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--labeled.q-field--dense .q-field__prefix`,
        'padding-top': '14px',
        'padding-bottom': '2px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--labeled.q-field--dense .q-field__suffix`,
        'padding-top': '14px',
        'padding-bottom': '2px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-field__native + .q-field__label`,
        'font-size': '0.75em',
        transform: 'translateY(-40%) scale(0.75)'
      }
      for (const type of [
        'color',
        'date',
        'datetime-local',
        'month',
        'time',
        'week'
      ]) {
        yield {
          [symbols.selector]: (sel) =>
            `${sel} .q-field__native[type='${type}'] + .q-field__label`,
          scale: '0.75',
          transform: 'translateY(-40%)'
        }
        yield {
          [symbols.selector]: (sel) =>
            `${sel} .q-field__input[type='${type}'] + .q-field__label`,
          scale: '0.75',
          transform: 'translateY(-40%)'
        }
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-field__native:-webkit-autofill + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-field__input:-webkit-autofill + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
    }
  ],
  [
    /^q-field--auto-height$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        height: 'auto',
        'min-height': '56px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--labeled .q-field__control-container`,
        'padding-top': '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--labeled .q-field__native`,
        'padding-top': '0',
        'min-height': '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--dense .q-field__control`,
        'min-height': '40px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--dense .q-field__native`,
        'min-height': '40px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dense.q-field--labeled .q-field__native`,
        'min-height': '24px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dense.q-field--labeled .q-field__control-container`,
        'padding-top': '10px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__shadow`,
        top: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--dense .q-field__shadow`,
        top: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--labeled .q-field__shadow`,
        top: '24px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dense.q-field--labeled .q-field__shadow`,
        top: '14px'
      }
    }
  ],
  [
    /^q-field--highlighted$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__shadow`,
        opacity: '50%'
      }
    }
  ],
  [
    /^q-field--labeled$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__shadow`,
        top: '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-field--float) .q-field__prefix`,
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-field--float) .q-field__suffix`,
        opacity: '0%'
      }
    }
  ],
  [
    /^q-field--outlined$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:before`,
        'border-color': 'rgba(0, 0, 0, 0.24)',
        'border-style': 'solid',
        'border-width': '1px',
        transition: 'border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:after`,
        'border-color': 'transparent',
        'border-style': 'solid',
        height: 'inherit',
        'border-radius': 'inherit',
        'border-width': '2px',
        transition: 'border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--rounded .q-field__control`,
        'border-radius': '28px'
      }
      // Chrome's autofill paint is 1px taller than the control box.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__input:-webkit-autofill`,
        'margin-top': '1px',
        'margin-bottom': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__native:-webkit-autofill`,
        'margin-top': '1px',
        'margin-bottom': '1px'
      }
    }
  ],
  [
    /^q-field--standard$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:after`,
        'background-color': 'currentColor',
        height: '2px',
        'transform-origin': 'center bottom',
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit',
        transform: 'scale3d(0, 1, 1)',
        transition: 'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
        top: 'auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__bottom`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--dense .q-field__control`,
        'padding-left': '0',
        'padding-right': '0'
      }
    }
  ],
  [
    /^q-field--filled$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:before`,
        'background-color': 'rgba(0, 0, 0, 0.05)',
        opacity: '0%',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.42)',
        transition:
          'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:after`,
        'background-color': 'currentColor',
        height: '2px',
        'transform-origin': 'center bottom',
        transform: 'scale3d(0, 1, 1)',
        transition: 'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
        top: 'auto'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > * > .q-field--highlighted .q-field__control:before`,
        'background-color': 'rgba(0, 0, 0, 0.12)',
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--readonly .q-field__control:before`,
        'background-color': 'transparent',
        opacity: '100%',
        'border-bottom-style': 'dashed'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > * > .q-field--highlighted .q-field__control:after`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--rounded .q-field__control`,
        'border-top-left-radius': '28px',
        'border-top-right-radius': '28px',
        'border-bottom-left-radius': '0',
        'border-bottom-right-radius': '0'
      }
    }
  ],
  [
    /^q-field--standout$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control:before`,
        'background-color': 'rgba(0, 0, 0, 0.07)',
        opacity: '0%',
        transition:
          'opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--dark .q-field__control`,
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--highlighted .q-field__control`,
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark .q-field__control:before`,
        'background-color': 'rgba(255, 255, 255, 0.07)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--readonly .q-field__control:before`,
        'border-color': 'rgba(0, 0, 0, 0.24)',
        'border-style': 'dashed',
        'background-color': 'transparent',
        opacity: '100%',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--rounded .q-field__control`,
        'border-radius': '28px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dark.q-field--readonly .q-field__control:before`,
        'background-color': 'transparent',
        'border-style': 'dashed'
      }
    }
  ],
  [
    /^q-field--square$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        'border-radius': '0 !important'
      }
    }
  ],
  [
    /^q-field--borderless$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__bottom`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--dense .q-field__control`,
        'padding-left': '0',
        'padding-right': '0'
      }
    }
  ],
  [
    /^q-field--disabled$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__inner`,
        cursor: 'not-allowed'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-placeholder`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control > div`,
        'outline-color': 'transparent !important',
        opacity: '60% !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control > div *`,
        'outline-color': 'transparent !important'
      }
    }
  ],
  [
    /^q-field--readonly$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-placeholder`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--labeled .q-field__native`,
        cursor: 'default'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--labeled .q-field__input`,
        cursor: 'default'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--float .q-field__native`,
        cursor: 'text'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--float .q-field__input`,
        cursor: 'text'
      }
    }
  ],
  [
    /^q-field--item-aligned$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__before`,
        'min-width': '56px'
      }
    }
  ],
  [
    /^q-field__bottom$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}--animated`,
        left: '0',
        right: '0',
        bottom: '0',
        transition: 'color 0.3s, opacity 0.3s'
      }
    }
  ],
  [
    /^q-field__native$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:focus-visible`,
        'outline-style': 'none !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:invalid`,
        'outline-style': 'none !important',
        'box-shadow': 'none'
      }
      // Date/time/colour inputs need the floating label shifted rather than
      // scaled, because the control hides its own text until focused.
      for (const type of [
        'color',
        'date',
        'datetime-local',
        'month',
        'time',
        'week'
      ]) {
        yield {
          [symbols.selector]: (sel) =>
            `${sel}[type='${type}'] + .q-field__label`,
          scale: '0.75',
          transform: 'translateY(-40%)'
        }
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:-webkit-autofill + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
    }
  ],
  [
    /^q-field__input$/,
    function* (_, { symbols }) {
      for (const type of [
        'color',
        'date',
        'datetime-local',
        'month',
        'time',
        'week'
      ]) {
        yield {
          [symbols.selector]: (sel) =>
            `${sel}[type='${type}'] + .q-field__label`,
          scale: '0.75',
          transform: 'translateY(-40%)'
        }
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:-webkit-autofill + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
    }
  ]
] as Rule[]
