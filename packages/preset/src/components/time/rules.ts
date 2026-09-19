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
        padding: 'var(--q-space-md)',
        'font-size': '2em'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-primary)',
        'background-color': 'var(--q-surface-container-high)'
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
    () => ({
      // Header label
    })
  ],
  [
    /^q-time__header-ampm$/,
    () => ({
      // AM/PM
    })
  ],
  [
    /^q-time__clock$/,
    () => ({
      position: 'relative',
      width: '200px',
      height: '200px',
      'border-radius': '50%',
      'background-color': 'var(--q-surface-container-highest)',
      margin: 'var(--q-space-md) auto'
    })
  ],
  [
    /^q-time__content$/,
    () => ({
      // Content
    })
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
    () => ({
      display: 'flex',
      'justify-content': 'flex-end',
      gap: 'var(--q-space-sm)',
      padding: 'var(--q-space-sm) var(--q-space-md)'
    })
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
    }
  ],
  [
    /^q-time__clock-pointer$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        bottom: '-4px',
        width: '8px',
        height: '8px'
      }
    }
  ],
  [
    /^q-time__clock-pointer$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        top: '-3px',
        height: '6px',
        width: '6px'
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
    function* () {
      yield { padding: '16px' }
    }
  ],
  [
    /^q-time__container-child$/,
    function* () {
      yield { 'border-radius': '50%', background: 'rgba(0, 0, 0, 0.12)' }
    }
  ],
  [
    /^q-time__clock-circle$/,
    function* () {
      yield { position: 'relative' }
    }
  ],
  [
    /^q-time__clock-center$/,
    function* () {
      yield {
        height: '6px',
        width: '6px',
        margin: 'auto',
        'border-radius': '50%',
        'min-height': '0',
        background: 'currentColor'
      }
    }
  ],
  [
    /^q-time__clock-position$/,
    function* () {
      yield {
        position: 'absolute',
        'min-height': '32px',
        width: '32px',
        height: '32px',
        'font-size': '12px',
        'line-height': '32px',
        margin: '0',
        padding: '0',
        transform: 'translate(-50%, -50%) /* rtl:ignore */',
        'border-radius': '50%'
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
    function* () {
      yield { top: '0%', left: '50% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-1$/,
    function* () {
      yield { top: '6.7%', left: '75% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-2$/,
    function* () {
      yield { top: '25%', left: '93.3% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-3$/,
    function* () {
      yield { top: '50%', left: '100% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-4$/,
    function* () {
      yield { top: '75%', left: '93.3% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-5$/,
    function* () {
      yield { top: '93.3%', left: '75% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-6$/,
    function* () {
      yield { top: '100%', left: '50% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-7$/,
    function* () {
      yield { top: '93.3%', left: '25% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-8$/,
    function* () {
      yield { top: '75%', left: '6.7% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-9$/,
    function* () {
      yield { top: '50%', left: '0% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-10$/,
    function* () {
      yield { top: '25%', left: '6.7% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-11$/,
    function* () {
      yield { top: '6.7%', left: '25% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-12$/,
    function* () {
      yield { top: '15%', left: '50% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-13$/,
    function* () {
      yield { top: '19.69%', left: '67.5% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-14$/,
    function* () {
      yield { top: '32.5%', left: '80.31% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-15$/,
    function* () {
      yield { top: '50%', left: '85% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-16$/,
    function* () {
      yield { top: '67.5%', left: '80.31% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-17$/,
    function* () {
      yield { top: '80.31%', left: '67.5% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-18$/,
    function* () {
      yield { top: '85%', left: '50% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-19$/,
    function* () {
      yield { top: '80.31%', left: '32.5% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-20$/,
    function* () {
      yield { top: '67.5%', left: '19.69% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-21$/,
    function* () {
      yield { top: '50%', left: '15% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-22$/,
    function* () {
      yield { top: '32.5%', left: '19.69% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__clock-pos-23$/,
    function* () {
      yield { top: '19.69%', left: '32.5% /* rtl:ignore */' }
    }
  ],
  [
    /^q-time__now-button$/,
    function* () {
      yield {
        'background-color': 'var(--q-primary)',
        color: '#fff',
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
  ],
  // Dark: the clock face and links sit on the highest container, the selected
  // position takes primary contrast, and the AM/PM selector uses tertiary.
  [
    /^q-time$/,
    function* (_, { symbols }) {
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
    }
  ]
] as Rule[]
