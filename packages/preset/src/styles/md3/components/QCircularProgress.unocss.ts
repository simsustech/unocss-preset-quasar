import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
@keyframes q-circular-progress-circle {
  0% {
    stroke-dasharray: 1, 400;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -300;
  }
}`
  }
]
const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-circular-progress$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-circular-progress'] ??
      `inline-block relative align-middle w-[1em] h-[1em] leading-none`
  ],

  [/^q-circular-progress__svg$/, ([, c], { theme }) => `w-full h-full`],

  [/^q-circular-progress__text$/, ([, c], { theme }) => `text-[0.25em]`],

  [
    /^q-circular-progress--indeterminate$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-circular-progress--indeterminate'] ??
      `[&_.q-circular-progress\\_\\_svg]:(origin-[50%_50%] animate-[q-spin_2s_linear_infinite]) [&_.q-circular-progress\\_\\_circle]:(animate-[q-circular-progress-circle_1.5s_ease-in-out_infinite])`
  ]
]

export { preflights, shortcuts }
