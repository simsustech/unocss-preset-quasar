import type { Rule } from '@unocss/core'

export const timeRules = [
  [
    /^q-time$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'max-width': '300px',
        'background-color': 'var(--q-surface)',
        'border-radius': 'var(--q-radius-md)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__now-button`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__clock-pointer`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}__clock-position--active`,
        color: 'var(--q-on-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__link`,
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__link--active`,
        color: 'var(--q-on-primary-container)',
        'background-color': 'var(--q-primary-container)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__container-child`,
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}__header-ampm .q-time__link--active`,
        'background-color': 'var(--q-tertiary-container)'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        'outline-color':
          'color-mix(in oklab, 0 var(--un-outline-opacity), transparent)',
        'border-radius': '4px',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-high) var(--un-bg-opacity), transparent)',
        width: '290px',
        'min-width': '290px',
        'max-width': '100%',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--bordered`,
        'border-color': 'rgba(0, 0, 0, 0.12)',
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--dark`,
        'border-color': 'rgba(255, 255, 255, 0.28)',
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--portrait`,
        display: 'inline-flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--landscape`,
        display: 'inline-flex',
        'min-width': '420px',
        'align-items': 'stretch'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--landscape > div`,
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--landscape .q-time__header`,
        'min-width': '156px',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--landscape .q-time__header-ampm`,
        'margin-top': '12px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--portrait .q-time__header`,
        'min-height': '86px',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--portrait .q-time__header-ampm`,
        'margin-left': '12px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--portrait${sel}--bordered .q-time__content`,
        'margin-inline': '0',
        'margin-block': '1px'
      }
      // Read-only and disabled times keep the dial inert rather than hiding it.
      yield {
        [symbols.selector]: (sel) => `${sel}--readonly .q-time__content`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--readonly .q-time__header-ampm`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled .q-time__content`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled .q-time__header-ampm`,
        'pointer-events': 'none'
      }
    }
  ],
  [
    /^q-time--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-time--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-time--readonly$/,
    () => ({
      // Readonly
    })
  ],
  [
    /^q-time--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-time--with-seconds$/,
    () => ({
      // With seconds
    })
  ],
  [
    /^q-time__header$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        // padding comes from the yield below: the reference's 16px (the space
        // scale's md is 12px, which the fold would have substituted)
        'font-size': '2em'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-primary)',
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'font-weight': 'var(--fontWeight-light)',
        padding: '16px',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        'border-top-left-radius': 'inherit'
      }
    }
  ],
  [
    /^q-time__header-content$/,
    () => ({
      // Header content
    })
  ],
  [
    /^q-time__header-label$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '48px',
        'line-height': 'var(--leading-none)',
        'letter-spacing': '-0.00833em',
        'border-radius': 'var(--shape-corner-small)',
        flex: '0 1 auto !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div + div`,
        'margin-left': '4px'
      }
    }
  ],
  [
    /^q-time__header-ampm$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '16px',
        'letter-spacing': 'var(--tracking-widest)',
        flex: '0 1 auto !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-time__link--active`,
        'background-color':
          'color-mix(in oklab, var(--q-tertiary-container) var(--un-bg-opacity), transparent)'
      }
    }
  ],
  [
    /^q-time__clock$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        // width/height come from the yield below: the reference's 100%
        'border-radius': '50%',
        'background-color': 'var(--q-surface-container-highest)',
        margin: 'var(--q-space-md) auto'
      }
      yield {
        'font-size': '14px',
        padding: '24px',
        width: '100%',
        height: '100%',
        'max-width': '100%',
        'max-height': '100%'
      }
    }
  ],
  [
    /^q-time__content$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        content: '""',
        display: 'block',
        'padding-bottom': '100%'
      }
      yield { padding: '16px' }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'padding-bottom': '100%',
        display: 'block',
        content: '""'
      }
    }
  ],
  [
    /^q-time__container$/,
    () => ({
      // Container
    })
  ],
  [
    /^q-time__main$/,
    () => ({
      // Main
    })
  ],
  [
    /^q-time__now$/,
    () => ({
      // Now
    })
  ],
  [
    /^q-time__progress$/,
    () => ({
      // Progress
    })
  ],
  [
    /^q-time__text$/,
    () => ({
      // Text
    })
  ],
  [
    /^q-time__input$/,
    () => ({
      // Input
    })
  ],
  [
    /^q-time__actions$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'justify-content': 'flex-end',
        gap: 'var(--q-space-sm)',
        padding: 'var(--q-space-sm) var(--q-space-md)'
      }
      yield {
        'padding-inline': '16px',
        'padding-top': '0',
        'padding-bottom': '16px'
      }
    }
  ],
  [
    /^q-time__clock-pointer$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before, ${sel}:after`,
        content: '""',
        position: 'absolute',
        left: '50%',
        'border-radius': '50%',
        background: 'currentColor',
        transform: 'translateX(-50%)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        bottom: '-4px',
        width: '8px',
        height: '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        top: '-3px',
        height: '6px',
        width: '6px'
      }
      yield {
        color:
          'color-mix(in oklab, var(--q-primary) var(--un-text-opacity), transparent)',
        'background-color': 'currentColor',
        width: '2px',
        height: '50%',
        'min-height': '0',
        'transform-origin': '0 0',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        right: '0',
        bottom: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'border-radius': '50%',
        'background-color': 'currentColor',
        width: '8px',
        height: '8px',
        content: '""',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        bottom: '-4px',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        'border-radius': '50%',
        'background-color': 'currentColor',
        height: '6px',
        width: '6px',
        content: '""',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '-3px',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-time--bordered$/,
    function* () {
      yield { border: '1px solid rgba(0, 0, 0, 0.12)' }
    }
  ],
  [
    /^q-time__link$/,
    function* (_, { symbols }) {
      yield {
        opacity: '0.56',
        outline: '0',
        transition: 'opacity 0.3s ease-out'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:hover`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus-visible`,
        opacity: '1',
        outline: '2px solid currentColor',
        'outline-offset': '2px'
      }
      yield {
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)',
        padding: '6px',
        'outline-color':
          'color-mix(in oklab, 0 var(--un-outline-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-highest) var(--un-bg-opacity), transparent)',
        opacity: '0.56',
        transition: 'opacity 0.3s ease-out'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--active`,
        color:
          'color-mix(in oklab, var(--q-on-primary-container) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary-container) var(--un-bg-opacity), transparent)',
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:hover`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus`,
        opacity: '100%'
      }
    }
  ],
  [
    /^q-time__link--active$/,
    function* () {
      yield { opacity: '1' }
    }
  ],
  [
    /^q-time__container-parent$/,
    function* (_, { symbols }) {
      yield { padding: '16px' }
      yield { padding: '16px' }
    }
  ],
  [
    /^q-time__container-child$/,
    function* (_, { symbols }) {
      yield { 'border-radius': '50%', background: 'rgba(0, 0, 0, 0.12)' }
      yield {
        'border-radius': '50%',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-highest) var(--un-bg-opacity), transparent)'
      }
    }
  ],
  [
    /^q-time__clock-circle$/,
    function* (_, { symbols }) {
      yield { position: 'relative' }
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        position: 'relative'
      }
    }
  ],
  [
    /^q-time__clock-center$/,
    function* (_, { symbols }) {
      yield {
        height: '6px',
        width: '6px',
        margin: 'auto',
        'border-radius': '50%',
        'min-height': '0',
        background: 'currentColor'
      }
      yield {
        margin: 'auto',
        'border-radius': '50%',
        'background-color': 'currentColor',
        height: '6px',
        width: '6px',
        'min-height': '0'
      }
    }
  ],
  [
    /^q-time__clock-position$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        'min-height': '32px',
        width: '32px',
        height: '32px',
        'font-size': '12px',
        'line-height': '32px',
        margin: '0',
        padding: '0',
        // transform comes from the yield below: same position, no rtl marker
        'border-radius': '50%'
      }
      yield {
        'font-size': '12px',
        'line-height': '32px',
        margin: '0',
        padding: '0',
        'border-radius': '50%',
        'min-height': '32px',
        width: '32px',
        height: '32px',
        transform: 'translate(-50%, -50%)',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--active`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--disable`,
        opacity: '40%'
      }
    }
  ],
  [
    /^q-time__clock-position--disable$/,
    function* () {
      yield { opacity: '0.4' }
    }
  ],
  [
    /^q-time__clock-position--active$/,
    function* () {
      yield { 'background-color': 'var(--q-primary)', color: '#fff' }
    }
  ],
  [
    /^q-time__clock-pos-0$/,
    function* (_, { symbols }) {
      yield { top: '0%', left: '50% /* rtl:ignore */' }
      yield {
        top: '0%',
        left: '50%'
      }
    }
  ],
  [
    /^q-time__clock-pos-1$/,
    function* (_, { symbols }) {
      yield { top: '6.7%', left: '75% /* rtl:ignore */' }
      yield {
        top: '6.7%',
        left: '75%'
      }
    }
  ],
  [
    /^q-time__clock-pos-2$/,
    function* (_, { symbols }) {
      yield { top: '25%', left: '93.3% /* rtl:ignore */' }
      yield {
        top: '25%',
        left: '93.3%'
      }
    }
  ],
  [
    /^q-time__clock-pos-3$/,
    function* (_, { symbols }) {
      yield { top: '50%', left: '100% /* rtl:ignore */' }
      yield {
        top: '50%',
        left: '100%'
      }
    }
  ],
  [
    /^q-time__clock-pos-4$/,
    function* (_, { symbols }) {
      yield { top: '75%', left: '93.3% /* rtl:ignore */' }
      yield {
        top: '75%',
        left: '93.3%'
      }
    }
  ],
  [
    /^q-time__clock-pos-5$/,
    function* (_, { symbols }) {
      yield { top: '93.3%', left: '75% /* rtl:ignore */' }
      yield {
        top: '93.3%',
        left: '75%'
      }
    }
  ],
  [
    /^q-time__clock-pos-6$/,
    function* (_, { symbols }) {
      yield { top: '100%', left: '50% /* rtl:ignore */' }
      yield {
        top: '100%',
        left: '50%'
      }
    }
  ],
  [
    /^q-time__clock-pos-7$/,
    function* (_, { symbols }) {
      yield { top: '93.3%', left: '25% /* rtl:ignore */' }
      yield {
        top: '93.3%',
        left: '25%'
      }
    }
  ],
  [
    /^q-time__clock-pos-8$/,
    function* (_, { symbols }) {
      yield { top: '75%', left: '6.7% /* rtl:ignore */' }
      yield {
        top: '75%',
        left: '6.7%'
      }
    }
  ],
  [
    /^q-time__clock-pos-9$/,
    function* (_, { symbols }) {
      yield { top: '50%', left: '0% /* rtl:ignore */' }
      yield {
        top: '50%',
        left: '0%'
      }
    }
  ],
  [
    /^q-time__clock-pos-10$/,
    function* (_, { symbols }) {
      yield { top: '25%', left: '6.7% /* rtl:ignore */' }
      yield {
        top: '25%',
        left: '6.7%'
      }
    }
  ],
  [
    /^q-time__clock-pos-11$/,
    function* (_, { symbols }) {
      yield { top: '6.7%', left: '25% /* rtl:ignore */' }
      yield {
        top: '6.7%',
        left: '25%'
      }
    }
  ],
  [
    /^q-time__clock-pos-12$/,
    function* (_, { symbols }) {
      yield { top: '15%', left: '50% /* rtl:ignore */' }
      yield {
        top: '15%',
        left: '50%'
      }
    }
  ],
  [
    /^q-time__clock-pos-13$/,
    function* (_, { symbols }) {
      yield { top: '19.69%', left: '67.5% /* rtl:ignore */' }
      yield {
        top: '19.69%',
        left: '67.5%'
      }
    }
  ],
  [
    /^q-time__clock-pos-14$/,
    function* (_, { symbols }) {
      yield { top: '32.5%', left: '80.31% /* rtl:ignore */' }
      yield {
        top: '32.5%',
        left: '80.31%'
      }
    }
  ],
  [
    /^q-time__clock-pos-15$/,
    function* (_, { symbols }) {
      yield { top: '50%', left: '85% /* rtl:ignore */' }
      yield {
        top: '50%',
        left: '85%'
      }
    }
  ],
  [
    /^q-time__clock-pos-16$/,
    function* (_, { symbols }) {
      yield { top: '67.5%', left: '80.31% /* rtl:ignore */' }
      yield {
        top: '67.5%',
        left: '80.31%'
      }
    }
  ],
  [
    /^q-time__clock-pos-17$/,
    function* (_, { symbols }) {
      yield { top: '80.31%', left: '67.5% /* rtl:ignore */' }
      yield {
        top: '80.31%',
        left: '67.5%'
      }
    }
  ],
  [
    /^q-time__clock-pos-18$/,
    function* (_, { symbols }) {
      yield { top: '85%', left: '50% /* rtl:ignore */' }
      yield {
        top: '85%',
        left: '50%'
      }
    }
  ],
  [
    /^q-time__clock-pos-19$/,
    function* (_, { symbols }) {
      yield { top: '80.31%', left: '32.5% /* rtl:ignore */' }
      yield {
        top: '80.31%',
        left: '32.5%'
      }
    }
  ],
  [
    /^q-time__clock-pos-20$/,
    function* (_, { symbols }) {
      yield { top: '67.5%', left: '19.69% /* rtl:ignore */' }
      yield {
        top: '67.5%',
        left: '19.69%'
      }
    }
  ],
  [
    /^q-time__clock-pos-21$/,
    function* (_, { symbols }) {
      yield { top: '50%', left: '15% /* rtl:ignore */' }
      yield {
        top: '50%',
        left: '15%'
      }
    }
  ],
  [
    /^q-time__clock-pos-22$/,
    function* (_, { symbols }) {
      yield { top: '32.5%', left: '19.69% /* rtl:ignore */' }
      yield {
        top: '32.5%',
        left: '19.69%'
      }
    }
  ],
  [
    /^q-time__clock-pos-23$/,
    function* (_, { symbols }) {
      yield { top: '19.69%', left: '32.5% /* rtl:ignore */' }
      yield {
        top: '19.69%',
        left: '32.5%'
      }
    }
  ],
  [
    /^q-time__now-button$/,
    function* (_, { symbols }) {
      yield {
        'background-color': 'var(--q-primary)',
        color: '#fff',
        top: '12px',
        right: '12px'
      }
      yield {
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)',
        top: '12px',
        right: '12px'
      }
    }
  ],
  [
    /^q-time--portrait$/,
    function* (_, { symbols }) {
      yield { display: 'inline-flex', 'flex-direction': 'column' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-time__header`,
        'border-top-right-radius': 'inherit',
        'min-height': '86px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-time__header-ampm`,
        'margin-left': '12px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-time--bordered .q-time__content`,
        margin: '1px 0'
      }
    }
  ],
  [
    /^q-time--landscape$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'align-items': 'stretch',
        'min-width': '420px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-time__header`,
        'border-bottom-left-radius': 'inherit',
        'min-width': '156px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-time__header-ampm`,
        'margin-top': '12px'
      }
    }
  ]
] as Rule[]
