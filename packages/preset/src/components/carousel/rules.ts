import type { Rule } from '@unocss/core'

export const carouselRules = [
  [
    /^q-carousel$/,
    function* (_, { symbols }) {
      // .q-carousel
      yield {
        position: 'relative',
        overflow: 'hidden',
        // Reference `.q-carousel { … height: 400px }` and its surface role.
        height: '400px',
        'background-color':
          'color-mix(in oklab, var(--light-surface) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-carousel--padding`,
        padding: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-carousel__thumbnail`,
        margin: '2px',
        'vertical-align': 'middle',
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'transparent',
        'border-radius': 'var(--q-corner-extra-small)',
        opacity: '70%',
        height: '50px',
        width: 'auto',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'opacity 0.3s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-carousel__thumbnail--active`,
        'border-color': 'currentColor',
        opacity: '100%',
        cursor: 'default'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-carousel__thumbnail:hover`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`
        // Dark mode
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--arrows`
        // Show arrows
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--navigation`
        // Show navigation
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--padding`,
        padding: 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical`
        // Vertical layout
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--fullscreen`,
        position: 'fixed',
        inset: 0,
        'z-index': 6000
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__slide`,
        'min-height': '100%',
        // Reference `.q-carousel__slide { background-position: 50%; height: 400px;
        // background-size: cover; background-repeat: no-repeat }`.
        'background-position': '50%',
        height: '400px',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation`,
        position: 'absolute',
        bottom: 'var(--q-space-sm)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation .q-btn`,
        'margin-inline': '4px',
        'margin-block': '6px',
        padding: '5px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation-icon`,
        width: '8px',
        height: '8px',
        'border-radius': '50%',
        'background-color': 'rgba(255, 255, 255, 0.5)',
        cursor: 'pointer',
        transition:
          'background-color var(--q-duration-short) var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__navigation-icon--active`,
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__next`,
        position: 'absolute',
        right: 'var(--q-space-sm)',
        top: '50%',
        transform: 'translateY(-50%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__prev`,
        position: 'absolute',
        left: 'var(--q-space-sm)',
        top: '50%',
        transform: 'translateY(-50%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__control`,
        // Reference `.q-carousel__control { color: color-mix(in oklab, #fff …) }`.
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__slides-container`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__arrow`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__arrow .q-icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '28px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__arrow .q-btn`,
        'pointer-events': 'all'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__prev-arrow--horizontal`,
        top: '16px',
        bottom: '16px',
        left: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__next-arrow--horizontal`,
        top: '16px',
        bottom: '16px',
        right: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__prev-arrow--vertical`,
        left: '16px',
        right: '16px',
        top: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__next-arrow--vertical`,
        left: '16px',
        right: '16px',
        bottom: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation--top`,
        left: '16px',
        right: '16px',
        'overflow-x': 'auto',
        'overflow-y': 'hidden',
        top: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation--bottom`,
        left: '16px',
        right: '16px',
        'overflow-x': 'auto',
        'overflow-y': 'hidden',
        bottom: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation--left`,
        top: '16px',
        bottom: '16px',
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        left: '16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__navigation--left > .q-carousel__navigation-inner`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation--right`,
        top: '16px',
        bottom: '16px',
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        right: '16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__navigation--right > .q-carousel__navigation-inner`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation-inner`,
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__navigation-icon--inactive`,
        opacity: '0.7'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--navigation-top.q-carousel--with-padding .q-carousel__slide`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--navigation-top .q-carousel--padding`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--arrows-vertical.q-carousel--with-padding .q-carousel__slide`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--arrows-vertical .q-carousel--padding`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--arrows-vertical.q-carousel--with-padding .q-carousel__slide`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--arrows-vertical .q-carousel--padding`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--navigation-bottom.q-carousel--with-padding .q-carousel__slide`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--navigation-bottom .q-carousel--padding`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--navigation-left.q-carousel--with-padding .q-carousel__slide`,
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--navigation-left .q-carousel--padding`,
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--arrows-horizontal.q-carousel--with-padding .q-carousel__slide`,
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--arrows-horizontal .q-carousel--padding`,
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--arrows-horizontal.q-carousel--with-padding .q-carousel__slide`,
        'padding-right': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--arrows-horizontal .q-carousel--padding`,
        'padding-right': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--navigation-right.q-carousel--with-padding .q-carousel__slide`,
        'padding-right': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--navigation-right .q-carousel--padding`,
        'padding-right': '60px'
      }
    }
  ]
] as Rule[]
