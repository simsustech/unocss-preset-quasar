import type { Rule } from '@unocss/core'

export const fabRules = [
  [
    /^q-fab$/,
    function* (_, { symbols }) {
      // .q-fab
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        // The reference declares this; the fold lost the entry that carried it.
        'vertical-align': 'middle',
        'border-radius': 'var(--q-fab-radius)',
        width: 'var(--q-fab-size)',
        height: 'var(--q-fab-size)',
        'min-width': 'auto',
        background: 'var(--q-fab-bg)',
        color: 'var(--q-fab-color)',
        'box-shadow': 'var(--q-elevation-level3)',
        // Contains the absolute .q-focus-helper (quasar.css `.q-fab` has it).
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--mini`,
        width: 'var(--q-fab-mini-size)',
        height: 'var(--q-fab-mini-size)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--form-rounded`,
        'border-radius': 'var(--q-corner-extra-large)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--form-square`,
        'border-radius': 'var(--q-corner-extra-small)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        transition: 'opacity 0.4s, transform 0.4s',
        opacity: '100%',
        transform: 'rotate(0deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        opacity: '100%',
        rotate: '0deg',
        transition: 'opacity 0.4s, transform 0.4s',
        position: 'relative !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-fab__icon-holder--opened ${selector}__icon`,
        opacity: '0%',
        rotate: '180deg'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__active-icon`,
        transition: 'opacity 0.4s, transform 0.4s',
        opacity: '0%',
        transform: 'rotate(-180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__active-icon`,
        'margin-right': '-20px !important',
        opacity: '0%',
        rotate: '-180deg',
        transition: 'opacity 0.4s, transform 0.4s',
        left: '-20px !important',
        position: 'relative !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-fab__icon-holder--opened ${selector}__active-icon`,
        opacity: '100%',
        rotate: '0deg'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external`,
        position: 'absolute',
        padding: '0 8px',
        transition: 'opacity 0.18s cubic-bezier(0.65, 0.815, 0.735, 0.395)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external`,
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': '0',
        'background-color': 'transparent',
        transition: 'opacity 0.18s cubic-bezier(0.65, 0.815, 0.735, 0.395)',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-hidden`,
        opacity: '0',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-left`,
        top: '50%',
        left: '-12px',
        transform: 'translate(-100%, -50%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-left`,
        transform: 'translateY(-50%)',
        top: '50%',
        left: '-12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-right`,
        top: '50%',
        right: '-12px',
        transform: 'translate(100%, -50%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-right`,
        transform: 'translateY(-50%)',
        top: '50%',
        right: '-12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-bottom`,
        bottom: '-12px',
        left: '50%',
        transform: 'translate(-50%, 100%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-bottom`,
        transform: 'translateX(-50%)',
        bottom: '-12px',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-top`,
        top: '-12px',
        left: '50%',
        transform: 'translate(-50%, -100%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--external-top`,
        transform: 'translateX(-50%)',
        top: '-12px',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--internal`,
        padding: '0',
        transition:
          'font-size 0.12s cubic-bezier(0.65, 0.815, 0.735, 0.395), max-height 0.12s cubic-bezier(0.65, 0.815, 0.735, 0.395), opacity 0.07s cubic-bezier(0.65, 0.815, 0.735, 0.395)',
        'max-height': '30px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--internal-hidden`,
        'font-size': '0',
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--internal-top`,
        'padding-bottom': '0.12em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__label--internal-top.q-fab__label--internal-hidden`,
        'max-height': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--internal-bottom`,
        'padding-top': '0.12em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__label--internal-bottom.q-fab__label--internal-hidden`,
        'max-height': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--internal-left`,
        'padding-left': '0.285em',
        'padding-right': '0.571em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--internal-right`,
        'padding-right': '0.285em',
        'padding-left': '0.571em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon-holder`,
        'min-width': '24px',
        'min-height': '24px',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon-holder:before`,
        content: '""'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__icon-holder--opened .q-fab__icon`,
        transform: 'rotate(180deg)',
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__icon-holder--opened .q-fab__active-icon`,
        transform: 'rotate(0deg)',
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        position: 'absolute',
        'pointer-events': 'none',
        'align-items': 'center',
        'justify-content': 'center',
        'align-self': 'center',
        padding: '3px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions .q-btn`,
        margin: '5px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions > *`,
        filter: 'opacity(0)',
        transform: 'scale(0.4)',
        transition: 'filter 0.18s ease-out, transform 0.18s ease-out'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        padding: '3px',
        opacity: '0%',
        'pointer-events': 'none',
        transition: 'transform 0.18s ease-in, opacity 0.18s ease-in',
        'align-items': 'center',
        'align-self': 'center',
        'justify-content': 'center',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--opened`,
        'pointer-events': 'all !important',
        opacity: '100%',
        transform: 'translateY(0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--up`,
        'margin-bottom': '9px',
        'margin-left': '-28px',
        'flex-direction': 'column-reverse',
        width: '56px',
        'transform-origin': '50% 100%',
        transform: 'translateY(62px)',
        bottom: '100%',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--down`,
        'margin-top': '9px',
        'margin-left': '-28px',
        'flex-direction': 'column',
        width: '56px',
        'transform-origin': '50% 0',
        transform: 'translateY(-62px)',
        top: '100%',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--left`,
        'margin-right': '9px',
        'flex-direction': 'row-reverse',
        height: '56px',
        'transform-origin': '100% 50%',
        transform: 'translateX(62px)',
        right: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--right`,
        'margin-left': '9px',
        height: '56px',
        'transform-origin': '0 50%',
        transform: 'translateX(-62px)',
        left: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--right`,
        height: '56px',
        left: '100% /* rtl:ignore */',
        'margin-left': '9px /* rtl:ignore */',
        'flex-direction': 'row /* rtl:row-reverse */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--left`,
        height: '56px',
        right: '100% /* rtl:ignore */',
        'margin-right': '9px /* rtl:ignore */',
        'flex-direction': 'row-reverse /* rtl:row */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--up`,
        width: '56px',
        bottom: '100%',
        'margin-bottom': '9px',
        'flex-direction': 'column-reverse',
        left: '50%',
        'margin-left': '-28px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--down`,
        width: '56px',
        top: '100%',
        'margin-top': '9px',
        'flex-direction': 'column',
        left: '50%',
        'margin-left': '-28px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--opened`,
        'pointer-events': 'all'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--opened > *`,
        filter: 'opacity(1)',
        transform: 'scale(1)',
        'transition-delay': 'calc(var(--q-fab-stagger) * (sibling-index() - 1))'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions--closed > *`,
        'transition-delay':
          'calc(var(--q-fab-stagger) * (sibling-count() - sibling-index()))'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--align-left > .q-fab__actions--up`,
        'align-items': 'flex-start',
        left: '28px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--align-left > .q-fab__actions--down`,
        'align-items': 'flex-start',
        left: '28px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--align-right > .q-fab__actions--up`,
        'align-items': 'flex-end',
        left: 'auto',
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--align-right > .q-fab__actions--down`,
        'align-items': 'flex-end',
        left: 'auto',
        right: '0'
      }
    }
  ]
] as Rule[]
