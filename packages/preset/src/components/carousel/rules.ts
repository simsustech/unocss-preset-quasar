import type { Rule } from '@unocss/core'

export const carouselRules = [
  [
    /^q-carousel$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
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
      zIndex: 6000
    })
  ],
  [
    /^q-carousel__slide$/,
    () => ({
      'min-height': '100%',
      'background-size': 'cover',
      'background-position': 'center'
    })
  ],
  [
    /^q-carousel__navigation$/,
    () => ({
      position: 'absolute',
      bottom: 'var(--q-space-sm)',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 'var(--q-space-xs)'
    })
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
      // Control
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
      yield { pointerEvents: 'none' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        fontSize: '28px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        pointerEvents: 'all'
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
        overflowX: 'auto',
        overflowY: 'hidden',
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
        overflowX: 'auto',
        overflowY: 'hidden',
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
        overflowX: 'hidden',
        overflowY: 'auto',
        left: '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-carousel__navigation-inner`,
        flexDirection: 'column'
      }
    }
  ],
  [
    /^q-carousel__navigation--right$/,
    function* (_, { symbols }) {
      yield {
        top: '16px',
        bottom: '16px',
        overflowX: 'hidden',
        overflowY: 'auto',
        right: '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-carousel__navigation-inner`,
        flexDirection: 'column'
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
        paddingTop: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        paddingTop: '60px'
      }
    }
  ],
  [
    /^q-carousel--arrows-vertical$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        paddingTop: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        paddingTop: '60px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        paddingBottom: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        paddingBottom: '60px'
      }
    }
  ],
  [
    /^q-carousel--navigation-bottom$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        paddingBottom: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        paddingBottom: '60px'
      }
    }
  ],
  [
    /^q-carousel--navigation-left$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        paddingLeft: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        paddingLeft: '60px'
      }
    }
  ],
  [
    /^q-carousel--arrows-horizontal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        paddingLeft: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        paddingLeft: '60px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        paddingRight: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        paddingRight: '60px'
      }
    }
  ],
  [
    /^q-carousel--navigation-right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-carousel--with-padding .q-carousel__slide`,
        paddingRight: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-carousel--padding`,
        paddingRight: '60px'
      }
    }
  ]
] as Rule[]
