import type { Rule } from '@unocss/core'

export const sliderRules = [
  [
    /^q-slider$/,
    function* (_, { symbols }) {
      // .q-slider
      yield {
        position: 'relative',
        height: '1.5em',
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__thumb`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__track`,
        color: 'var(--q-primary)',
        'background-color': 'var(--q-secondary-container)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__inner`,
        'background-color': 'var(--q-secondary-container)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-slider__markers`,
        color: 'rgba(255, 255, 255, 0.3)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-slider__track-container--h`,
        'padding-inline': '0',
        'padding-block': '6px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-slider__track-container--v`,
        'padding-inline': '6px',
        'padding-block': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track`,
        color: 'var(--q-primary)',
        'border-radius': 'var(--q-corner-extra-small)',
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) 30%, transparent)',
        width: 'inherit',
        height: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__track`,
        color: 'var(--q-primary)',
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) 30%, transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `.q-slider--dark ${selector}__track`,
        'background-color': 'rgba(255, 255, 255, 0.1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track-container`,
        position: 'relative',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track-container`,
        'outline-style': 'solid',
        'outline-width': '0px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__selection`,
        'background-color': 'currentColor',
        width: '100%',
        height: '100%',
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--focus ${selector}__selection`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--no-value ${selector}__selection`,
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--inactive ${selector}__selection`,
        transition:
          'width 0.28s, left 0.28s, right 0.28s, height 0.28s, top 0.28s, bottom 0.28s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__handle`,
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1.2em',
        height: '1.2em',
        'border-radius': '50%',
        'background-color': 'var(--q-primary)',
        border: '2px solid var(--q-surface)',
        cursor: 'grab'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__handle-container`,
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__hint`,
        position: 'absolute',
        top: '-1.5em',
        'font-size': '0.75em',
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__hint-value`
        // Hint value
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner`,
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) 30%, transparent)',
        width: '100%',
        height: '100%',
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__inner`,
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) 30%, transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `.q-slider--dark ${selector}__inner`,
        'background-color': 'rgba(255, 255, 255, 0.1)'
      }
      yield {
        [symbols.selector]: (selector) => `.q-slider--focus ${selector}__inner`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--no-value ${selector}__inner`,
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--active`
        // Active state
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--inactive`
        // Inactive state
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marker-label-container`,
        position: 'relative',
        height: '1em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marker-labels`,
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__active`
        // Active
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__markers:after`,
        content: '""',
        position: 'absolute',
        'background-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__markers`,
        width: '100%',
        height: '100%',
        color: 'var(--q-on-surface-variant)',
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__markers--h:after`,
        height: '100%',
        width: '2px',
        top: '0',
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__markers--h`,
        'background-color':
          'color-mix(in oklab, repeating-linear-gradient(to right, currentColor, currentColor 2px, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0)), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__markers--v:after`,
        width: '100%',
        height: '2px',
        left: '0',
        bottom: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__markers--v`,
        'background-color':
          'color-mix(in oklab, repeating-linear-gradient(to bottom, currentColor, currentColor 2px, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0)), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin:before`,
        content: '""',
        width: '0',
        height: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin`,
        opacity: '0%',
        'white-space': 'nowrap',
        'transition-delay': '140ms',
        transition: 'opacity 0.28s ease-out'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--label .q-slider--focus ${selector}__pin`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--h:before`,
        'border-left': '6px solid transparent',
        'border-right': '6px solid transparent',
        left: '50%',
        transform: 'translateX(-50%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--h-standard:before`,
        bottom: '2px',
        'border-top': '6px solid currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--h-standard`,
        bottom: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--h-switched:before`,
        top: '2px',
        'border-bottom': '6px solid currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--h-switched`,
        top: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--v:before`,
        top: '50%',
        transform: 'translateY(-50%)',
        'border-top': '6px solid transparent',
        'border-bottom': '6px solid transparent'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--v`,
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--v-standard:before`,
        left: '2px',
        'border-right': '6px solid currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--v-standard`,
        left: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--v-switched:before`,
        right: '2px',
        'border-left': '6px solid currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pin--v-switched`,
        right: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--h`,
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--v`,
        height: '200px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--editable .q-slider__track-container`,
        cursor: 'grab'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track-container--h`,
        width: '100%',
        padding: '12px 0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__track-container--h .q-slider__selection`,
        'will-change': 'left'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track-container--h`,
        'padding-inline': '0',
        'padding-block': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track-container--v`,
        height: '100%',
        padding: '0 12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__track-container--v .q-slider__selection`,
        'will-change': 'top'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track-container--v`,
        'padding-inline': 'var(--q-space-md)',
        'padding-block': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__marker-labels-container`,
        position: 'relative',
        width: '100%',
        height: '100%',
        'min-height': 'var(--q-size-sm)',
        'min-width': '24px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__marker-labels--h-standard`,
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__marker-labels--h-switched`,
        bottom: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marker-labels--h-ltr`,
        transform: 'translateX(-50%) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marker-labels--h-rtl`,
        transform: 'translateX(50%) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__marker-labels--v-standard`,
        left: '4px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__marker-labels--v-switched`,
        right: '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marker-labels--v-ltr`,
        transform: 'translateY(-50%) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marker-labels--v-rtl`,
        transform: 'translateY(50%) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb`,
        'z-index': '1',
        outline: '0',
        'outline-width': '0px',
        'outline-style': 'solid',
        color: 'var(--q-primary)',
        transition:
          'transform 0.18s ease-out, fill 0.18s ease-out, stroke 0.18s ease-out'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb.q-slider--focus`,
        opacity: '1 !important'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__thumb`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `.q-slider--focus ${selector}__thumb`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--no-value ${selector}__thumb`,
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-color-picker__sliders ${selector}__thumb`,
        color: '#424242'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-color-picker__sliders ${selector}__thumb path`,
        fill: 'transparent',
        'stroke-width': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-color-picker--dark ${selector}__thumb`,
        color: '#fafafa'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--h`,
        top: '50%',
        'will-change': 'left'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--inactive ${selector}__thumb--h`,
        transition: 'left 0.28s, right 0.28s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--h-ltr`,
        transform: 'scale(1) translate(-50%, -50%) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--h-rtl`,
        transform: 'scale(1) translate(50%, -50%) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--v`,
        left: '50% /* rtl:ignore */',
        'will-change': 'top'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--inactive ${selector}__thumb--v`,
        transition: 'top 0.28s, bottom 0.28s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--v-ltr`,
        transform: 'scale(1) translate(-50%, -50%) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb--v-rtl`,
        transform: 'scale(1) translate(-50%, 50%) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb-shape`,
        top: '0',
        left: '0',
        'stroke-width': '3.5',
        stroke: 'currentColor',
        transition: 'transform 0.28s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__thumb-shape path`,
        stroke: 'currentColor',
        fill: 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--active ${selector}__thumb-shape`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__focus-ring`,
        'border-radius': '50%',
        opacity: '0',
        transition:
          'transform 266.67ms ease-out, opacity 266.67ms ease-out, background-color 266.67ms ease-out',
        'transition-delay': '140ms'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--focus ${selector}__focus-ring`,
        'background-color': 'currentColor',
        opacity: '25%',
        transform: 'scale3d(1.55, 1.55, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--active ${selector}__focus-ring`,
        transform: 'scale3d(0, 0, 1) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        'z-index': '1',
        'white-space': 'nowrap',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--h`,
        left: '50%',
        transform: 'translateX(-50%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--h-standard`,
        bottom: '7px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--h-switched`,
        top: '7px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--v`,
        top: '50%',
        transform: 'translateY(-50%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--v-standard`,
        left: '7px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--v-switched`,
        right: '7px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__text-container`,
        'min-height': '25px',
        padding: '2px 8px',
        'border-radius': 'var(--q-corner-extra-small)',
        background: 'currentColor',
        position: 'relative',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__text-container`,
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': '2px',
        'text-align': 'center',
        'border-radius': 'var(--q-corner-extra-small)',
        'background-color': 'currentColor',
        'min-height': '25px',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-slider--inactive ${selector}__text-container`,
        transition: 'transform 0.28s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__text`,
        color: '#fff',
        'font-size': '12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--no-value .q-slider__thumb`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--no-value .q-slider__inner`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--no-value .q-slider__selection`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--focus .q-slider__focus-ring`,
        background: 'currentColor',
        transform: 'scale3d(1.55, 1.55, 1)',
        opacity: '0.25'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--focus .q-slider__thumb`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--focus .q-slider__inner`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--focus .q-slider__selection`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--inactive .q-slider__thumb--h`,
        transition: 'left 0.28s, right 0.28s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--inactive .q-slider__thumb--v`,
        transition: 'top 0.28s, bottom 0.28s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--inactive .q-slider__selection`,
        transition:
          'width 0.28s, left 0.28s, right 0.28s, height 0.28s, top 0.28s, bottom 0.28s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--inactive .q-slider__text-container`,
        transition: 'transform 0.28s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--active`,
        cursor: 'grabbing'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--active .q-slider__thumb-shape`,
        transform: 'scale(1.5)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--active .q-slider__focus-ring`,
        transform: 'scale(0) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--active.q-slider--label .q-slider__thumb-shape`,
        transform: 'scale(0) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--label.q-slider--active .q-slider__pin`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--label .q-slider--focus .q-slider__pin`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--label.q-slider--label-always .q-slider__pin`,
        opacity: '1'
      }
    }
  ]
] as Rule[]
