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
    function* (_, { symbols }) {
      // The reference ships no dense rules for the slider root itself, only the
      // tighter track-container padding.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__track-container--h`,
        'padding-inline': '0',
        'padding-block': '6px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__track-container--v`,
        'padding-inline': '6px',
        'padding-block': '0'
      }
    }
  ],
  [
    /^q-slider__track$/,
    function* (_, { symbols }) {
      // Sizing is inherited from the track container and painted by __inner /
      // __selection, which fill it completely — the reference does not position
      // the track itself.
      yield {
        color: 'var(--q-primary)',
        'border-radius': '4px',
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) 30%, transparent)',
        width: 'inherit',
        height: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)',
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) 30%, transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--dark ${sel}`,
        'background-color': 'rgba(255, 255, 255, 0.1)'
      }
    }
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
      'background-color': 'currentColor',
      width: '100%',
      height: '100%',
      'border-radius': 'inherit'
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
      position: 'absolute'
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
        'background-color': 'currentColor'
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
        'will-change': 'left'
      }
    }
  ],
  [
    /^q-slider__track-container--v$/,
    function* (_, { symbols }) {
      yield { height: '100%', padding: '0 12px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__selection`,
        'will-change': 'top'
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
        'outline-width': '0px',
        'outline-style': 'solid',
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
        'transition-delay': '140ms'
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
  ],
  // --- Reference parity: the parts of the sheet the port had not reached yet ---
  [
    /^q-slider$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-slider__inner$/,
    function* (_, { symbols }) {
      yield {
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) 30%, transparent)',
        width: '100%',
        height: '100%',
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) 30%, transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--dark ${sel}`,
        'background-color': 'rgba(255, 255, 255, 0.1)'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--focus ${sel}`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--no-value ${sel}`,
        opacity: '0%'
      }
    }
  ],
  [
    /^q-slider__track-container$/,
    function* () {
      yield { 'outline-style': 'solid', 'outline-width': '0px' }
    }
  ],
  [
    /^q-slider__track-container--h$/,
    function* () {
      yield { 'padding-inline': '0', 'padding-block': '12px' }
    }
  ],
  [
    /^q-slider__track-container--v$/,
    function* () {
      yield { 'padding-inline': '12px', 'padding-block': '0' }
    }
  ],
  [
    /^q-slider__text-container$/,
    () => ({
      'padding-inline': '8px',
      'padding-block': '2px',
      'text-align': 'center',
      'border-radius': '4px',
      'background-color': 'currentColor',
      'min-height': '25px',
      position: 'relative'
    })
  ],
  [
    /^q-slider__markers$/,
    function* (_, { symbols }) {
      yield {
        width: '100%',
        height: '100%',
        color: 'var(--q-on-surface-variant)',
        'border-radius': 'inherit'
      }
    }
  ],
  [
    /^q-slider__markers--h$/,
    function* () {
      yield {
        'background-color':
          'color-mix(in oklab, repeating-linear-gradient(to right, currentColor, currentColor 2px, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0)), transparent)'
      }
    }
  ],
  [
    /^q-slider__markers--v$/,
    function* () {
      yield {
        'background-color':
          'color-mix(in oklab, repeating-linear-gradient(to bottom, currentColor, currentColor 2px, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0)), transparent)'
      }
    }
  ],
  [
    /^q-slider--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__markers`,
        color: 'rgba(255, 255, 255, 0.3)'
      }
    }
  ],
  [
    /^q-slider__pin$/,
    function* () {
      yield {
        opacity: '0%',
        'white-space': 'nowrap',
        'transition-delay': '140ms',
        transition: 'opacity 0.28s ease-out'
      }
    }
  ],
  [
    /^q-slider__pin--v$/,
    function* () {
      yield { top: '0' }
    }
  ],
  [
    /^q-slider__pin--h-standard$/,
    function* () {
      yield { bottom: '100%' }
    }
  ],
  [
    /^q-slider__pin--h-switched$/,
    function* () {
      yield { top: '100%' }
    }
  ],
  [
    /^q-slider__pin--v-standard$/,
    function* () {
      yield { left: '100%' }
    }
  ],
  [
    /^q-slider__pin--v-switched$/,
    function* () {
      yield { right: '100%' }
    }
  ],
  [
    /^q-slider__focus-ring$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-slider--focus ${sel}`,
        'background-color': 'currentColor',
        opacity: '25%',
        transform: 'scale3d(1.55, 1.55, 1)'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--active ${sel}`,
        transform: 'scale3d(0, 0, 1) !important'
      }
    }
  ],
  [
    /^q-slider__thumb$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--focus ${sel}`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--no-value ${sel}`,
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (sel) => `.q-color-picker__sliders ${sel}`,
        color: '#424242'
      }
      yield {
        [symbols.selector]: (sel) => `.q-color-picker__sliders ${sel} path`,
        fill: 'transparent',
        'stroke-width': '2px'
      }
      yield {
        [symbols.selector]: (sel) => `.q-color-picker--dark ${sel}`,
        color: '#fafafa'
      }
    }
  ],
  [
    /^q-slider__selection$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-slider--focus ${sel}`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--no-value ${sel}`,
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (sel) => `.q-slider--inactive ${sel}`,
        transition:
          'width 0.28s, left 0.28s, right 0.28s, height 0.28s, top 0.28s, bottom 0.28s'
      }
    }
  ],
  [
    /^q-slider__thumb-shape$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-slider--active ${sel}`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
    }
  ],
  [
    /^q-slider__thumb--h$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-slider--inactive ${sel}`,
        transition: 'left 0.28s, right 0.28s'
      }
    }
  ],
  [
    /^q-slider__thumb--v$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-slider--inactive ${sel}`,
        transition: 'top 0.28s, bottom 0.28s'
      }
    }
  ],
  [
    /^q-slider__text-container$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-slider--inactive ${sel}`,
        transition: 'transform 0.28s'
      }
    }
  ],
  [
    /^q-slider__pin$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-slider--label .q-slider--focus ${sel}`,
        opacity: '100%'
      }
    }
  ]
] as Rule[]
