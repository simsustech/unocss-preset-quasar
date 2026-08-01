import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.electron .q-electron-drag {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
body.electron .q-electron-drag .q-btn-item, body.electron .q-electron-drag--exception {
  -webkit-app-region: no-drag;
}

img.responsive {
  max-width: 100%;
  height: auto;
}`
  },
  {
    // When the Unstyled style is active, strip background/color from Quasar
    // component root elements. There is no Quasar CSS/SASS when using the
    // preset — but components still apply preset utility shortcuts internally
    // (e.g. QBtn with color="positive" applies `bg-positive`, which resolves
    // to the theme color via :root --q-positive). Those named colors are not
    // tokenized, so without this they would leak through and give components a
    // themed appearance even in Unstyled mode.
    getCSS: () => `
body.quasar-style-unstyled .q-btn,
body.quasar-style-unstyled .q-card,
body.quasar-style-unstyled .q-field,
body.quasar-style-unstyled .q-input,
body.quasar-style-unstyled .q-select,
body.quasar-style-unstyled .q-chip,
body.quasar-style-unstyled .q-badge,
body.quasar-style-unstyled .q-banner,
body.quasar-style-unstyled .q-bar,
body.quasar-style-unstyled .q-item,
body.quasar-style-unstyled .q-expansion-item,
body.quasar-style-unstyled .q-stepper,
body.quasar-style-unstyled .q-tab,
body.quasar-style-unstyled .q-tab-panels,
body.quasar-style-unstyled .q-carousel,
body.quasar-style-unstyled .q-slide-item,
body.quasar-style-unstyled .q-slider,
body.quasar-style-unstyled .q-range,
body.quasar-style-unstyled .q-toggle,
body.quasar-style-unstyled .q-checkbox,
body.quasar-style-unstyled .q-radio,
body.quasar-style-unstyled .q-knob,
body.quasar-style-unstyled .q-rating,
body.quasar-style-unstyled .q-linear-progress,
body.quasar-style-unstyled .q-circular-progress,
body.quasar-style-unstyled .q-spinner,
body.quasar-style-unstyled .q-pagination,
body.quasar-style-unstyled .q-btn-toggle,
body.quasar-style-unstyled .q-btn-dropdown,
body.quasar-style-unstyled .q-btn-group,
body.quasar-style-unstyled .q-header,
body.quasar-style-unstyled .q-footer,
body.quasar-style-unstyled .q-drawer,
body.quasar-style-unstyled .q-page,
body.quasar-style-unstyled .q-page-sticky,
body.quasar-style-unstyled .q-toolbar,
body.quasar-style-unstyled .q-tooltip,
body.quasar-style-unstyled .q-menu,
body.quasar-style-unstyled .q-dialog,
body.quasar-style-unstyled .q-bottom-sheet,
body.quasar-style-unstyled .q-uploader,
body.quasar-style-unstyled .q-table,
body.quasar-style-unstyled .q-tree,
body.quasar-style-unstyled .q-timeline,
body.quasar-style-unstyled .q-editor,
body.quasar-style-unstyled .q-color-picker,
body.quasar-style-unstyled .q-date,
body.quasar-style-unstyled .q-time,
body.quasar-style-unstyled .q-skeleton,
body.quasar-style-unstyled .q-markup-table,
body.quasar-style-unstyled .q-form,
body.quasar-style-unstyled .q-img,
body.quasar-style-unstyled .q-inner-loading,
body.quasar-style-unstyled .q-option-group,
body.quasar-style-unstyled .q-separator,
body.quasar-style-unstyled .q-space,
body.quasar-style-unstyled .q-responsive,
body.quasar-style-unstyled .q-scroll-area,
body.quasar-style-unstyled .q-video,
body.quasar-style-unstyled .q-intersection,
body.quasar-style-unstyled .q-no-ssr,
body.quasar-style-unstyled .q-virtual-scroll {
  background: none;
  color: inherit;
}`
  }
]

const rules: Rule<QuasarTheme>[] = [
  [
    /^content-empty$/,
    function* ([, color]) {
      yield {
        content: '""'
      }
    }
  ]
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^rounded-borders$/, ([, c], { theme }) => `rounded-[4px]`],

  [/^border-radius-inherit$/, ([, c], { theme }) => `[border-radius:inherit]`],

  [/^no-transition$/, ([, c], { theme }) => `transition-none`],

  [/^transition-0$/, ([, c], { theme }) => `[transition:0s!important]`],

  [
    /^glossy$/,
    ([, c], { theme }) =>
      `!bg-[linear-gradient(_to_bottom,_rgba(255,_255,_255,_0.3),_rgba(255,_255,_255,_0)_50%,_rgba(0,_0,_0,_0.12)_51%,_rgba(0,_0,_0,_0.04)_)]`
  ],

  [
    /^q-placeholder::placeholder$/,
    ([, c], { theme }) => `[color:inherit] opacity-70`
  ],

  [/^q-body--fullscreen-mixin$/, ([, c], { theme }) => `!fixed`],

  [/^q-body--prevent-scroll$/, ([, c], { theme }) => `!fixed`],

  [/^q-body--force-scrollbar-x$/, ([, c], { theme }) => `overflow-x-scroll`],

  [/^q-body--force-scrollbar-y$/, ([, c], { theme }) => `overflow-y-scroll`],

  [/^q-no-input-spinner$/, ([, c], { theme }) => ``],

  [
    /^q-no-input-spinner::-webkit-outer-spin-button$/,
    ([, c], { theme }) => `m-0`
  ],

  [
    /^q-no-input-spinner::-webkit-inner-spin-button$/,
    ([, c], { theme }) => `m-0`
  ],

  [/^q-link$/, ([, c], { theme }) => `outline-0 no-underline`],

  [/^q-link--focusable:focus-visible$/, ([, c], { theme }) => ``]
]

export { rules, preflights, shortcuts }
