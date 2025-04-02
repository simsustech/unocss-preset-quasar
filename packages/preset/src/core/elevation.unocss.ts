import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>

// const shadows = (mode: 'light' | 'dark'): Rule<QuasarTheme>[] => [
//   ...Array.from({ length: 24 }, (_, i) => i + 1).reduce((acc, z) => {
//     acc.push([
//       new RegExp(`shadow-${z}`),
//       ([, c], { symbols, theme }) => ({
//         [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
//         'box-shadow': theme['shadows'][z as IntRange<0, 24>]
//       })
//     ])
//     acc.push([
//       new RegExp(`shadow-up-${z}`),
//       ([, c], { symbols, theme }) => ({
//         [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,

//         'box-shadow': theme['shadows']['up'][z as IntRange<0, 24>]
//       })
//     ])
//     return acc
//   }, [] as Rule<QuasarTheme>[]),
//   [
//     /^inset-shadow$/,
//     function* ([, color], { symbols, theme }) {
//       yield {
//         [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
//         'box-shadow': theme['insetShadow']
//       }
//     }
//   ] as Rule<QuasarTheme>,
//   [
//     /^inset-shadow-down$/,
//     function* ([, color], { symbols, theme }) {
//       yield {
//         [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
//         'box-shadow': theme['insetShadowDown']
//       }
//     }
//   ] as Rule<QuasarTheme>
// ]

