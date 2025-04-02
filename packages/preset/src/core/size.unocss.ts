import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
:root {
  --q-size-xs: ${theme.breakpoints.xs};
  --q-size-sm: ${theme.breakpoints.sm};
  --q-size-md: ${theme.breakpoints.md};
  --q-size-lg: ${theme.breakpoints.lg};
  --q-size-xl: ${theme.breakpoints.xl};
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^fit$/, ([, c], { theme }) => `!w-full !h-full`],

  [/^full-height$/, ([, c], { theme }) => `!h-full`],

  [/^full-width$/, ([, c], { theme }) => `!w-full !ml-0 !mr-0`],

  [/^window-height$/, ([, c], { theme }) => `!mt-0 !mb-0 !h-screen`],

  [/^window-width$/, ([, c], { theme }) => `!ml-0 !mr-0 !w-screen`],

  [
    /^q-p(a|t|b|l|r|x|y)?(?:-)(none|xs|sm|md|lg|xl)$/,
    ([, side, size], { theme }) => {
      return `p${side}-${
        theme.quasar?.spaces[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
      }`
    }
  ],

  [
    /^q-m(a|t|b|l|r|x|y)?(?:-)(none|xs|sm|md|lg|xl)$/,
    ([, side, size], { theme }) => {
      return `m${side}-${
        theme.quasar?.spaces[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
      }`
    }
  ],

  // [/^q-pa-none$/, ([, c], { theme }) => `p-[0]`],

  // [/^q-pl-none$/, ([, c], { theme }) => `pl-0`],

  // [/^q-pr-none$/, ([, c], { theme }) => `pr-0`],

  // [/^q-pt-none$/, ([, c], { theme }) => `pt-0`],

  // [/^q-pb-none$/, ([, c], { theme }) => `pb-0`],

  // [/^q-px-none$/, ([, c], { theme }) => `pl-0 pr-0`],

  // [/^q-py-none$/, ([, c], { theme }) => `pt-0 pb-0`],

  // [/^q-ma-none$/, ([, c], { theme }) => `m-[0]`],

  // [/^q-ml-none$/, ([, c], { theme }) => `ml-0`],

  // [/^q-mr-none$/, ([, c], { theme }) => `mr-0`],

  // [/^q-mt-none$/, ([, c], { theme }) => `mt-0`],

  // [/^q-mb-none$/, ([, c], { theme }) => `mb-0`],

  // [/^q-mx-none$/, ([, c], { theme }) => `ml-0 mr-0`],

  // [/^q-my-none$/, ([, c], { theme }) => `mt-0 mb-0`],

  // [/^q-pa-xs$/, ([, c], { theme }) => `p-[4px]`],

  // [/^q-pl-xs$/, ([, c], { theme }) => `pl-[4px]`],

  // [/^q-pr-xs$/, ([, c], { theme }) => `pr-[4px]`],

  // [/^q-pt-xs$/, ([, c], { theme }) => `pt-[4px]`],

  // [/^q-pb-xs$/, ([, c], { theme }) => `pb-[4px]`],

  // [/^q-px-xs$/, ([, c], { theme }) => `pl-[4px] pr-[4px]`],

  // [/^q-py-xs$/, ([, c], { theme }) => `pt-[4px] pb-[4px]`],

  // [/^q-ma-xs$/, ([, c], { theme }) => `m-[4px]`],

  // [/^q-ml-xs$/, ([, c], { theme }) => `ml-[4px]`],

  // [/^q-mr-xs$/, ([, c], { theme }) => `mr-[4px]`],

  // [/^q-mt-xs$/, ([, c], { theme }) => `mt-[4px]`],

  // [/^q-mb-xs$/, ([, c], { theme }) => `mb-[4px]`],

  // [/^q-mx-xs$/, ([, c], { theme }) => `ml-[4px] mr-[4px]`],

  // [/^q-my-xs$/, ([, c], { theme }) => `mt-[4px] mb-[4px]`],

  // [/^q-pa-sm$/, ([, c], { theme }) => `p-[8px]`],

  // [/^q-pl-sm$/, ([, c], { theme }) => `pl-[8px]`],

  // [/^q-pr-sm$/, ([, c], { theme }) => `pr-[8px]`],

  // [/^q-pt-sm$/, ([, c], { theme }) => `pt-[8px]`],

  // [/^q-pb-sm$/, ([, c], { theme }) => `pb-[8px]`],

  // [/^q-px-sm$/, ([, c], { theme }) => `pl-[8px] pr-[8px]`],

  // [/^q-py-sm$/, ([, c], { theme }) => `pt-[8px] pb-[8px]`],

  // [/^q-ma-sm$/, ([, c], { theme }) => `m-[8px]`],

  // [/^q-ml-sm$/, ([, c], { theme }) => `ml-[8px]`],

  // [/^q-mr-sm$/, ([, c], { theme }) => `mr-[8px]`],

  // [/^q-mt-sm$/, ([, c], { theme }) => `mt-[8px]`],

  // [/^q-mb-sm$/, ([, c], { theme }) => `mb-[8px]`],

  // [/^q-mx-sm$/, ([, c], { theme }) => `ml-[8px] mr-[8px]`],

  // [/^q-my-sm$/, ([, c], { theme }) => `mt-[8px] mb-[8px]`],

  // [/^q-pa-md$/, ([, c], { theme }) => `p-[16px]`],

  // [/^q-pl-md$/, ([, c], { theme }) => `pl-[16px]`],

  // [/^q-pr-md$/, ([, c], { theme }) => `pr-[16px]`],

  // [/^q-pt-md$/, ([, c], { theme }) => `pt-[16px]`],

  // [/^q-pb-md$/, ([, c], { theme }) => `pb-[16px]`],

  // [/^q-px-md$/, ([, c], { theme }) => `pl-[16px] pr-[16px]`],

  // [/^q-py-md$/, ([, c], { theme }) => `pt-[16px] pb-[16px]`],

  // [/^q-ma-md$/, ([, c], { theme }) => `m-[16px]`],

  // [/^q-ml-md$/, ([, c], { theme }) => `ml-[16px]`],

  // [/^q-mr-md$/, ([, c], { theme }) => `mr-[16px]`],

  // [/^q-mt-md$/, ([, c], { theme }) => `mt-[16px]`],

  // [/^q-mb-md$/, ([, c], { theme }) => `mb-[16px]`],

  // [/^q-mx-md$/, ([, c], { theme }) => `ml-[16px] mr-[16px]`],

  // [/^q-my-md$/, ([, c], { theme }) => `mt-[16px] mb-[16px]`],

  // [/^q-pa-lg$/, ([, c], { theme }) => `p-[24px]`],

  // [/^q-pl-lg$/, ([, c], { theme }) => `pl-[24px]`],

  // [/^q-pr-lg$/, ([, c], { theme }) => `pr-[24px]`],

  // [/^q-pt-lg$/, ([, c], { theme }) => `pt-[24px]`],

  // [/^q-pb-lg$/, ([, c], { theme }) => `pb-[24px]`],

  // [/^q-px-lg$/, ([, c], { theme }) => `pl-[24px] pr-[24px]`],

  // [/^q-py-lg$/, ([, c], { theme }) => `pt-[24px] pb-[24px]`],

  // [/^q-ma-lg$/, ([, c], { theme }) => `m-[24px]`],

  // [/^q-ml-lg$/, ([, c], { theme }) => `ml-[24px]`],

  // [/^q-mr-lg$/, ([, c], { theme }) => `mr-[24px]`],

  // [/^q-mt-lg$/, ([, c], { theme }) => `mt-[24px]`],

  // [/^q-mb-lg$/, ([, c], { theme }) => `mb-[24px]`],

  // [/^q-mx-lg$/, ([, c], { theme }) => `ml-[24px] mr-[24px]`],

  // [/^q-my-lg$/, ([, c], { theme }) => `mt-[24px] mb-[24px]`],

  // [/^q-pa-xl$/, ([, c], { theme }) => `p-[48px]`],

  // [/^q-pl-xl$/, ([, c], { theme }) => `pl-[48px]`],

  // [/^q-pr-xl$/, ([, c], { theme }) => `pr-[48px]`],

  // [/^q-pt-xl$/, ([, c], { theme }) => `pt-[48px]`],

  // [/^q-pb-xl$/, ([, c], { theme }) => `pb-[48px]`],

  // [/^q-px-xl$/, ([, c], { theme }) => `pl-[48px] pr-[48px]`],

  // [/^q-py-xl$/, ([, c], { theme }) => `pt-[48px] pb-[48px]`],

  // [/^q-ma-xl$/, ([, c], { theme }) => `m-[48px]`],

  // [/^q-ml-xl$/, ([, c], { theme }) => `ml-[48px]`],

  // [/^q-mr-xl$/, ([, c], { theme }) => `mr-[48px]`],

  // [/^q-mt-xl$/, ([, c], { theme }) => `mt-[48px]`],

  // [/^q-mb-xl$/, ([, c], { theme }) => `mb-[48px]`],

  // [/^q-mx-xl$/, ([, c], { theme }) => `ml-[48px] mr-[48px]`],

  // [/^q-my-xl$/, ([, c], { theme }) => `mt-[48px] mb-[48px]`],

  [/^q-mt-auto$/, ([, c], { theme }) => `mt-auto`],

  [/^q-my-auto$/, ([, c], { theme }) => `mt-auto mb-auto`],

  [/^q-ml-auto$/, ([, c], { theme }) => `ml-auto`],

  [/^q-mb-auto$/, ([, c], { theme }) => `mb-auto`],

  [/^q-mr-auto$/, ([, c], { theme }) => `mr-auto`],

  [/^q-mx-auto$/, ([, c], { theme }) => `ml-auto mr-auto`]
]

export { preflights, shortcuts }
