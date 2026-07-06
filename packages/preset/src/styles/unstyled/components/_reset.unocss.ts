import type { Preflight } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

/**
 * When the Unstyled style is active, strip background/color from Quasar
 * component root elements. Without this, core utility shortcuts like
 * `bg-primary` (which QBtn applies internally when color="primary") would
 * leak through and give components a themed appearance even in Unstyled mode.
 *
 * The selectors are body-class-free — the preset's `scopeStyle` wraps them
 * with the correct `body.quasar-style-unstyled` prefix at build time.
 */
const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: () => `
.q-btn,
.q-card,
.q-field,
.q-input,
.q-select,
.q-chip,
.q-badge,
.q-banner,
.q-bar,
.q-item,
.q-expansion-item,
.q-stepper,
.q-tab,
.q-tab-panels,
.q-carousel,
.q-slide-item,
.q-slider,
.q-range,
.q-toggle,
.q-checkbox,
.q-radio,
.q-knob,
.q-rating,
.q-linear-progress,
.q-circular-progress,
.q-spinner,
.q-pagination,
.q-btn-toggle,
.q-btn-dropdown,
.q-btn-group,
.q-header,
.q-footer,
.q-drawer,
.q-page,
.q-page-sticky,
.q-toolbar,
.q-tooltip,
.q-menu,
.q-dialog,
.q-bottom-sheet,
.q-uploader,
.q-table,
.q-tree,
.q-timeline,
.q-editor,
.q-color-picker,
.q-date,
.q-time,
.q-skeleton,
.q-markup-table,
.q-form,
.q-img,
.q-inner-loading,
.q-option-group,
.q-separator,
.q-space,
.q-responsive,
.q-scroll-area,
.q-video,
.q-intersection,
.q-no-ssr,
.q-virtual-scroll {
  background: none !important;
  color: inherit !important;
}`
  }
]

export { preflights }