const rules: Rule<QuasarTheme>[] = [
  // [
  //   /^shadow-transition$/,
  //   function* ([, color], { theme }) {
  //     yield {
  //       transition: `${theme['shadowTransition']} !important`
  //     }
  //   }
  // ] as Rule<QuasarTheme>,
  // ...shadows('light'),
  // ...shadows('dark'),
  // ...['no-shadow', 'shadow-0'].map(
  //   (c) =>
  //     [
  //       new RegExp(`${c}`),
  //       function* ([, color], { theme }) {
  //         yield {
  //           'box-shadow': `none !important`
  //         }
  //       }
  //     ] as Rule<QuasarTheme>
  // ),
  ...(['z-marginals', 'z-notify', 'z-fullscreen', 'z-inherit'] as const).map(
    (c) =>
      [
        new RegExp(`${c}`),
        function* ([, color], { theme }) {
          const selector = c.replace('z-', '') as
            | 'marginals'
            | 'notify'
            | 'fullscreen'
          yield {
            'z-index':
              c === 'z-inherit' ? 'inherit' : theme.quasar?.['z'][selector]
          }
        }
      ] as Rule<QuasarTheme>
  )
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^shadow-none$/, ([, c], { theme }) => `shadow-none`],
  [/^no-shadow$/, ([, c], { theme }) => `shadow-none`],
  // TODO
  [/^shadow-(0?[1-9]|1[0-9]|2[0-4])$/, ([, nr], { theme }) => `shadow-md`],
  [
    /^elevation-1$/,
    ([, nr], { theme }) =>
      `shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.2),0px_1px_1px_0px_rgba(0,_0,_0,_0.14),0px_2px_1px_-1px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-2$/,
    ([, nr], { theme }) =>
      `shadow-[0px_1px_5px_0px_rgba(0,_0,_0,_0.2),0px_2px_2px_0px_rgba(0,_0,_0,_0.14),0px_3px_1px_-2px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-3$/,
    ([, nr], { theme }) =>
      `shadow-[0px_1px_8px_0px_rgba(0,_0,_0,_0.2),0px_3px_4px_0px_rgba(0,_0,_0,_0.14),0px_3px_3px_-2px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-4$/,
    ([, nr], { theme }) =>
      `shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.2),0px_4px_5px_0px_rgba(0,_0,_0,_0.14),0px_1px_10px_0px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-5$/,
    ([, nr], { theme }) =>
      `shadow-[0px_3px_5px_-1px_rgba(0,_0,_0,_0.2),0px_5px_8px_0px_rgba(0,_0,_0,_0.14),0px_1px_14px_0px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-6$/,
    ([, nr], { theme }) =>
      `shadow-[0px_3px_5px_-1px_rgba(0,_0,_0,_0.2),0px_6px_10px_0px_rgba(0,_0,_0,_0.14),0px_1px_18px_0px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-7$/,
    ([, nr], { theme }) =>
      `shadow-[0px_4px_5px_-2px_rgba(0,_0,_0,_0.2),0px_7px_10px_1px_rgba(0,_0,_0,_0.14),0px_2px_16px_1px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-8$/,
    ([, nr], { theme }) =>
      `shadow-[0px_5px_5px_-3px_rgba(0,_0,_0,_0.2),0px_8px_10px_1px_rgba(0,_0,_0,_0.14),0px_3px_14px_2px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-9$/,
    ([, nr], { theme }) =>
      `shadow-[0px_5px_6px_-3px_rgba(0,_0,_0,_0.2),0px_9px_12px_1px_rgba(0,_0,_0,_0.14),0px_3px_16px_2px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-10$/,
    ([, nr], { theme }) =>
      `shadow-[0px_6px_6px_-3px_rgba(0,_0,_0,_0.2),0px_10px_14px_1px_rgba(0,_0,_0,_0.14),0px_4px_18px_3px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-11$/,
    ([, nr], { theme }) =>
      `shadow-[0px_6px_7px_-4px_rgba(0,_0,_0,_0.2),0px_11px_15px_1px_rgba(0,_0,_0,_0.14),0px_4px_20px_3px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-12$/,
    ([, nr], { theme }) =>
      `shadow-[0px_7px_8px_-4px_rgba(0,_0,_0,_0.2),0px_12px_17px_2px_rgba(0,_0,_0,_0.14),0px_5px_22px_4px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-13$/,
    ([, nr], { theme }) =>
      `shadow-[0px_7px_8px_-4px_rgba(0,_0,_0,_0.2),0px_13px_19px_2px_rgba(0,_0,_0,_0.14),0px_5px_24px_4px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-14$/,
    ([, nr], { theme }) =>
      `shadow-[0px_7px_9px_-4px_rgba(0,_0,_0,_0.2),0px_14px_21px_2px_rgba(0,_0,_0,_0.14),0px_5px_26px_4px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-15$/,
    ([, nr], { theme }) =>
      `shadow-[0px_8px_9px_-5px_rgba(0,_0,_0,_0.2),0px_15px_22px_2px_rgba(0,_0,_0,_0.14),0px_6px_28px_5px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-16$/,
    ([, nr], { theme }) =>
      `shadow-[0px_8px_10px_-5px_rgba(0,_0,_0,_0.2),0px_16px_24px_2px_rgba(0,_0,_0,_0.14),0px_6px_30px_5px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-17$/,
    ([, nr], { theme }) =>
      `shadow-[0px_8px_11px_-5px_rgba(0,_0,_0,_0.2),0px_17px_26px_2px_rgba(0,_0,_0,_0.14),0px_6px_32px_5px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-18$/,
    ([, nr], { theme }) =>
      `shadow-[0px_9px_11px_-5px_rgba(0,_0,_0,_0.2),0px_18px_28px_2px_rgba(0,_0,_0,_0.14),0px_7px_34px_6px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-19$/,
    ([, nr], { theme }) =>
      `shadow-[0px_9px_12px_-6px_rgba(0,_0,_0,_0.2),0px_19px_29px_2px_rgba(0,_0,_0,_0.14),0px_7px_36px_6px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-20$/,
    ([, nr], { theme }) =>
      `shadow-[0px_10px_13px_-6px_rgba(0,_0,_0,_0.2),0px_20px_31px_3px_rgba(0,_0,_0,_0.14),0px_8px_38px_7px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-21$/,
    ([, nr], { theme }) =>
      `shadow-[0px_10px_13px_-6px_rgba(0,_0,_0,_0.2),0px_21px_33px_3px_rgba(0,_0,_0,_0.14),0px_8px_40px_7px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-22$/,
    ([, nr], { theme }) =>
      `shadow-[0px_10px_14px_-6px_rgba(0,_0,_0,_0.2),0px_22px_35px_3px_rgba(0,_0,_0,_0.14),0px_8px_42px_7px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-23$/,
    ([, nr], { theme }) =>
      `shadow-[0px_11px_14px_-7px_rgba(0,_0,_0,_0.2),0px_23px_36px_3px_rgba(0,_0,_0,_0.14),0px_9px_44px_8px_rgba(0,_0,_0,_0.12)]`
  ],
  [
    /^elevation-24$/,
    ([, nr], { theme }) =>
      `shadow-[0px_11px_15px_-7px_rgba(0,_0,_0,_0.2),0px_24px_38px_3px_rgba(0,_0,_0,_0.14),0px_9px_46px_8px_rgba(0,_0,_0,_0.12)]`
  ]
]

export { rules, shortcuts }
