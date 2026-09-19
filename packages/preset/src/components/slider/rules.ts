import type { Rule } from '@unocss/core'

export const sliderRules = [
  [
    /^q-slider$/,
    () => ({
      position: 'relative',
      height: '1.5em',
      cursor: 'pointer'
    })
  ],
  [
    /^q-slider--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-slider--dense$/,
    () => ({
      // Dense variant
    })
  ],
  [
    /^q-slider__track$/,
    () => ({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
      height: '4px',
      'background-color': 'var(--q-surface-container-highest)',
      'border-radius': 'var(--q-radius-full)'
    })
  ],
  [
    /^q-slider__track-container$/,
    () => ({
      position: 'relative',
      height: '100%'
    })
  ],
  [
    /^q-slider__selection$/,
    () => ({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '4px',
      'background-color': 'var(--q-primary)',
      'border-radius': 'var(--q-radius-full)'
    })
  ],
  [
    /^q-slider__handle$/,
    () => ({
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1.2em',
      height: '1.2em',
      'border-radius': '50%',
      'background-color': 'var(--q-primary)',
      border: '2px solid var(--q-surface)',
      cursor: 'grab'
    })
  ],
  [
    /^q-slider__handle-container$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-slider__hint$/,
    () => ({
      position: 'absolute',
      top: '-1.5em',
      'font-size': '0.75em',
      'white-space': 'nowrap'
    })
  ],
  [
    /^q-slider__hint-value$/,
    () => ({
      // Hint value
    })
  ],
  [
    /^q-slider__inner$/,
    () => ({
      // Inner
    })
  ],
  [
    /^q-slider__inner--active$/,
    () => ({
      // Active state
    })
  ],
  [
    /^q-slider__inner--inactive$/,
    () => ({
      // Inactive state
    })
  ],
  [
    /^q-slider__marker-label-container$/,
    () => ({
      position: 'relative',
      height: '1em'
    })
  ],
  [
    /^q-slider__marker-labels$/,
    () => ({
      display: 'flex',
      'justify-content': 'space-between'
    })
  ],
  [
    /^q-slider__active$/,
    () => ({
      // Active
    })
  ],
  [
    /^q-slider__markers$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        content: '""',
        position: 'absolute',
        background: 'currentColor'
      }
    }
  ],
  [
    /^q-slider__markers--h$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        height: '100%',
        width: '2px',
        top: '0',
        right: '0'
      }
    }
  ],
  [
    /^q-slider__markers--v$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        width: '100%',
        height: '2px',
        left: '0',
        bottom: '0'
      }
    }
  ],
  [
    /^q-slider__pin$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        content: '""',
        width: '0',
        height: '0',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-slider__pin--h$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'border-left': '6px solid transparent',
        'border-right': '6px solid transparent',
        left: '50%',
        transform: 'translateX(-50%)'
      }
    }
  ],
  [
    /^q-slider__pin--h-standard$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        bottom: '2px',
        'border-top': '6px solid currentColor'
      }
    }
  ],
  [
    /^q-slider__pin--h-switched$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        top: '2px',
        'border-bottom': '6px solid currentColor'
      }
    }
  ],
  [
    /^q-slider__pin--v$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        top: '50%',
        transform: 'translateY(-50%)',
        'border-top': '6px solid transparent',
        'border-bottom': '6px solid transparent'
      }
    }
  ],
  [
    /^q-slider__pin--v-standard$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        left: '2px',
        'border-right': '6px solid currentColor'
      }
    }
  ],
  [
    /^q-slider__pin--v-switched$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        right: '2px',
        'border-left': '6px solid currentColor'
      }
    }
  ],
  [
    /^q-slider--h$/,
    function* () {
      yield { width: '100%' }
    }
  ],
  [
    /^q-slider--v$/,
    function* () {
      yield { height: '200px' }
    }
  ],
  [
    /^q-slider--editable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__track-container`,
        cursor: 'grab'
      }
    }
  ],
  [
    /^q-slider__track-container--h$/,
    function* (_, { symbols }) {
      yield { width: '100%', padding: '12px 0' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__selection`,
        'will-change': 'width, left'
      }
    }
  ],
  [
    /^q-slider__track-container--v$/,
    function* (_, { symbols }) {
      yield { height: '100%', padding: '0 12px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__selection`,
        'will-change': 'height, top'
      }
    }
  ],
  [
    /^q-slider__marker-labels-container$/,
    function* () {
      yield {
        position: 'relative',
        width: '100%',
        height: '100%',
        'min-height': '24px',
        'min-width': '24px'
      }
    }
  ],
  [
    /^q-slider__marker-labels--h-standard$/,
    function* () {
      yield { top: '0' }
    }
  ],
  [
    /^q-slider__marker-labels--h-switched$/,
    function* () {
      yield { bottom: '0' }
    }
  ],
  [
    /^q-slider__marker-labels--h-ltr$/,
    function* () {
      yield { transform: 'translateX(-50%) /* rtl:ignore */' }
    }
  ],
  [
    /^q-slider__marker-labels--h-rtl$/,
    function* () {
      yield { transform: 'translateX(50%) /* rtl:ignore */' }
    }
  ],
  [
    /^q-slider__marker-labels--v-standard$/,
    function* () {
      yield { left: '4px' }
    }
  ],
  [
    /^q-slider__marker-labels--v-switched$/,
    function* () {
      yield { right: '4px' }
    }
  ],
  [
    /^q-slider__marker-labels--v-ltr$/,
    function* () {
      yield { transform: 'translateY(-50%) /* rtl:ignore */' }
    }
  ],
  [
    /^q-slider__marker-labels--v-rtl$/,
    function* () {
      yield { transform: 'translateY(50%) /* rtl:ignore */' }
    }
  ],
  [
    /^q-slider__thumb$/,
    function* (_, { symbols }) {
      yield {
        'z-index': '1',
        outline: '0',
        color: 'var(--q-primary)',
        transition:
          'transform 0.18s ease-out, fill 0.18s ease-out, stroke 0.18s ease-out'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-slider--focus`,
        opacity: '1 !important'
      }
    }
  ],
  [
    /^q-slider__thumb--h$/,
    function* () {
      yield { top: '50%', 'will-change': 'left' }
    }
  ],
  [
    /^q-slider__thumb--h-ltr$/,
    function* () {
      yield { transform: 'scale(1) translate(-50%, -50%) /* rtl:ignore */' }
    }
  ],
  [
    /^q-slider__thumb--h-rtl$/,
    function* () {
      yield { transform: 'scale(1) translate(50%, -50%) /* rtl:ignore */' }
    }
  ],
  [
    /^q-slider__thumb--v$/,
    function* () {
      yield { left: '50% /* rtl:ignore */', 'will-change': 'top' }
    }
  ],
  [
    /^q-slider__thumb--v-ltr$/,
    function* () {
      yield { transform: 'scale(1) translate(-50%, -50%) /* rtl:ignore */' }
    }
  ],
  [
    /^q-slider__thumb--v-rtl$/,
    function* () {
      yield { transform: 'scale(1) translate(-50%, 50%) /* rtl:ignore */' }
    }
  ],
  [
    /^q-slider__thumb-shape$/,
    function* (_, { symbols }) {
      yield {
        top: '0',
        left: '0',
        'stroke-width': '3.5',
        stroke: 'currentColor',
        transition: 'transform 0.28s'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} path`,
        stroke: 'currentColor',
        fill: 'currentColor'
      }
    }
  ],
  [
    /^q-slider__focus-ring$/,
    function* () {
      yield {
        'border-radius': '50%',
        opacity: '0',
        transition:
          'transform 266.67ms ease-out, opacity 266.67ms ease-out, background-color 266.67ms ease-out',
        'transition-delay': '0.14s'
      }
    }
  ],
  [
    /^q-slider__label$/,
    function* () {
      yield {
        'z-index': '1',
        'white-space': 'nowrap',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-slider__label--h$/,
    function* () {
      yield { left: '50%', transform: 'translateX(-50%)' }
    }
  ],
  [
    /^q-slider__label--h-standard$/,
    function* () {
      yield { bottom: '7px' }
    }
  ],
  [
    /^q-slider__label--h-switched$/,
    function* () {
      yield { top: '7px' }
    }
  ],
  [
    /^q-slider__label--v$/,
    function* () {
      yield { top: '50%', transform: 'translateY(-50%)' }
    }
  ],
  [
    /^q-slider__label--v-standard$/,
    function* () {
      yield { left: '7px' }
    }
  ],
  [
    /^q-slider__label--v-switched$/,
    function* () {
      yield { right: '7px' }
    }
  ],
  [
    /^q-slider__text-container$/,
    function* () {
      yield {
        'min-height': '25px',
        padding: '2px 8px',
        'border-radius': '4px',
        background: 'currentColor',
        position: 'relative',
        'text-align': 'center'
      }
    }
  ],
  [
    /^q-slider__text$/,
    function* () {
      yield { color: '#fff', 'font-size': '12px' }
    }
  ],
  [
    /^q-slider--no-value$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__thumb`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__inner`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__selection`,
        opacity: '0'
      }
    }
  ],
  [
    /^q-slider--focus$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__focus-ring`,
        background: 'currentColor',
        transform: 'scale3d(1.55, 1.55, 1)',
        opacity: '0.25'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__thumb`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__inner`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__selection`,
        opacity: '1'
      }
    }
  ],
  [
    /^q-slider--inactive$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__thumb--h`,
        transition: 'left 0.28s, right 0.28s'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__thumb--v`,
        transition: 'top 0.28s, bottom 0.28s'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__selection`,
        transition:
          'width 0.28s, left 0.28s, right 0.28s, height 0.28s, top 0.28s, bottom 0.28s'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__text-container`,
        transition: 'transform 0.28s'
      }
    }
  ],
  [
    /^q-slider--active$/,
    function* (_, { symbols }) {
      yield { cursor: 'grabbing' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__thumb-shape`,
        transform: 'scale(1.5)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__focus-ring`,
        transform: 'scale(0) !important'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-slider--label .q-slider__thumb-shape`,
        transform: 'scale(0) !important'
      }
    }
  ],
  [
    /^q-slider--label$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}.q-slider--active .q-slider__pin`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider--focus .q-slider__pin`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-slider--label-always .q-slider__pin`,
        opacity: '1'
      }
    }
  ],
  // Dark: thumb and track take primary over the secondary container.
  [
    /^q-slider$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__thumb`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__track`,
        color: 'var(--q-primary)',
        'background-color': 'var(--q-secondary-container)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__inner`,
        'background-color': 'var(--q-secondary-container)'
      }
    }
  ]
] as Rule[]
