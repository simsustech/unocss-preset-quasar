import type { Rule } from '@unocss/core'

/**
 * The cell rules state one border colour role for every box in the table
 * (`td`, `th`, `thead`, `tr`) and the dark variant re-states it. Transcribed
 * from `specs/reference/raw/reference-bundle.css.txt`.
 */
const outlineVariant =
  'color-mix(in oklab, var(--q-outline-variant) var(--un-border-opacity), transparent)'
const onSurfaceText =
  'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)'
const onSurfaceVariantText =
  'color-mix(in oklab, var(--q-on-surface-variant) var(--un-text-opacity), transparent)'
const selectedText =
  'color-mix(in oklab, var(--q-on-secondary-container) var(--un-text-opacity), transparent)'

/** The cell box: zero border width, a solid style and the outline role. */
const cellBox = {
  'border-width': '0px',
  'border-color': outlineVariant,
  'border-style': 'solid',
  'background-color': 'inherit'
}

export const tableRules = [
  [
    /^q-table$/,
    function* (_, { symbols }) {
      // .q-table
      yield {
        width: '100%',
        'max-width': '100%',
        'border-spacing': '0',
        'border-collapse': 'separate'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} tbody td`,
        'font-size': '13px',
        height: '48px',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} tbody td:before`,
        'pointer-events': 'none',
        'background-color': 'var(--q-on-surface)',
        opacity: 'var(--q-hover-opacity, 0.08)',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.desktop ${selector} > tbody > tr:not(.q-tr--no-hover):hover > td:not(.q-td--no-hover):before`,
        content: '""'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} tbody tr.selected td`,
        color: selectedText
      }
      yield {
        [symbols.selector]: (selector) => `${selector} td`,
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': '7px',
        ...cellBox
      }
      yield {
        [symbols.selector]: (selector) => `${selector} th`,
        'font-size': '12px',
        color: onSurfaceVariantText,
        'font-weight': 'var(--fontWeight-medium)',
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': '7px',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        ...cellBox
      }
      yield {
        [symbols.selector]: (selector) => `${selector} thead`,
        'border-width': '0px',
        'border-color': outlineVariant,
        'border-style': 'solid'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} thead tr`,
        height: '48px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} tr`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) => `${selector} th.sortable`,
        cursor: 'pointer !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} th.sort-desc .q-table__sort-icon`,
        rotate: '180deg'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} th.sortable:hover .q-table__sort-icon`,
        opacity: '0.64'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} th.sorted .q-table__sort-icon`,
        opacity: '0.86 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-virtual-scroll__padding td`,
        padding: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-virtual-scroll__padding tr`,
        height: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector} th`,
        color: 'var(--q-on-surface-variant)',
        'border-color': 'var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector} tbody td:before`,
        'background-color': 'var(--q-on-surface)',
        opacity: 'var(--q-hover-opacity-dark, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} tbody td:after`,
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) var(--un-bg-opacity), transparent)',
        'pointer-events': 'none',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} tbody tr.selected td:after`,
        content: 'var(--un-content)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector} tbody td:after`,
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector} td`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector} thead`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector} tr`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector} tbody tr.selected td`,
        color: 'var(--q-on-secondary-container)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-color': outlineVariant,
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}--bordered`,
        // The body--dark scope takes the faint role, matching the reference.
        'border-color': 'var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--cell-separator .q-table__top`,
        'border-bottom': '1px solid var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--cell-separator tbody tr:not(:last-child) > td`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--cell-separator td`,
        'border-left-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--cell-separator td:first-child`,
        'border-left': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--cell-separator th`,
        'border-left-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--cell-separator th:first-child`,
        'border-left': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--cell-separator thead th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--cell-separator thead tr:last-child th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--cell-separator.q-table--loading tr:nth-last-child(2) th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal-separator tbody tr:not(:last-child) > td`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal-separator thead th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical-separator .q-table__top`,
        'border-bottom': '1px solid var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical-separator td`,
        'border-left-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical-separator td:first-child`,
        'border-left': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical-separator th`,
        'border-left-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical-separator th:first-child`,
        'border-left': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical-separator thead tr:last-child th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical-separator.q-table--loading tr:nth-last-child(2) th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flat`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--grid`,
        'border-radius': 'var(--q-corner-extra-small)',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--grid .q-table__bottom`,
        'border-top': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--grid .q-table__grid-content`,
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--grid .q-table__linear-progress`,
        bottom: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--grid .q-table__middle`,
        'margin-bottom': '4px',
        'min-height': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--grid .q-table__middle thead`,
        'border-width': '0px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--grid .q-table__middle thead th`,
        'border-width': '0px !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--grid .q-table__top`,
        'padding-bottom': 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--grid.fullscreen`,
        background: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table tbody td`,
        height: '28px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table tbody tr`,
        height: '28px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table thead tr`,
        height: '28px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-table td`,
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table td:first-child`,
        'padding-left': '16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table td:last-child`,
        'padding-right': '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-table th`,
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table th:first-child`,
        'padding-left': '16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table th:last-child`,
        'padding-right': '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-table__bottom`,
        'min-height': '33px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table__bottom-item`,
        'margin-right': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table__select .q-field__control`,
        padding: '0',
        'min-height': 'var(--q-size-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table__select .q-field__native`,
        padding: '0',
        'min-height': 'var(--q-size-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table__select .q-field__marginal`,
        height: '24px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-table__sort-icon`,
        'font-size': '110%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-table__top`,
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': '6px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'border-color': outlineVariant,
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-table__bottom`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark tbody td:before`,
        'background-color': 'var(--q-on-surface)',
        opacity: 'var(--q-hover-opacity-dark, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark tbody tr.selected td`,
        color: selectedText
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark tbody td:after`,
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark td`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark th`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark thead`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark tr`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark.q-table--cell-separator .q-table__top`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark.q-table--vertical-separator .q-table__top`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--loading`
        // Loading state
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-hover`
        // No hover effect
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-wrap td`,
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-wrap th`,
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--separator`
        // Auto separator
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--fullscreen`,
        position: 'fixed',
        inset: '0',
        'z-index': '6000'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container`,
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__container > .q-inner-loading`,
        'border-radius': 'inherit!important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__container > div:first-child`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__container > div:last-child`,
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__middle`,
        flex: '1 1 auto',
        'max-width': '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__top`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__top .q-table__control`,
        'flex-wrap': 'wrap'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__top`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'font-size': '12px',
        color: onSurfaceText,
        'padding-block': 'var(--q-space-xs)',
        'padding-left': '16px',
        'padding-right': '14px',
        'min-height': '50px',
        'border-top': '1px solid var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__bottom .q-table__control`,
        'min-height': 'var(--q-size-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__bottom`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header`,
        'font-weight': 600,
        'text-align': 'left'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-row`,
        'border-bottom': '2px solid var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__linear-progress`,
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__loading`,
        position: 'absolute',
        inset: '0',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'background-color': 'rgba(255, 255, 255, 0.7)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__nav`,
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sort-icon`,
        'font-size': '120%',
        opacity: '0%',
        transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__grid-content`,
        display: 'grid'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__card`,
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container)',
        'border-radius': 'var(--q-corner-extra-small)',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__card .q-table__middle`,
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__card .q-table__top`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__card .q-table__bottom`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__card`,
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title`,
        'font-size': '20px',
        'letter-spacing': '0.005em',
        'font-weight': 'var(--fontWeight-normal)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__separator`,
        'min-width': '8px !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`,
        height: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress th`,
        padding: '0 !important',
        'border-width': '0px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__progress .q-linear-progress`,
        position: 'absolute',
        bottom: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom-nodata-icon`,
        'font-size': '200%',
        'margin-right': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom-item`,
        'margin-right': '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__control`,
        display: 'flex',
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sort-icon--left`,
        'margin-left': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sort-icon--center`,
        'margin-left': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__sort-icon--right`,
        'margin-right': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--col-auto-width`,
        width: '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__card--dark`,
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)',
        // The dark card's edge is the dark outline-variant role, not a white
        // overlay literal.
        'border-color': 'var(--dark-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__grid-item-card`,
        'vertical-align': 'top',
        padding: '12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__grid-item-card .q-separator`,
        'margin-inline': '0',
        'margin-block': '12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__grid-item-row + .q-table__grid-item-row`,
        'margin-top': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__grid-item-title`,
        opacity: '0.54',
        'font-weight': 'var(--fontWeight-medium)',
        'font-size': '12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__grid-item-value`,
        'font-size': '13px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__grid-item`,
        padding: '4px',
        transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__grid-item--selected`,
        transform: 'scale(0.95)'
      }
    }
  ]
] as Rule[]
