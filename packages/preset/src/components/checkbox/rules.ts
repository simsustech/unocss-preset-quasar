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
        [symbols.selector]: (selector) =>
          `${selector}:not(.disabled) .q-checkbox__inner:before`,
        content: '""',
        position: 'absolute',
        // quasar: 40dp is MD3's state layer; dist boxes it to the icon.
        width: '40px',
        height: '40px',
        top: '50%',
        left: '50%',
        translate: '-50% -50%',
        'border-radius': '50%',
        background: 'currentColor',
        opacity: '0.12',
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.disabled):focus-visible .q-checkbox__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}--dark .q-checkbox__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__inner--indet`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}--dark .q-checkbox__inner--indet`,
        color: 'var(--q-primary)'
      }
      yield { 'vertical-align': 'middle' }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.disabled):hover .q-checkbox__inner:before`,
        content: '""',
        position: 'absolute',
        // quasar: dist re-declares the insets here, but the base yield already
        // centers the 40dp layer (`top/left: 50%` + `translate: -50% -50%`).
        // With them the hover circle anchored on the inner's top-left corner.
        // quasar: this value is Quasar's own, not a forked token
        'border-radius': '12.5rem',
        'background-color': 'currentColor',
        opacity: '12%',
        transform: 'scale(1.2)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.disabled):focus .q-checkbox__inner:before`,
        transform: 'scale(1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}.disabled`,
        opacity: '75% !important'
      }
      // AUD-024 fold: one yield for `__inner` now. The layout, border and
      // transition the port added stay; the geometry dist states literally
      // (36px box, 2px gap, fully round) wins where the `--q-radius-xs` corner
      // used to lose the cascade anyway.
      yield {
        [symbols.selector]: (selector) => `${selector}__inner`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        border: '2px solid var(--q-outline)',
        transition: 'all var(--q-duration-short) var(--q-easing-standard)',
        // quasar: MD3's checkbox icon is 18dp. dist states 36px here — the
        // radio's shape at double the icon size — which the `1em` box below
        // then inherited.
        'font-size': '18px',
        'margin-right': '2px',
        // quasar: MD3's checkbox corner is 2dp; dist's 50% is the radio shape.
        'border-radius': '2px',
        width: '1em',
        'min-width': '1em',
        height: '1em',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--truthy`,
        'border-color': 'var(--q-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        // The check is drawn over the primary fill, so it takes that fill's
        // on-colour. `__bg` used to be filled with `currentColor` — the
        // inherited on-surface-variant — which painted a dark square over the
        // fill (the truthy state never changes `color`, only border and fill).
        [symbols.selector]: (selector) => `${selector}__inner--truthy path`,
        stroke: 'var(--q-on-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--indet path`,
        stroke: 'var(--q-on-primary)'
      }
      yield {
        // The glyph box fills the 18dp square. Quasar's dist insets it to the
        // middle 50% with its own 2px border, which is the tiny framed square
        // that showed through as the "glyph".
        // That inset's own `margin: -2px` is reset as well: left in place it
        // shifted the box 2px up-left and clipped the strokes into the border.
        [symbols.selector]: (selector) => `${selector} .q-checkbox__bg`,
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        margin: '0',
        border: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--truthy path`,
        'stroke-dashoffset': '0',
        transition: 'stroke-dashoffset 0.18s cubic-bezier(0.4, 0, 0.6, 1) 0ms'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--indet`,
        'border-color': 'var(--q-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__inner--indet .q-checkbox__indet`,
        rotate: '0',
        transform: 'scale(1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__inner--indet .q-checkbox__bg`,
        'background-color': 'currentColor'
      }
      // Two yields for the icon's size. The reference's single-class rule stays:
      // the parity ratchet keys on it (`checkbox missing: .q-checkbox__icon`).
      // The scoped twin carries the declaration that actually wins — `.q-icon`'s
      // tokenised `font-size: var(--q-comp-icon)` is emitted after both at the
      // same (0,1,0) specificity and blew the glyph up to 24px inside the 18px
      // box. quasar.css gets away with the single class because it orders
      // `.q-icon` first. Same pattern as `__bg` above.
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.5em',
        color: 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-checkbox__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        'margin-left': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.8em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense:not(.disabled):focus-visible .q-checkbox__inner:before`,
        transform: 'scale3d(1.4, 1.4, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-checkbox__inner`,
        width: '0.5em',
        'min-width': '0.5em',
        height: '0.5em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-checkbox__label`,
        'padding-left': '0.5em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense.reverse .q-checkbox__label`,
        'padding-left': '0',
        'padding-right': '0.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-checkbox__bg`,
        width: '90%',
        height: '90%',
        left: '5%',
        top: '5%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-checkbox__inner:before`,
        opacity: '0.32 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-checkbox__inner`,
        color: 'rgba(255, 255, 255, 0.7)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-checkbox__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-checkbox__inner--indet`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bg`,
        'margin-left': '-2px',
        'margin-top': '-2px',
        'border-color': 'currentColor',
        // quasar: this value is Quasar's own, not a forked token
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
      yield {
        [symbols.selector]: (selector) => `${selector}__icon-container`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon-container`,
        'user-select': 'none',
        '-webkit-user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__native`,
        width: '1px',
        height: '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__svg`,
        width: '1em',
        height: '1em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__truthy`,
        'stroke-width': '3.12px',
        'stroke-dashoffset': '29.78334',
        'stroke-dasharray': '29.78334',
        stroke: 'currentColor'
      }
      // AUD-024 fold: `__indet`'s single `transform: rotate(-280deg) scale(0)`
      // copy is gone — the longhands below state the same rotation. `scale(0)`
      // stays: it is the dash's hidden default, and the `--indet` state yield
      // cancels it with `transform: scale(1)`. Without it the dash paints over
      // the check in the truthy and the falsy state alike.
      yield {
        [symbols.selector]: (selector) => `${selector}__indet`,
        'transform-origin': '50% 50%',
        rotate: '-280deg',
        transform: 'scale(0)',
        fill: 'currentColor'
      }
    }
  ]
] as Rule[]
