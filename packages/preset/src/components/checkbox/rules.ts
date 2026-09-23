import type { Rule } from '@unocss/core'

export const checkboxRules = [
  [
    /^q-checkbox$/,
    function* (_, { symbols }) {
      // .q-checkbox
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
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.disabled):hover .q-checkbox__inner:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
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
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '36px',
        'margin-right': '2px',
        'border-radius': '50%',
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
        [symbols.selector]: (selector) =>
          `${selector}__inner--truthy .q-checkbox__bg`,
        'background-color': 'currentColor'
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
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.5em',
        color: 'currentColor'
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
      // AUD-024 fold: `__indet`'s `transform: rotate(...) scale(0)` copy is gone; the reference states the `rotate`/`scale` longhands the other yield declares.
      yield {
        [symbols.selector]: (selector) => `${selector}__indet`,
        'transform-origin': '50% 50%',
        rotate: '-280deg',
        fill: 'currentColor'
      }
    }
  ]
] as Rule[]
