import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const cols = 12
const grid = Array.from({ length: cols }, (_, i) => i + 1)

const colGutter = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 12
} as const

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^row$/,
    ([, c], { theme }) =>
      `flex flex-row flex-wrap flex-auto [&.reverse]:(flex-row-reverse)`
  ],
  [
    /^column$/,
    ([, c], { theme }) =>
      `flex flex-col flex-wrap flex-auto [&.reverse]:(flex-col-reverse)`
  ],
  [
    /^col(?:-)?(none|xs|sm|md|lg|xl|all|auto|grow)?(?:-)?([2-9]|1[0-2]?)?$/,
    ([, size, nr], { theme }) => {
      const classes = ['w-auto max-w-full']
      if (size && nr) {
        classes.push(`${size}:basis-${nr}/12)`)
      } else if (nr) {
        classes.push(`basis-${nr}/12`)
      } else if (size === 'all') {
        classes.push('basis-12/12')
      } else if (size === 'auto') {
        classes.push('basis-auto')
      } else if (size) {
        classes.push(`${size}:basis-auto ${size}:grow`)
      } else if (size === 'grow' || size === void 0) {
        classes.push('grow')
      }
      return classes.join(' ')
    }
  ],

  [
    /^q-col-gutter-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `gap-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
      [&_>_[class^="col"]]:(mr--${
        colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
      })
      [&_>_[class^="col"]]:(mb--${
        colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
      })`
  ],
  [
    /^q-col-gutter-x-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `gap-x-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
      [&_>_[class^="col"]]:(mr--${
        colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
      })`
  ],
  [
    /^q-col-gutter-y-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `gap-y-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
      [&_>_[class^="col"]]:(mb--${
        colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
      })`
  ],
  [
    /^q-gutter-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `ml--${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
      mt--${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
      [&_>_*]:(ml-${
        colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
      } mt-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']})`
  ],
  [
    /^q-gutter-x-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `ml--${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
        [&_>_*]:(ml-${
          colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
        })`
  ],
  [
    /^q-gutter-y-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `mt--${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
        [&_>_*]:(mt-${
          colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
        })`
  ],
  [/^wrap$/, ([, size], { theme }) => `flex-wrap`],
  [/^no-wrap$/, ([, size], { theme }) => `flex-nowrap`],
  [/^reverse-wrap$/, ([, size], { theme }) => `flex-wrap-reverse`],
  [/^flex-center$/, ([, c], { theme }) => 'justify-center items-center'],
  [/^inline$/, ([, c], { theme }) => 'flex-inline!']
]

export { shortcuts }
