import type { Rule } from '@unocss/core'

export const colorRules = [
  [
    /^q-color$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'max-width': '300px'
    })
  ],
  [
    /^q-color__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'margin-bottom': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-color__header-content$/,
    () => ({
      // Header content
    })
  ],
  [
    /^q-color__header-bg$/,
    () => ({
      // Header background
    })
  ],
  [
    /^q-color__spectrum$/,
    () => ({
      position: 'relative',
      width: '100%',
      height: '200px',
      'border-radius': 'var(--q-radius-sm)',
      overflow: 'hidden'
    })
  ],
  [
    /^q-color__spectrum-tab$/,
    () => ({
      // Spectrum tab
    })
  ],
  [
    /^q-color__spectrum-white$/,
    () => ({
      // White gradient
    })
  ],
  [
    /^q-color__spectrum-black$/,
    () => ({
      // Black gradient
    })
  ],
  [
    /^q-color__hue$/,
    () => ({
      width: '100%',
      height: '12px',
      'margin-top': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-color__alpha$/,
    () => ({
      width: '100%',
      height: '12px',
      'margin-top': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-color__footer$/,
    () => ({
      display: 'flex',
      'justify-content': 'flex-end',
      gap: 'var(--q-space-sm)',
      'margin-top': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-color__buttons$/,
    () => ({
      // Buttons
    })
  ],
  [
    /^q-color__field$/,
    () => ({
      // Field
    })
  ],
  [
    /^q-color__field-tab$/,
    () => ({
      // Field tab
    })
  ],
  [
    /^q-color__field-hex$/,
    () => ({
      // Hex field
    })
  ],
  [
    /^q-color__field-rgb$/,
    () => ({
      // RGB field
    })
  ],
  [
    /^q-color__field-hsl$/,
    () => ({
      // HSL field
    })
  ],
  [
    /^q-color__field-hsv$/,
    () => ({
      // HSV field
    })
  ],
  [
    /^q-color__field-cmyk$/,
    () => ({
      // CMYK field
    })
  ],
  [
    /^q-color__field-input$/,
    () => ({
      width: '100%'
    })
  ],
  [
    /^q-color__field-label$/,
    () => ({
      'font-size': '0.75em'
    })
  ],
  [
    /^q-color__field-prefix$/,
    () => ({
      // Prefix
    })
  ],
  [
    /^q-color__field-suffix$/,
    () => ({
      // Suffix
    })
  ],
  [
    /^q-color-picker__header-content--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-color-picker__header-content--dark .q-tab--inactive:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        background: 'rgba(255, 255, 255, 0.2)'
      }
    }
  ],
  [
    /^q-color-picker__alpha$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-color-picker__alpha .q-slider__track:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'border-radius': 'inherit',
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0), #757575)'
      }
    }
  ],
  [
    /^q-color-picker$/,
    function* (_, { symbols }) {
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
        [symbols.selector]: (sel) => `${sel} .q-tab`,
        padding: '0 !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} input`,
        color: 'inherit',
        background: 'transparent',
        outline: '0',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs`,
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab--active`,
        'box-shadow': '0 0 14px 3px rgba(0, 0, 0, 0.2)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab--active .q-focus-helper`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab__indicator`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab-panels`,
        background: 'inherit'
      }
    }
  ],
  [
    /^q-color-picker--bordered$/,
    function* () {
      yield { border: '1px solid rgba(0, 0, 0, 0.12)' }
    }
  ],
  [
    /^q-color-picker__header-tabs$/,
    function* () {
      yield { height: '32px' }
    }
  ],
  [
    /^q-color-picker__header-banner$/,
    function* () {
      yield { height: '36px' }
    }
  ],
  [
    /^q-color-picker__header$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} input`,
        'line-height': '24px',
        border: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab`,
        'min-height': '32px !important',
        height: '32px !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab--inactive`,
        background:
          'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(0, 0, 0, 0.1))'
      }
    }
  ],
  [
    /^q-color-picker__error-icon$/,
    function* () {
      yield {
        bottom: '2px',
        right: '2px',
        'font-size': '24px',
        opacity: '0',
        transition: 'opacity 0.3s ease-in'
      }
    }
  ],
  [
    /^q-color-picker__header-content$/,
    function* () {
      yield { position: 'relative', background: '#fff' }
    }
  ],
  [
    /^q-color-picker__header-content--light$/,
    function* () {
      yield { color: '#000' }
    }
  ],
  [
    /^q-color-picker__header-bg$/,
    function* () {
      yield { background: '#fff', 'background-image': 'url("data:image/png' }
    }
  ],
  [
    /^q-color-picker__footer$/,
    function* (_, { symbols }) {
      yield { height: '36px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab`,
        'min-height': '36px !important',
        height: '36px !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab--inactive`,
        background:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(0, 0, 0, 0.1))'
      }
    }
  ],
  [
    /^q-color-picker__spectrum$/,
    function* () {
      yield { width: '100%', height: '100%' }
    }
  ],
  [
    /^q-color-picker__spectrum-tab$/,
    function* () {
      yield { padding: '0 !important' }
    }
  ],
  [
    /^q-color-picker__spectrum-white$/,
    function* () {
      yield {
        background: 'linear-gradient(to right, #fff, rgba(255, 255, 255, 0))'
      }
    }
  ],
  [
    /^q-color-picker__spectrum-black$/,
    function* () {
      yield { background: 'linear-gradient(to top, #000, rgba(0, 0, 0, 0))' }
    }
  ],
  [
    /^q-color-picker__spectrum-circle$/,
    function* () {
      yield {
        width: '10px',
        height: '10px',
        'box-shadow':
          '0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4)',
        'border-radius': '50%',
        transform: 'translate(-5px, -5px)'
      }
    }
  ],
  [
    /^q-color-picker__hue$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__track`,
        background:
          'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%) !important',
        opacity: '1'
      }
    }
  ],
  [
    /^q-color-picker__sliders$/,
    function* (_, { symbols }) {
      yield { padding: '0 16px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__thumb`,
        color: '#424242'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__thumb path`,
        'stroke-width': '2px',
        fill: 'transparent'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider--active path`,
        'stroke-width': '3px'
      }
    }
  ],
  [
    /^q-color-picker__tune-tab$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider`,
        'margin-left': '18px',
        'margin-right': '18px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} input`,
        'font-size': '11px',
        border: '1px solid #e0e0e0',
        'border-radius': '4px',
        width: '3.5em'
      }
    }
  ],
  [
    /^q-color-picker__palette-tab$/,
    function* () {
      yield { padding: '0 !important' }
    }
  ],
  [
    /^q-color-picker__palette-rows--editable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-color-picker__cube`,
        cursor: 'pointer'
      }
    }
  ],
  [
    /^q-color-picker__cube$/,
    function* () {
      yield { 'padding-bottom': '10%', width: '10% !important' }
    }
  ],
  [
    /^q-color-picker--dark$/,
    function* (_, { symbols }) {
      yield {
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-color-picker__tune-tab input`,
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-slider__thumb`,
        color: '#fafafa'
      }
    }
  ]
] as Rule[]
