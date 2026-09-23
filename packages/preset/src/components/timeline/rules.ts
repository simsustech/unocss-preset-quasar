import type { Rule } from '@unocss/core'

export const timelineRules = [
  [
    /^q-timeline$/,
    function* (_, { symbols }) {
      // .q-timeline
      yield {
        [symbols.selector]: (selector) => `${selector} h6`,
        'line-height': 'inherit'
      }
      yield {
        display: 'flex',
        'flex-direction': 'column',
        // Reference `.q-timeline { padding: calc(var(--spacing) * 0);
        // width: 100%; list-style: none }` — the track has no padding of its
        // own; the entries and dots carry the offsets.
        padding: 'calc(var(--spacing) * 0)',
        width: '100%',
        'list-style': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-timeline__subtitle`,
        opacity: '70%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`
        // Dense
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--responsive`
        // Responsive
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--reverse`
        // Reverse
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__entry`,
        position: 'relative',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '22px',
        'padding-bottom': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__entry:last-child .q-timeline__dot:after`,
        content: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__entry:last-child`,
        'padding-bottom': 'calc(var(--spacing) * 0) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__heading`,
        // Reference `.q-timeline__heading { position: relative }`.
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dot`,
        position: 'absolute',
        left: '-24px',
        top: 0,
        bottom: 0,
        width: '15px',
        height: '12px',
        'border-radius': '50%',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dot .q-icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '16px',
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)',
        'line-height': '38px',
        height: '38px',
        width: '100%',
        top: '0',
        left: '0',
        right: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dot .q-icon > img`,
        width: '1em',
        height: '1em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dot .q-icon > svg`,
        width: '1em',
        height: '1em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__dot:before, ${selector}__dot:after`,
        '--un-content': "''",
        content: 'var(--un-content)',
        'background-color': 'currentColor',
        display: 'block',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dot:before`,
        // Reference states the ring as longhands with a 1px border.
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'transparent',
        'border-radius': '100%',
        height: '15px',
        width: '15px',
        top: '4px',
        left: '0',
        transition: 'background 0.3s ease-in-out, border 0.3s ease-in-out'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dot:after`,
        width: '3px',
        opacity: '0.4',
        top: '24px',
        bottom: '0',
        left: '6px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        'padding-left': 'var(--q-space-md)',
        'padding-bottom': 'var(--q-space-xl)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__subtitle`,
        // Reference `.q-timeline__subtitle`: overline typography at 60% opacity.
        'font-size': 'var(--q-body-small-size)',
        'letter-spacing': '1px',
        'font-weight': 'var(--fontWeight-bold)',
        'margin-bottom': '8px',
        opacity: '60%',
        'text-transform': 'uppercase',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__entry--icon .q-timeline__dot`,
        width: '31px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__entry--icon .q-timeline__dot:before`,
        height: '30px',
        width: '30px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__entry--icon .q-timeline__subtitle`,
        'padding-top': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__entry--icon .q-timeline__dot:after`,
        top: '41px',
        left: '14px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title`,
        'margin-top': '0',
        'margin-bottom': '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dot-img`,
        position: 'absolute',
        top: '4px',
        left: '0',
        right: '0',
        height: '31px',
        width: '31px',
        'background-color': 'currentColor',
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--right .q-timeline__entry`,
        'padding-left': '40px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--right .q-timeline__entry--icon .q-timeline__dot`,
        left: '-8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--right .q-timeline__dot`,
        left: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--left .q-timeline__heading`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--left .q-timeline__entry`,
        'padding-right': '40px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--left .q-timeline__entry--icon .q-timeline__dot`,
        right: '-8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--left .q-timeline__content`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--left .q-timeline__title`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--left .q-timeline__subtitle`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense--left .q-timeline__dot`,
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--comfortable`,
        display: 'table'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__heading`,
        display: 'table-row',
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '200%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__heading > div`,
        display: 'table-cell'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__entry`,
        display: 'table-row',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__entry--icon .q-timeline__content`,
        'padding-top': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__subtitle`,
        display: 'table-cell',
        'vertical-align': 'top'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__dot`,
        display: 'table-cell',
        'vertical-align': 'top'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__content`,
        display: 'table-cell',
        'vertical-align': 'top'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__subtitle`,
        width: '35%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable .q-timeline__dot`,
        position: 'relative',
        'min-width': '31px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--right .q-timeline__heading .q-timeline__heading-title`,
        'margin-left': '-50px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--right .q-timeline__subtitle`,
        'text-align': 'right',
        'padding-right': '30px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--right .q-timeline__content`,
        'padding-left': '30px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--right .q-timeline__entry--icon .q-timeline__dot`,
        left: '-8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--left .q-timeline__heading`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--left .q-timeline__heading .q-timeline__heading-title`,
        'margin-right': '-50px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--left .q-timeline__subtitle`,
        'padding-left': '30px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--left .q-timeline__content`,
        'padding-right': '30px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--left .q-timeline__content`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--left .q-timeline__title`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--left .q-timeline__entry--icon .q-timeline__dot`,
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--comfortable--left .q-timeline__dot`,
        right: '-8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__heading-title`,
        'text-align': 'center',
        'margin-left': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry`,
        display: 'block',
        margin: '0',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__subtitle`,
        display: 'block',
        margin: '0',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--loose .q-timeline__dot`,
        display: 'block',
        margin: '0',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__content`,
        display: 'block',
        margin: '0',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--loose .q-timeline__dot`,
        position: 'absolute',
        left: '50%',
        'margin-left': '-7.15px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry`,
        'padding-bottom': 'var(--q-space-xl)',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry--icon .q-timeline__dot`,
        'margin-left': '-15px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry--icon .q-timeline__subtitle`,
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '38px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry--icon .q-timeline__content`,
        'padding-top': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry--left .q-timeline__content`,
        float: 'left',
        'padding-right': '30px',
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry--right .q-timeline__subtitle`,
        float: 'left',
        'padding-right': '30px',
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry--left .q-timeline__subtitle`,
        float: 'right',
        'text-align': 'left',
        'padding-left': '30px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__entry--right .q-timeline__content`,
        float: 'right',
        'text-align': 'left',
        'padding-left': '30px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__subtitle`,
        width: '50%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--loose .q-timeline__content`,
        width: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__heading-title`,
        // Reference states the vertical padding as logical longhands.
        margin: 'calc(var(--spacing) * 0)',
        'padding-inline': '0',
        // quasar: this value is Quasar's own, not a forked token
        'padding-block': '32px'
      }
      yield {
        // The heading's first/last child zeroes one side of the heading's own
        // padding. The reference rewrites the member to its sibling
        // `.q-timeline__heading` (sel.replace(/__heading-title$/, '__heading')),
        // which the mechanical root+suffix widening cannot express, so the
        // sibling selector is written out here.
        [symbols.selector]: (selector) =>
          `${selector}__heading:first-child .q-timeline__heading-title`,
        'padding-top': 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__heading:last-child .q-timeline__heading-title`,
        'padding-bottom': 'calc(var(--spacing) * 0)'
      }
    }
  ]
] as Rule[]
