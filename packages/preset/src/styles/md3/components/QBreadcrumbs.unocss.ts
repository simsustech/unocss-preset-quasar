import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `[dir=rtl] .q-breadcrumbs__separator .q-icon {
  transform: scaleX(-1) /* rtl:ignore */;
};`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-breadcrumbs__el$/, ([, c], { theme }) => `text-inherit`],
  [/^q-breadcrumbs__el-icon$/, ([, c], { theme }) => `text-125%`],
  [/^q-breadcrumbs__el-icon--with-label$/, ([, c], { theme }) => `mr-8px`]
]

export { preflights, shortcuts }
