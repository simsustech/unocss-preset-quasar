import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
@keyframes q-spin {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) /* rtl:ignore */;
  }
  25% {
    transform: rotate3d(0, 0, 1, 90deg) /* rtl:ignore */;
  }
  50% {
    transform: rotate3d(0, 0, 1, 180deg) /* rtl:ignore */;
  }
  75% {
    transform: rotate3d(0, 0, 1, 270deg) /* rtl:ignore */;
  }
  100% {
    transform: rotate3d(0, 0, 1, 359deg) /* rtl:ignore */;
  }
}
@keyframes q-mat-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-spinner$/, ([, c], { theme }) => `align-middle`],

  [
    /^q-spinner-mat$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-spinner-mat'] ??
      `animate-[q-spin_2s_linear_infinite] origin-[center_center] [&_.path]:(animate-[q-mat-dash_1.5s_ease-in-out_infinite])`
  ]
]

export { preflights, shortcuts }
