import type { Rule } from '@unocss/core'

export const timeRules = [
  [
    /^q-time$/,
    function* (_, { symbols }) {
      // .q-time
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'max-width': '300px',
        'background-color': 'var(--q-surface)',
        'border-radius': 'var(--q-radius-md)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__now-button`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__clock-pointer`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__clock-position--active`,
        color: 'var(--q-on-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__link`,
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__link--active`,
        color: 'var(--q-on-primary-container)',
        'background-color': 'var(--q-primary-container)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__container-child`,
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__header-ampm .q-time__link--active`,
        'background-color': 'var(--q-tertiary-container)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        'outline-color':
          'color-mix(in oklab, 0 var(--un-outline-opacity), transparent)',
        // quasar: this rule reproduces Quasar's own 4px corner
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
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-color': 'rgba(0, 0, 0, 0.12)',
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'border-color': 'rgba(255, 255, 255, 0.28)',
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--portrait`,
        display: 'inline-flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape`,
        display: 'inline-flex',
        'min-width': '420px',
        'align-items': 'stretch'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape > div`,
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape .q-time__header`,
        'min-width': '156px',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape .q-time__header-ampm`,
        'margin-top': '12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait .q-time__header`,
        'min-height': '86px',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait .q-time__header-ampm`,
        'margin-left': '12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait${selector}--bordered .q-time__content`,
        'margin-inline': '0',
        'margin-block': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly .q-time__content`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly .q-time__header-ampm`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.disabled .q-time__content`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.disabled .q-time__header-ampm`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`
        // Dark mode
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disabled`,
        opacity: 0.5
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--readonly`
        // Readonly
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--with-seconds`
        // With seconds
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        // padding comes from the yield below: the reference's 16px (the space
        // scale's md is 12px, which the fold would have substituted)
        'font-size': '2em'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__header`,
        color: 'var(--q-on-primary)',
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'font-weight': 'var(--fontWeight-light)',
        padding: '16px',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        'border-top-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-content`
        // Header content
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-label`,
        'font-size': '48px',
        'line-height': 'var(--leading-none)',
        'letter-spacing': '-0.00833em',
        'border-radius': 'var(--shape-corner-small)',
        flex: '0 1 auto !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header-label > div + div`,
        'margin-left': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-ampm`,
        'font-size': '16px',
        'letter-spacing': 'var(--tracking-widest)',
        flex: '0 1 auto !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header-ampm .q-time__link--active`,
        'background-color':
          'color-mix(in oklab, var(--q-tertiary-container) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock`,
        position: 'relative',
        // width/height come from the yield below: the reference's 100%
        'border-radius': '50%',
        'background-color': 'var(--q-surface-container-highest)',
        margin: 'var(--q-space-md) auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock`,
        'font-size': 'var(--q-body-medium-size)',
        padding: '24px',
        width: '100%',
        height: '100%',
        'max-width': '100%',
        'max-height': '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content:before`,
        content: '""',
        display: 'block',
        'padding-bottom': '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        padding: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content:before`,
        'padding-bottom': '100%',
        display: 'block',
        content: '""'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container`
        // Container
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__main`
        // Main
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__now`
        // Now
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`
        // Progress
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__text`
        // Text
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input`
        // Input
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        display: 'flex',
        'justify-content': 'flex-end',
        gap: 'var(--q-space-sm)',
        padding: 'var(--q-space-sm) var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        'padding-inline': 'var(--q-space-lg)',
        'padding-top': '0',
        'padding-bottom': 'var(--q-space-lg)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__clock-pointer:before, ${selector}__clock-pointer:after`,
        content: '""',
        position: 'absolute',
        left: '50%',
        'border-radius': '50%',
        background: 'currentColor',
        transform: 'translateX(-50%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pointer:before`,
        bottom: '-4px',
        width: '8px',
        height: '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pointer:after`,
        top: '-3px',
        height: '6px',
        width: '6px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pointer`,
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
        [symbols.selector]: (selector) => `${selector}__clock-pointer:before`,
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
        [symbols.selector]: (selector) => `${selector}__clock-pointer:after`,
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
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        border: '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link`,
        opacity: '0.56',
        outline: '0',
        transition: 'opacity 0.3s ease-out'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link:hover`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link:focus`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link:focus-visible`,
        opacity: '1',
        outline: '2px solid currentColor',
        'outline-offset': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link`,
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
        [symbols.selector]: (selector) => `${selector}__link--active`,
        color:
          'color-mix(in oklab, var(--q-on-primary-container) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary-container) var(--un-bg-opacity), transparent)',
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link:hover`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link:focus`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__link--active`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container-parent`,
        padding: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container-parent`,
        padding: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container-child`,
        'border-radius': '50%',
        background: 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container-child`,
        'border-radius': '50%',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-highest) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-circle`,
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-circle`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-center`,
        height: '6px',
        width: '6px',
        margin: 'auto',
        'border-radius': '50%',
        'min-height': '0',
        background: 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-center`,
        margin: 'auto',
        'border-radius': '50%',
        'background-color': 'currentColor',
        height: '6px',
        width: '6px',
        'min-height': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-position`,
        position: 'absolute',
        'min-height': '32px',
        width: '32px',
        height: '32px',
        'font-size': 'var(--q-body-small-size)',
        'line-height': '32px',
        margin: '0',
        padding: '0',
        // transform comes from the yield below: same position, no rtl marker
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-position`,
        'font-size': 'var(--q-body-small-size)',
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
        [symbols.selector]: (selector) => `${selector}__clock-position--active`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__clock-position--disable`,
        opacity: '40%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__clock-position--disable`,
        opacity: '0.4'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-position--active`,
        'background-color': 'var(--q-primary)',
        color: '#fff'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-0`,
        top: '0%',
        left: '50% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-0`,
        top: '0%',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-1`,
        top: '6.7%',
        left: '75% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-1`,
        top: '6.7%',
        left: '75%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-2`,
        top: '25%',
        left: '93.3% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-2`,
        top: '25%',
        left: '93.3%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-3`,
        top: '50%',
        left: '100% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-3`,
        top: '50%',
        left: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-4`,
        top: '75%',
        left: '93.3% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-4`,
        top: '75%',
        left: '93.3%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-5`,
        top: '93.3%',
        left: '75% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-5`,
        top: '93.3%',
        left: '75%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-6`,
        top: '100%',
        left: '50% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-6`,
        top: '100%',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-7`,
        top: '93.3%',
        left: '25% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-7`,
        top: '93.3%',
        left: '25%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-8`,
        top: '75%',
        left: '6.7% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-8`,
        top: '75%',
        left: '6.7%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-9`,
        top: '50%',
        left: '0% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-9`,
        top: '50%',
        left: '0%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-10`,
        top: '25%',
        left: '6.7% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-10`,
        top: '25%',
        left: '6.7%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-11`,
        top: '6.7%',
        left: '25% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-11`,
        top: '6.7%',
        left: '25%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-12`,
        top: '15%',
        left: '50% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-12`,
        top: '15%',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-13`,
        top: '19.69%',
        left: '67.5% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-13`,
        top: '19.69%',
        left: '67.5%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-14`,
        top: '32.5%',
        left: '80.31% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-14`,
        top: '32.5%',
        left: '80.31%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-15`,
        top: '50%',
        left: '85% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-15`,
        top: '50%',
        left: '85%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-16`,
        top: '67.5%',
        left: '80.31% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-16`,
        top: '67.5%',
        left: '80.31%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-17`,
        top: '80.31%',
        left: '67.5% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-17`,
        top: '80.31%',
        left: '67.5%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-18`,
        top: '85%',
        left: '50% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-18`,
        top: '85%',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-19`,
        top: '80.31%',
        left: '32.5% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-19`,
        top: '80.31%',
        left: '32.5%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-20`,
        top: '67.5%',
        left: '19.69% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-20`,
        top: '67.5%',
        left: '19.69%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-21`,
        top: '50%',
        left: '15% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-21`,
        top: '50%',
        left: '15%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-22`,
        top: '32.5%',
        left: '19.69% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-22`,
        top: '32.5%',
        left: '19.69%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-23`,
        top: '19.69%',
        left: '32.5% /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clock-pos-23`,
        top: '19.69%',
        left: '32.5%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__now-button`,
        'background-color': 'var(--q-primary)',
        color: '#fff',
        top: '12px',
        right: '12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__now-button`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)',
        top: '12px',
        right: '12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--portrait`,
        display: 'inline-flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait .q-time__header`,
        'border-top-right-radius': 'inherit',
        'min-height': '86px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait .q-time__header-ampm`,
        'margin-left': '12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait.q-time--bordered .q-time__content`,
        margin: '1px 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape`,
        display: 'inline-flex',
        'align-items': 'stretch',
        'min-width': '420px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape > div`,
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape .q-time__header`,
        'border-bottom-left-radius': 'inherit',
        'min-width': '156px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape .q-time__header-ampm`,
        'margin-top': '12px'
      }
    }
  ]
] as Rule[]
