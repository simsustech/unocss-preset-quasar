import type { Rule } from '@unocss/core'

export const colorRules = [
  [
    /^q-color$/,
    function* (_, { symbols }) {
      // .q-color
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'max-width': '300px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'margin-bottom': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-content`
        // Header content
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-bg`
        // Header background
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum`,
        position: 'relative',
        width: '100%',
        height: '200px',
        'border-radius': 'var(--q-radius-sm)',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum-tab`
        // Spectrum tab
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum-white`
        // White gradient
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum-black`
        // Black gradient
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__hue`,
        width: '100%',
        height: '12px',
        'margin-top': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__alpha`,
        width: '100%',
        height: '12px',
        'margin-top': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer`,
        display: 'flex',
        'justify-content': 'flex-end',
        gap: 'var(--q-space-sm)',
        'margin-top': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__buttons`
        // Buttons
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field`
        // Field
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-tab`
        // Field tab
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-hex`
        // Hex field
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-rgb`
        // RGB field
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-hsl`
        // HSL field
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-hsv`
        // HSV field
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-cmyk`
        // CMYK field
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-input`,
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-label`,
        'font-size': '0.75em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-prefix`
        // Prefix
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__field-suffix`
        // Suffix
      }
    }
  ],
  [
    /^q-color-picker$/,
    function* (_, { symbols }) {
      // .q-color-picker
      yield {
        [symbols.selector]: (selector) => `${selector}__header-content--dark`,
        // Reference states the label colour on the container itself.
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header-content--dark .q-tab--inactive:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        background: 'rgba(255, 255, 255, 0.2)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__alpha .q-slider__track-container`,
        'padding-top': 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__alpha .q-slider__track:before`,
        content: 'var(--un-content)',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'border-radius': 'inherit',
        'background-image':
          'linear-gradient(90deg, rgba(255, 255, 255, 0), #757575)'
      }
      yield {
        overflow: 'hidden',
        background: '#fff',
        'max-width': '350px',
        'vertical-align': 'top',
        'min-width': '180px',
        'border-radius': '4px',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-tab`,
        padding: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} input`,
        color: 'inherit',
        // Reference states the colour reset as `background-color`.
        'background-color': 'transparent',
        outline: '0',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-tabs`,
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-tab--active`,
        'box-shadow': '0 0 14px 3px rgba(0, 0, 0, 0.2)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-tab--active .q-focus-helper`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-tab__indicator`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-tab-panels`,
        background: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-style': 'solid',
        'border-width': '1px',
        'border-color':
          'color-mix(in oklab, rgba(0,0,0,0.12) var(--un-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-tabs`,
        height: '32px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-banner`,
        height: '36px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header input`,
        'line-height': '24px',
        border: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header .q-tab`,
        'min-height': '32px !important',
        height: '32px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header .q-tab--inactive`,
        'background-image':
          'linear-gradient( to top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(0, 0, 0, 0.1) )'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__error-icon`,
        bottom: '2px',
        right: '2px',
        'font-size': '24px',
        opacity: '0',
        transition: 'opacity 0.3s ease-in'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-content`,
        position: 'relative',
        background: '#fff'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-content--light`,
        color: '#000'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-bg`,
        background: '#fff',
        'background-image':
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==")'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer`,
        height: '36px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer .q-tab`,
        'min-height': '36px !important',
        height: '36px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__footer .q-tab--inactive`,
        'background-image':
          'linear-gradient( to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(0, 0, 0, 0.1) )'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum`,
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum-tab`,
        padding: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum-white`,
        'background-image':
          'linear-gradient(to right, #fff, rgba(255, 255, 255, 0))'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum-black`,
        'background-image': 'linear-gradient(to top, #000, rgba(0, 0, 0, 0))'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spectrum-circle`,
        width: '10px',
        height: '10px',
        'box-shadow':
          '0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4)',
        'border-radius': '50%',
        transform: 'translate(-5px, -5px)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__hue .q-slider__track`,
        'background-image':
          'linear-gradient( to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100% ) !important',
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sliders`,
        'padding-inline': '16px',
        'padding-block': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__sliders .q-slider__thumb`,
        color: '#424242'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__sliders .q-slider__thumb path`,
        'stroke-width': '2px',
        fill: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__sliders .q-slider--active path`,
        'stroke-width': '3px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__tune-tab .q-slider`,
        'margin-left': '18px',
        'margin-right': '18px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__tune-tab input`,
        'font-size': '11px',
        'border-style': 'solid',
        'border-width': '1px',
        'border-color':
          'color-mix(in oklab, #e0e0e0 var(--un-border-opacity), transparent)',
        'border-radius': '4px',
        width: '3.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__palette-tab`,
        padding: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__palette-rows--editable .q-color-picker__cube`,
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__cube`,
        'padding-bottom': '10%',
        width: '10% !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-color-picker__tune-tab input`,
        'border-style': 'solid',
        'border-width': '1px',
        'border-color':
          'color-mix(in oklab, rgba(255,255,255,0.3) var(--un-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-slider__thumb`,
        color: '#fafafa'
      }
    }
  ]
] as Rule[]
