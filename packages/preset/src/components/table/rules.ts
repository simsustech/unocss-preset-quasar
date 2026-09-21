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
      yield {
        width: '100%',
        'max-width': '100%',
        'border-spacing': '0',
        'border-collapse': 'separate'
      }
      // The reference keeps `.q-table` a table box; the wrapper, not the table,
      // is what gets positioned. Declaring flex here would take the element out
      // of table layout and stack the rows as flex items.
      yield {
        [symbols.selector]: (sel) => `${sel} tbody td`,
        'font-size': '13px',
        height: '48px',
        position: 'relative'
      }
      // The hover overlay lives on `:before` and is only given content on a
      // desktop pointer, so it cannot paint on touch.
      yield {
        [symbols.selector]: (sel) => `${sel} tbody td:before`,
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
        [symbols.selector]: (sel) =>
          `body.desktop ${sel} > tbody > tr:not(.q-tr--no-hover):hover > td:not(.q-td--no-hover):before`,
        content: '""'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} tbody tr.selected td`,
        color: selectedText
      }
      yield {
        [symbols.selector]: (sel) => `${sel} td`,
        'padding-inline': '16px',
        'padding-block': '7px',
        ...cellBox
      }
      yield {
        [symbols.selector]: (sel) => `${sel} th`,
        'font-size': '12px',
        color: onSurfaceVariantText,
        'font-weight': 'var(--fontWeight-medium)',
        'padding-inline': '16px',
        'padding-block': '7px',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        ...cellBox
      }
      yield {
        [symbols.selector]: (sel) => `${sel} thead`,
        'border-width': '0px',
        'border-color': outlineVariant,
        'border-style': 'solid'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} thead tr`,
        height: '48px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} tr`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (sel) => `${sel} th.sortable`,
        cursor: 'pointer !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} th.sort-desc .q-table__sort-icon`,
        rotate: '180deg'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} th.sortable:hover .q-table__sort-icon`,
        opacity: '0.64'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} th.sorted .q-table__sort-icon`,
        opacity: '0.86 !important'
      }
      // Virtual scroll's two spacer rows must not add height to the body.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-virtual-scroll__padding td`,
        padding: '0 !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-virtual-scroll__padding tr`,
        height: '0 !important'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      // Dark: the surface roles flip through the tokens, so only the roles that
      // have no light counterpart (`--q-hover-opacity-dark`) are restated.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} th`,
        color: 'var(--q-on-surface-variant)',
        'border-color': 'var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} tbody td:before`,
        'background-color': 'var(--q-on-surface)',
        opacity: 'var(--q-hover-opacity-dark, 0.12)'
      }
      // The selection and hover overlays sit on `:after`, above the `:before`
      // hover film, and only a selected row is given content.
      yield {
        [symbols.selector]: (sel) => `${sel} tbody td:after`,
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
        [symbols.selector]: (sel) => `${sel} tbody tr.selected td:after`,
        content: 'var(--un-content)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} tbody td:after`,
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) var(--un-bg-opacity), transparent)'
      }
      for (const part of ['td', 'thead', 'tr']) {
        yield {
          [symbols.selector]: (sel) => `.body--dark ${sel} ${part}`,
          'border-color': outlineVariant
        }
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} tbody tr.selected td`,
        color: 'var(--q-on-secondary-container)'
      }
    }
  ],
  [
    /^q-table--bordered$/,
    function* (_, { symbols }) {
      yield {
        'border-color': outlineVariant,
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'border-color': 'var(--q-outline)'
      }
    }
  ],
  [
    /^q-table--cell-separator$/,
    function* (_, { symbols }) {
      // Cells carry the separators, and the first cell in each row drops the
      // leading one so the outer edge stays clean.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__top`,
        'border-bottom': '1px solid var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} tbody tr:not(:last-child) > td`,
        'border-bottom-width': '1px'
      }
      for (const cell of ['td', 'th']) {
        yield {
          [symbols.selector]: (sel) => `${sel} ${cell}`,
          'border-left-width': '1px'
        }
        yield {
          [symbols.selector]: (sel) => `${sel} ${cell}:first-child`,
          'border-left': '0'
        }
      }
      yield {
        [symbols.selector]: (sel) => `${sel} thead th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} thead tr:last-child th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-table--loading tr:nth-last-child(2) th`,
        'border-bottom-width': '1px'
      }
    }
  ],
  [
    /^q-table--horizontal-separator$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} tbody tr:not(:last-child) > td`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} thead th`,
        'border-bottom-width': '1px'
      }
    }
  ],
  [
    /^q-table--vertical-separator$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__top`,
        'border-bottom': '1px solid var(--q-outline-variant)'
      }
      for (const cell of ['td', 'th']) {
        yield {
          [symbols.selector]: (sel) => `${sel} ${cell}`,
          'border-left-width': '1px'
        }
        yield {
          [symbols.selector]: (sel) => `${sel} ${cell}:first-child`,
          'border-left': '0'
        }
      }
      yield {
        [symbols.selector]: (sel) => `${sel} thead tr:last-child th`,
        'border-bottom-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-table--loading tr:nth-last-child(2) th`,
        'border-bottom-width': '1px'
      }
    }
  ],
  [
    /^q-table--flat$/,
    () => ({
      'box-shadow': 'none'
    })
  ],
  [
    /^q-table--grid$/,
    function* (_, { symbols }) {
      yield {
        'border-radius': '4px',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__bottom`,
        'border-top': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__grid-content`,
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__linear-progress`,
        bottom: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__middle`,
        'margin-bottom': '4px',
        'min-height': '2px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__middle thead`,
        'border-width': '0px !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__middle thead th`,
        'border-width': '0px !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__top`,
        'padding-bottom': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.fullscreen`,
        background: 'inherit'
      }
    }
  ],
  [
    /^q-table--dense$/,
    function* (_, { symbols }) {
      // The dense variant reaches into a nested `.q-table`: the class lands on
      // the container while the table itself keeps its own class.
      for (const part of ['tbody td', 'tbody tr', 'thead tr']) {
        yield {
          [symbols.selector]: (sel) => `${sel} .q-table ${part}`,
          height: '28px'
        }
      }
      for (const cell of ['td', 'th']) {
        yield {
          [symbols.selector]: (sel) => `${sel} .q-table ${cell}`,
          'padding-inline': '8px',
          'padding-block': '4px'
        }
        yield {
          [symbols.selector]: (sel) => `${sel} .q-table ${cell}:first-child`,
          'padding-left': '16px'
        }
        yield {
          [symbols.selector]: (sel) => `${sel} .q-table ${cell}:last-child`,
          'padding-right': '16px'
        }
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__bottom`,
        'min-height': '33px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__bottom-item`,
        'margin-right': '8px'
      }
      for (const part of ['control', 'native']) {
        yield {
          [symbols.selector]: (sel) =>
            `${sel} .q-table__select .q-field__${part}`,
          padding: '0',
          'min-height': '24px'
        }
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-table__select .q-field__marginal`,
        height: '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__sort-icon`,
        'font-size': '110%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__top`,
        'padding-inline': '16px',
        'padding-block': '6px'
      }
    }
  ],
  [
    /^q-table--dark$/,
    function* (_, { symbols }) {
      // The dark table is the light one with the dark surface roles: the box
      // shadow is inverted deliberately, so it stays literal.
      yield {
        'border-color': outlineVariant,
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__bottom`,
        'border-color': outlineVariant
      }
      yield {
        [symbols.selector]: (sel) => `${sel} tbody td:before`,
        'background-color': 'var(--q-on-surface)',
        opacity: 'var(--q-hover-opacity-dark, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} tbody tr.selected td`,
        color: selectedText
      }
      yield {
        [symbols.selector]: (sel) => `${sel} tbody td:after`,
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) var(--un-bg-opacity), transparent)'
      }
      for (const part of ['td', 'th', 'thead', 'tr']) {
        yield {
          [symbols.selector]: (sel) => `${sel} ${part}`,
          'border-color': outlineVariant
        }
      }
      for (const modifier of ['cell-separator', 'vertical-separator']) {
        yield {
          [symbols.selector]: (sel) =>
            `${sel}.q-table--${modifier} .q-table__top`,
          'border-color': outlineVariant
        }
      }
    }
  ],
  [
    /^q-table--loading$/,
    () => ({
      // Loading state
    })
  ],
  [
    /^q-table--no-hover$/,
    () => ({
      // No hover effect
    })
  ],
  [
    /^q-table--no-wrap$/,
    function* (_, { symbols }) {
      for (const cell of ['td', 'th']) {
        yield {
          [symbols.selector]: (sel) => `${sel} ${cell}`,
          'white-space': 'nowrap'
        }
      }
    }
  ],
  [
    /^q-table--separator$/,
    () => ({
      // Auto separator
    })
  ],
  [
    /^q-table--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-table--fullscreen$/,
    () => ({
      position: 'fixed',
      inset: '0',
      'z-index': '6000'
    })
  ],
  [
    /^q-table__container$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-inner-loading`,
        'border-radius': 'inherit!important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:first-child`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:last-child`,
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
    }
  ],
  [
    /^q-table__content$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-table__middle$/,
    () => ({
      flex: '1 1 auto',
      'max-width': '100%'
    })
  ],
  [
    /^q-table__top$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'padding-inline': '16px',
        'padding-block': '12px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__control`,
        'flex-wrap': 'wrap'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface)'
      }
    }
  ],
  [
    /^q-table__bottom$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'font-size': '12px',
        color: onSurfaceText,
        'padding-block': '4px',
        'padding-left': '16px',
        'padding-right': '14px',
        'min-height': '50px',
        'border-top': '1px solid var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__control`,
        'min-height': '24px'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface)'
      }
    }
  ],
  [
    /^q-table__header$/,
    () => ({
      'font-weight': 600,
      'text-align': 'left'
    })
  ],
  [
    /^q-table__header-row$/,
    () => ({
      'border-bottom': '2px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-table__linear-progress$/,
    () => ({
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      height: '2px'
    })
  ],
  [
    /^q-table__loading$/,
    () => ({
      position: 'absolute',
      inset: '0',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'rgba(255, 255, 255, 0.7)'
    })
  ],
  [
    /^q-table__nav$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-table__sort-icon$/,
    () => ({
      'font-size': '120%',
      opacity: '0%',
      transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
    })
  ],
  [
    /^q-table__grid-content$/,
    () => ({
      display: 'grid'
    })
  ],
  [
    /^q-table__card$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container)',
        'border-radius': '4px',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__middle`,
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__top`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__bottom`,
        flex: '0 0 auto'
      }
      // Dark: card surface.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container)'
      }
    }
  ],
  [
    /^q-table__title$/,
    function* () {
      yield {
        'font-size': '20px',
        'letter-spacing': '0.005em',
        'font-weight': '400'
      }
    }
  ],
  [
    /^q-table__separator$/,
    function* () {
      yield { 'min-width': '8px !important' }
    }
  ],
  [
    /^q-table__progress$/,
    function* (_, { symbols }) {
      yield { height: '0 !important' }
      yield {
        [symbols.selector]: (sel) => `${sel} th`,
        padding: '0 !important',
        'border-width': '0px !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-linear-progress`,
        position: 'absolute',
        bottom: '0'
      }
    }
  ],
  [
    /^q-table__bottom-nodata-icon$/,
    function* () {
      yield { 'font-size': '200%', 'margin-right': '8px' }
    }
  ],
  [
    /^q-table__bottom-item$/,
    function* () {
      yield { 'margin-right': '16px' }
    }
  ],
  [
    /^q-table__control$/,
    function* () {
      yield { display: 'flex', 'align-items': 'center' }
    }
  ],
  [
    /^q-table__sort-icon--left$/,
    function* () {
      yield { 'margin-left': '4px' }
    }
  ],
  [
    /^q-table__sort-icon--center$/,
    function* () {
      yield { 'margin-left': '4px' }
    }
  ],
  [
    /^q-table__sort-icon--right$/,
    function* () {
      yield { 'margin-right': '4px' }
    }
  ],
  [
    /^q-table--col-auto-width$/,
    function* () {
      yield { width: '1px' }
    }
  ],
  [
    /^q-table__card--dark$/,
    function* () {
      yield {
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)',
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-table__grid-item-card$/,
    function* (_, { symbols }) {
      yield { 'vertical-align': 'top', padding: '12px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-separator`,
        'margin-inline': '0',
        'margin-block': '12px'
      }
    }
  ],
  [
    /^q-table__grid-item-row$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} + .q-table__grid-item-row`,
        'margin-top': '8px'
      }
    }
  ],
  [
    /^q-table__grid-item-title$/,
    function* () {
      yield {
        opacity: '0.54',
        'font-weight': '500',
        'font-size': '12px'
      }
    }
  ],
  [
    /^q-table__grid-item-value$/,
    function* () {
      yield { 'font-size': '13px' }
    }
  ],
  [
    /^q-table__grid-item$/,
    function* () {
      yield {
        padding: '4px',
        transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
    }
  ],
  [
    /^q-table__grid-item--selected$/,
    function* () {
      yield { transform: 'scale(0.95)' }
    }
  ]
] as Rule[]
