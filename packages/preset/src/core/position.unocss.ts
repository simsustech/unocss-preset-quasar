import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^fixed-full$/, ([, c], { theme }) => `fixed top-0 right-0 bottom-0 left-0`],

  [
    /^fullscreen$/,
    ([, c], { theme }) =>
      `fixed !rounded-none max-w-[100vw] max-h-screen top-0 right-0 bottom-0 left-0 z-${theme.quasar.z.fullscreen}`
  ],

  [
    /^fixed-center$/,
    ([, c], { theme }) =>
      `fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2`
  ],

  [/^fixed-bottom$/, ([, c], { theme }) => `fixed right-0 bottom-0 left-0`],

  [/^fixed-left$/, ([, c], { theme }) => `fixed top-0 bottom-0 left-0`],

  [/^fixed-right$/, ([, c], { theme }) => `fixed top-0 right-0 bottom-0`],

  [/^fixed-top$/, ([, c], { theme }) => `fixed top-0 left-0 right-0`],

  [/^fixed-top-left$/, ([, c], { theme }) => `fixed top-0 left-0`],

  [/^fixed-top-right$/, ([, c], { theme }) => `fixed top-0 right-0`],

  [/^fixed-bottom-left$/, ([, c], { theme }) => `fixed bottom-0 left-0`],

  [/^fixed-bottom-right$/, ([, c], { theme }) => `fixed bottom-0 right-0`],

  [
    /^absolute-full$/,
    ([, c], { theme }) => `absolute top-0 right-0 bottom-0 left-0`
  ],

  [
    /^absolute-center$/,
    ([, c], { theme }) =>
      `absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2`
  ],

  [
    /^absolute-bottom$/,
    ([, c], { theme }) => `absolute right-0 bottom-0 left-0`
  ],

  [/^absolute-left$/, ([, c], { theme }) => `absolute top-0 bottom-0 left-0`],

  [/^absolute-right$/, ([, c], { theme }) => `absolute top-0 right-0 bottom-0`],

  [/^absolute-top$/, ([, c], { theme }) => `absolute top-0 left-0 right-0`],

  [/^absolute-top-left$/, ([, c], { theme }) => `absolute top-0 left-0`],

  [/^absolute-top-right$/, ([, c], { theme }) => `absolute top-0 right-0`],

  [/^absolute-bottom-left$/, ([, c], { theme }) => `absolute bottom-0 left-0`],

  [
    /^absolute-bottom-right$/,
    ([, c], { theme }) => `absolute bottom-0 right-0`
  ],

  [/^vertical-top$/, ([, c], { theme }) => `!align-top`],

  [/^vertical-middle$/, ([, c], { theme }) => `!align-middle`],

  [/^vertical-bottom$/, ([, c], { theme }) => `!align-bottom`],

  [/^on-left$/, ([, c], { theme }) => `mr-[12px]`],

  [/^on-right$/, ([, c], { theme }) => `ml-[12px]`],

  [/^q-position-engine$/, ([, c], { theme }) => `!mt-0 !ml-0`],

  [/^relative-position$/, ([, c], { theme }) => `relative`]
]

export { shortcuts }
