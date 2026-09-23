import type { Rule } from '@unocss/core'

export const cardRules = [
  [
    /^q-card$/,
    function* (_, { symbols }) {
      // .q-card
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'vertical-align': 'top',
        padding: 'var(--q-space-lg)',
        'border-radius': 'var(--q-card-radius)',
        // The style token stays authoritative: the reference's own
        // `color-mix(… var(--light-surface-container-low) …)` is not compared by
        // the gate (`var(--q-bg-opacity)` is skipped), and md2/unstyled must
        // keep resolving through the token.
        'background-color': 'var(--q-card-surface)',
        'box-shadow': 'var(--q-elevation-level1)',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > div:not(.q--avoid-card-border)`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > div:nth-child(1 of :not(.q--avoid-card-border))`,
        'border-top': '0',
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > div:nth-last-child(1 of :not(.q--avoid-card-border))`,
        'border-bottom': '0',
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > img:not(.q--avoid-card-border)`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > img:nth-child(1 of :not(.q--avoid-card-border))`,
        'border-top': '0',
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > img:nth-last-child(1 of :not(.q--avoid-card-border))`,
        'border-bottom': '0',
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > div:not(.q--avoid-card-border)`,
        'border-left': '0',
        'border-right': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > img`,
        'border-color':
          'color-mix(in oklab, 0 var(--q-border-opacity), transparent)',
        width: '100%',
        'max-width': '100%',
        display: 'block'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}.disabled`,
        opacity: '38%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}:not(.disabled):focus`,
        'background-color':
          'color-mix(in oklab, var(--light-secondary) var(--q-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}:not(.disabled):hover`,
        'box-shadow': 'var(--q-elevation-level2)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'background-color': 'var(--q-surface-container-low)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-card--bordered',
        // `outline-variant`, not `outline`: the bordered edge is the faint role.
        'border-color': 'var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark .q-dialog__inner>${selector}`,
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}:not(.disabled):focus`,
        'background-color': 'var(--q-secondary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        // The component-level dark variant names the dark roles directly: the
        // `--q-*` aliases follow the *body* class, so using them here left a
        // `.q-card--dark` on a light body with light surfaces.
        'background-color': 'var(--dark-surface-container)',
        color:
          'color-mix(in oklab, var(--dark-on-surface) var(--q-text-opacity), transparent)',
        'border-color':
          'color-mix(in srgb, var(--colors-white, #fff) 28%, transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--horizontal`,
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section`,
        padding: 'var(--q-space-md)',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--vertical`,
        padding: 'var(--q-space-sm) var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--img`,
        display: 'block',
        'object-fit': 'cover'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-sm)',
        // Reference `.q-card__actions { padding: 8px }`.
        padding: '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--horizontal`,
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--vertical`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--align-start`,
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--align-center`,
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--align-end`,
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--align-between`,
        'justify-content': 'space-between'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--align-around`,
        'justify-content': 'space-around'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--align-evenly`,
        'justify-content': 'space-evenly'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--items-start`,
        'align-items': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--items-center`,
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--items-end`,
        'align-items': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--items-stretch`,
        'align-items': 'stretch'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--items-baseline`,
        'align-items': 'baseline'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-style': 'solid',
        'border-width': '1px',
        'border-color':
          'color-mix(in oklab, var(--light-outline-variant) var(--q-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--vert`,
        padding: '16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--horiz > div:not(.q--avoid-card-border)`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--horiz > img:not(.q--avoid-card-border)`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--horiz > div:nth-child(1 of :not(.q--avoid-card-border))`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--horiz > img:nth-child(1 of :not(.q--avoid-card-border))`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--horiz > div:nth-last-child(1 of :not(.q--avoid-card-border))`,
        'border-top-right-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--horiz > img:nth-last-child(1 of :not(.q--avoid-card-border))`,
        'border-top-right-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--horiz > div:not(.q--avoid-card-border)`,
        'border-top': '0',
        'border-bottom': '0',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--horiz > .q-btn-item + .q-btn-item`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--horiz > .q-btn-group + .q-btn-item`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--horiz > .q-btn-item + .q-btn-group`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--vert > .q-btn-item.q-btn--round`,
        'align-self': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--vert > .q-btn-item + .q-btn-item`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--vert > .q-btn-group + .q-btn-item`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--vert > .q-btn-item + .q-btn-group`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions--vert > .q-btn-group > .q-btn-item`,
        'flex-grow': '1'
      }
    }
  ]
] as Rule[]
