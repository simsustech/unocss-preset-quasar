import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

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
const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-circular-progress$/,
    componentClass(
      'q-circular-progress',
      `inline-block relative align-middle w-[1em] h-[1em] leading-none`
    )
  ],

  [/^q-circular-progress__svg$/, staticClass(`w-full h-full`)],

  [/^q-circular-progress__text$/, staticClass(`text-[0.25em]`)],

  [
    /^q-circular-progress--indeterminate$/,
    componentClass(
      'q-circular-progress--indeterminate',
      qe`[&_.q-circular-progress__svg]:(origin-[50%_50%] animate-[q-spin_2s_linear_infinite]) [&_.q-circular-progress__circle]:(animate-[q-circular-progress-circle_1.5s_ease-in-out_infinite])`
    )
  ]
]

export { preflights, shortcuts }
