import type { Rule } from '@unocss/core'

/**
 * The reference builds the uploader as a 320px card: a full-width header, a
 * bordered list, and one bordered row per file. The port previously drew a
 * dashed drop border on the root and filled each file row, so the root's box,
 * the list box and the per-file borders are stated as the reference states
 * them, and `.q-uploader__dnd` carries the dashed drop hint instead.
 */
const fileBorder =
  'color-mix(in oklab, rgba(0,0,0,0.12) var(--un-border-opacity), transparent)'
const darkBorder =
  'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--un-border-opacity), transparent)'
const whiteText =
  'color-mix(in oklab, #fff var(--un-text-opacity), transparent)'
const lightBoxShadow =
  '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
const darkBoxShadow =
  '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
const dndSurface =
  'color-mix(in oklab, rgba(255, 255, 255, 0.6) var(--un-bg-opacity), transparent)'

export const uploaderRules = [
  [
    /^q-uploader$/,
    function* (_, { symbols }) {
      // .q-uploader
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'vertical-align': 'top',
        'border-radius': 'var(--q-corner-extra-small)',
        'background-color':
          'color-mix(in oklab, #fff var(--un-bg-opacity), transparent)',
        width: '320px',
        'max-height': '320px',
        'box-shadow': lightBoxShadow,
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'border-color': darkBorder,
        'box-shadow': darkBoxShadow
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-uploader__dnd`,
        'background-color':
          'color-mix(in oklab, rgba(255, 255, 255, 0.3) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-uploader__file`,
        'border-color': darkBorder
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-uploader__overlay`,
        color: whiteText,
        'background-color':
          'color-mix(in oklab, rgba(255, 255, 255, 0.3) var(--un-bg-opacity), transparent)'
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
        [symbols.selector]: (selector) => `${selector}__header`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'margin-bottom': 'var(--q-space-sm)',
        color: whiteText,
        width: '100%',
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header .q-uploader__header-content`,
        padding: '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-content`,
        padding: '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__list`,
        display: 'flex',
        'flex-direction': 'column',
        gap: 'var(--q-space-sm)',
        padding: '8px',
        flex: '1 1 auto',
        'min-height': '60px',
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__file`,
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-sm)',
        'border-color': fileBorder,
        'border-top-left-radius': '4px',
        'border-bottom-right-radius': '0',
        'border-top-right-radius': '4px',
        'border-bottom-left-radius': '0',
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__file:before`,
        'background-color': 'currentColor',
        opacity: '0.04',
        'pointer-events': 'none',
        content: 'var(--un-content)',
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__file + .q-uploader__file`,
        'margin-top': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__file .q-circular-progress`,
        'font-size': '24px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__add`
        // Add
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__badge`
        // Badge
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__btn`
        // Button
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__clear`
        // Clear
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dnd`,
        // `outline: 1px dashed currentColor` in the source bundle: the minifier
        // folded the shorthand into `outline-color`, so the width/style are
        // restated here and the colour longhand keeps the reference's shape.
        'outline-color':
          'color-mix(in oklab, 1px dashed currentColor var(--un-outline-opacity), transparent)',
        'outline-width': '1px',
        'outline-style': 'dashed',
        'outline-offset': '-4px',
        'background-color': dndSurface
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__drop-zone`
        // Drop zone
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`
        // Progress
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__status`
        // Status
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__file--img`,
        color: whiteText,
        // The reference's own value is a mangled `color-mix` (`50% 50%` is not
        // a colour), so the declaration drops in the reference too.
        'background-color':
          'color-mix(in oklab, 50% 50% var(--un-bg-opacity), transparent)',
        height: '200px',
        'min-width': '200px',
        'background-repeat': 'no-repeat'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__file--img:before`,
        content: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__file--img .q-circular-progress`,
        color: whiteText
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__file--img .q-uploader__file-header`,
        'padding-bottom': 'var(--q-space-xl)',
        'background-image':
          'linear-gradient( to bottom, rgba(0, 0, 0, 0.7) 20%, rgba(255, 255, 255, 0) )'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-color':
          'color-mix(in oklab, rgba(0,0,0,0.12) var(--un-border-opacity), transparent)',
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input`,
        opacity: '0',
        width: '100%',
        height: '100%',
        cursor: 'pointer !important',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input::file-selector-button`,
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input::-webkit-file-upload-button`,
        cursor: 'pointer !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__spinner`,
        'font-size': '24px',
        'margin-right': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__overlay`,
        'font-size': '36px',
        color: '#000',
        'background-color': 'rgba(255, 255, 255, 0.6)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__file-header`,
        position: 'relative',
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': 'var(--q-space-xs)',
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__file-header-content`,
        'padding-right': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__file-status`,
        'font-size': '24px',
        'margin-right': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title`,
        'font-size': '14px',
        // The gate resolves the reference's `var(--fontWeight-bold)` to its
        // numeric weight, so the literal is stated rather than `bold`.
        'font-weight': '700',
        'line-height': '1.285714',
        'word-break': 'break-word'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__subtitle`,
        'font-size': '12px',
        'line-height': '1.5'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--disable .q-uploader__header`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--disable .q-uploader__list`,
        'pointer-events': 'none'
      }
    }
  ]
] as Rule[]
