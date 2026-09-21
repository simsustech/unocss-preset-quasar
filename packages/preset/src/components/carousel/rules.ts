import type { Rule } from '@unocss/core'

export const carouselRules = [
  [
    /^q-carousel$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        overflow: 'hidden',
        // Reference `.q-carousel { … height: 400px }` and its surface role.
        height: '400px',
        'background-color':
          'color-mix(in oklab, var(--light-surface) var(--un-bg-opacity), transparent)'
      }
      // Reference `.q-carousel .q-carousel--padding { padding: 16px }` — the
      // padding modifier is a *descendant* of the carousel in the bundle.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        padding: '16px'
      }
      // Reference `.q-carousel .q-carousel__thumbnail` family: the strip of
      // preview frames under the slides.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel__thumbnail`,
        margin: '2px',
        'vertical-align': 'middle',
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'transparent',
        'border-radius': '4px',
        opacity: '70%',
        height: '50px',
        width: 'auto',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'opacity 0.3s'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel__thumbnail--active`,
        'border-color': 'currentColor',
        opacity: '100%',
        cursor: 'default'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel__thumbnail:hover`,
        opacity: '100%'
      }
      // Reference `body.quasar-style-unstyled .q-carousel`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-carousel--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-carousel--arrows$/,
    () => ({
      // Show arrows
    })
  ],
  [
    /^q-carousel--navigation$/,
    () => ({
      // Show navigation
    })
  ],
  [
    /^q-carousel--padding$/,
    () => ({
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-carousel--vertical$/,
    () => ({
      // Vertical layout
    })
  ],
  [
    /^q-carousel--fullscreen$/,
    () => ({
      position: 'fixed',
      inset: 0,
      'z-index': 6000
    })
  ],
  [
    /^q-carousel__slide$/,
    () => ({
      'min-height': '100%',
      // Reference `.q-carousel__slide { background-position: 50%; height: 400px;
      // background-size: cover; background-repeat: no-repeat }`.
      'background-position': '50%',
      height: '400px',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    })
  ],
  [
    /^q-carousel__navigation$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        bottom: 'var(--q-space-sm)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'var(--q-space-xs)'
      }
      // Reference `.q-carousel__navigation .q-btn`.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        'margin-inline': '4px',
        'margin-block': '6px',
        padding: '5px'
      }
    }
  ],
  [
    /^q-carousel__navigation-icon$/,
    () => ({
      width: '8px',
      height: '8px',
      'border-radius': '50%',
      'background-color': 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      transition:
        'background-color var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-carousel__navigation-icon--active$/,
    () => ({
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-carousel__next$/,
    () => ({
      position: 'absolute',
      right: 'var(--q-space-sm)',
      top: '50%',
      transform: 'translateY(-50%)'
    })
  ],
  [
    /^q-carousel__prev$/,
    () => ({
      position: 'absolute',
      left: 'var(--q-space-sm)',
      top: '50%',
      transform: 'translateY(-50%)'
    })
  ],
  [
    /^q-carousel__control$/,
    () => ({
      // Reference `.q-carousel__control { color: color-mix(in oklab, #fff …) }`.
      color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)'
    })
  ],
  [
    /^q-carousel__slides-container$/,
    function* () {
      yield { height: '100%' }
    }
  ],
  [
    /^q-carousel__arrow$/,
    function* (_, { symbols }) {
      yield { 'pointer-events': 'none' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '28px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        'pointer-events': 'all'
      }
    }
  ],
  [
    /^q-carousel__prev-arrow--horizontal$/,
    function* () {
      yield {
        top: '16px',
        bottom: '16px',
        left: '16px'
      }
    }
  ],
  [
    /^q-carousel__next-arrow--horizontal$/,
    function* () {
      yield {
        top: '16px',
        bottom: '16px',
        right: '16px'
      }
    }
  ],
  [
    /^q-carousel__prev-arrow--vertical$/,
    function* () {
      yield {
        left: '16px',
        right: '16px',
        top: '16px'
      }
    }
  ],
  [
    /^q-carousel__next-arrow--vertical$/,
    function* () {
      yield {
        left: '16px',
        right: '16px',
        bottom: '16px'
      }
    }
  ],
  [
    /^q-carousel__navigation--top$/,
    function* () {
      yield {
        left: '16px',
        right: '16px',
        'overflow-x': 'auto',
        'overflow-y': 'hidden',
        top: '16px'
      }
    }
  ],
  [
    /^q-carousel__navigation--bottom$/,
    function* () {
      yield {
        left: '16px',
        right: '16px',
        'overflow-x': 'auto',
        'overflow-y': 'hidden',
        bottom: '16px'
      }
    }
  ],
  [
    /^q-carousel__navigation--left$/,
    function* (_, { symbols }) {
      yield {
        top: '16px',
        bottom: '16px',
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        left: '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-carousel__navigation-inner`,
        'flex-direction': 'column'
      }
    }
  ],
  [
    /^q-carousel__navigation--right$/,
    function* (_, { symbols }) {
      yield {
        top: '16px',
        bottom: '16px',
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        right: '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-carousel__navigation-inner`,
        'flex-direction': 'column'
      }
    }
  ],
  [
    /^q-carousel__navigation-inner$/,
    function* () {
      yield { flex: '1 1 auto' }
    }
  ],
  [
    /^q-carousel__navigation-icon--inactive$/,
    function* () {
      yield { opacity: '0.7' }
    }
  ],
  [
    /^q-carousel--navigation-top$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        'padding-top': '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        'padding-top': '60px'
      }
    }
  ],
  [
    /^q-carousel--arrows-vertical$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        'padding-top': '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        'padding-top': '60px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        'padding-bottom': '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        'padding-bottom': '60px'
      }
    }
  ],
  [
    /^q-carousel--navigation-bottom$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        'padding-bottom': '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        'padding-bottom': '60px'
      }
    }
  ],
  [
    /^q-carousel--navigation-left$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        'padding-left': '60px'
      }
    }
  ],
  [
    /^q-carousel--arrows-horizontal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        'padding-right': '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        'padding-right': '60px'
      }
    }
  ],
  [
    /^q-carousel--navigation-right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        'padding-right': '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        'padding-right': '60px'
      }
    }
  ]
] as Rule[]
