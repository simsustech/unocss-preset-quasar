import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.desktop .q-table > tbody > tr:not(.q-tr--no-hover):hover > td:not(.q-td--no-hover):before {
  content: "";
}`
  }
]
const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-markup-table$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-markup-table'] ?? `overflow-auto bg-[#fff]`
  ],

  [
    /^q-table$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table'] ??
      `w-full max-w-full border-separate [border-spacing:0] [&_thead_tr]:(h-[48px]) [&_tbody_td]:(h-[48px]) [&_th]:(font-medium text-[12px] select-none) [&_th.sortable]:(cursor-pointer) [&_th.sortable:hover_.q-table\\_\\_sort-icon]:(opacity-[0.64]) [&_th.sorted_.q-table\\_\\_sort-icon]:(!opacity-[0.86]) [&_th.sort-desc_.q-table\\_\\_sort-icon]:(rotate-180) [&_th]:(px-[16px] py-[7px] [background-color:inherit]) [&_td]:(px-[16px] py-[7px] [background-color:inherit]) [&_thead]:(border-solid border-0) [&_td]:(border-solid border-0) [&_th]:(border-solid border-0) [&_tbody_td]:(text-[13px]) [&_thead]:(border-[rgba(0,_0,_0,_0.12)]) [&_tr]:(border-[rgba(0,_0,_0,_0.12)]) [&_th]:(border-[rgba(0,_0,_0,_0.12)]) [&_td]:(border-[rgba(0,_0,_0,_0.12)]) [&_tbody_td]:(relative) [&_tbody_td:before]:(absolute top-[0] left-[0] right-[0] bottom-[0] pointer-events-none) [&_tbody_td:after]:(absolute top-[0] left-[0] right-[0] bottom-[0] pointer-events-none) [&_tbody_td:before]:(bg-[rgba(0,_0,_0,_0.03)]) [&_tbody_td:after]:(bg-[rgba(0,_0,_0,_0.06)]) [&_tbody_tr.selected_td:after]:(content-['']) [&_.q-virtual-scroll\\_\\_padding_tr]:(!h-[0]) [&_.q-virtual-scroll\\_\\_padding_td]:(!p-0)`
  ],

  [
    /^q-table__card$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__card'] ??
      `text-[#000] bg-[#fff] rounded-[4px] [box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] [&_.q-table\\_\\_middle]:(flex-auto) [&_.q-table\\_\\_top]:(flex-[0_0_auto]) [&_.q-table\\_\\_bottom]:(flex-[0_0_auto])`
  ],

  [
    /^q-table__container$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__container'] ??
      `relative [&_>_div:first-child]:([border-top-left-radius:inherit] [border-top-right-radius:inherit]) [&_>_div:last-child]:([border-bottom-left-radius:inherit] [border-bottom-right-radius:inherit]) [&_>_.q-inner-loading]:([border-radius:inherit!important])`
  ],

  [
    /^q-table__top$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__top'] ??
      `px-[16px] py-[12px] [&_.q-table\\_\\_control]:(flex-wrap)`
  ],

  [
    /^q-table__title$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__title'] ??
      `text-[20px] tracking-[0.005em] font-normal`
  ],

  [
    /^q-table__separator$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__separator'] ?? `!min-w-[8px]`
  ],

  [
    /^q-table__progress$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__progress'] ??
      `!h-[0] [&_th]:(!p-0 !border-0) [&_.q-linear-progress]:(absolute bottom-[0])`
  ],

  [
    /^q-table__middle$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__middle'] ?? `max-w-full`
  ],

  [
    /^q-table__bottom$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__bottom'] ??
      `min-h-[50px] pl-[16px] pr-[14px] py-[4px] text-[12px] [&_.q-table\\_\\_control]:(min-h-[24px]) [border-top:1px_solid_rgba(0,_0,_0,_0.12)]`
  ],

  [
    /^q-table__bottom-nodata-icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__bottom-nodata-icon'] ??
      `text-[200%] mr-[8px]`
  ],

  [
    /^q-table__bottom-item$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__bottom-item'] ?? `mr-[16px]`
  ],

  [
    /^q-table__control$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__control'] ?? `flex items-center`
  ],

  [
    /^q-table__sort-icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__sort-icon'] ??
      `[transition:transform_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)] opacity-0 text-[120%]`
  ],

  [
    /^q-table__sort-icon--left$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__sort-icon--left'] ?? `ml-[4px]`
  ],

  [
    /^q-table__sort-icon--center$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__sort-icon--center'] ?? `ml-[4px]`
  ],

  [
    /^q-table__sort-icon--right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__sort-icon--right'] ?? `mr-[4px]`
  ],

  [
    /^q-table--col-auto-width$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--col-auto-width'] ?? `w-px`
  ],

  [
    /^q-table__card--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__card--dark'] ??
      `[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] border-[rgba(255,_255,_255,_0.28)]`
  ],

  [
    /^q-table--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--dark'] ??
      `[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] border-[rgba(255,_255,_255,_0.28)] [&_.q-table\\_\\_bottom]:(border-[rgba(255,_255,_255,_0.28)]) [&_thead]:(border-[rgba(255,_255,_255,_0.28)]) [&_tr]:(border-[rgba(255,_255,_255,_0.28)]) [&_th]:(border-[rgba(255,_255,_255,_0.28)]) [&_td]:(border-[rgba(255,_255,_255,_0.28)]) [&_tbody_td:before]:(bg-[rgba(255,_255,_255,_0.07)]) [&_tbody_td:after]:(bg-[rgba(255,_255,_255,_0.1)]) [&.q-table--vertical-separator_.q-table\\_\\_top]:(border-[rgba(255,_255,_255,_0.28)]) [&.q-table--cell-separator_.q-table\\_\\_top]:(border-[rgba(255,_255,_255,_0.28)])`
  ],

  [
    /^q-table--flat$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--flat'] ?? `[box-shadow:none]`
  ],

  [
    /^q-table--bordered$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--bordered'] ??
      `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
  ],

  [
    /^q-table--square$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--square'] ?? `rounded-none`
  ],

  [
    /^q-table__linear-progress$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__linear-progress'] ?? `h-[2px]`
  ],

  [
    /^q-table--no-wrap$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--no-wrap'] ??
      `[&_th]:(whitespace-nowrap) [&_td]:(whitespace-nowrap)`
  ],

  [
    /^q-table--grid$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--grid'] ??
      `[box-shadow:none] rounded-[4px] [&_.q-table\\_\\_top]:(pb-[4px]) [&_.q-table\\_\\_middle]:(min-h-[2px] mb-[4px]) [&_.q-table\\_\\_middle_thead]:(!border-0) [&_.q-table\\_\\_middle_thead_th]:(!border-0) [&_.q-table\\_\\_linear-progress]:(bottom-[0]) [&_.q-table\\_\\_bottom]:([border-top:0]) [&_.q-table\\_\\_grid-content]:(flex-auto) [&.fullscreen]:([background:inherit])`
  ],

  [
    /^q-table__grid-item-card$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__grid-item-card'] ??
      `align-top p-[12px] [&_.q-separator]:(mx-[0] my-[12px])`
  ],

  [
    /^q-table__grid-item-row$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__grid-item-row'] ??
      `[&_+_.q-table\\_\\_grid-item-row]:(mt-[8px])`
  ],

  [
    /^q-table__grid-item-title$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__grid-item-title'] ??
      `opacity-[0.54] font-medium text-[12px]`
  ],

  [
    /^q-table__grid-item-value$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__grid-item-value'] ?? `text-[13px]`
  ],

  [
    /^q-table__grid-item$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__grid-item'] ??
      `p-[4px] [transition:transform_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]`
  ],

  [
    /^q-table__grid-item--selected$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table__grid-item--selected'] ??
      `scale-[0.95]`
  ],

  [
    /^q-table--horizontal-separator$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--horizontal-separator'] ??
      `[&_thead_th]:(border-b) [&_tbody_tr:not(:last-child)_>_td]:(border-b)`
  ],

  [
    /^q-table--cell-separator$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--cell-separator'] ??
      `[&_thead_th]:(border-b) [&_tbody_tr:not(:last-child)_>_td]:(border-b) [&_td]:(border-l) [&_th]:(border-l) [&_thead_tr:last-child_th]:(border-b) [&.q-table--loading_tr:nth-last-child(2)_th]:(border-b) [&_td:first-child]:([border-left:0]) [&_th:first-child]:([border-left:0]) [&_.q-table\\_\\_top]:([border-bottom:1px_solid_rgba(0,_0,_0,_0.12)])`
  ],

  [
    /^q-table--vertical-separator$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--vertical-separator'] ??
      `[&_td]:(border-l) [&_th]:(border-l) [&_thead_tr:last-child_th]:(border-b) [&.q-table--loading_tr:nth-last-child(2)_th]:(border-b) [&_td:first-child]:([border-left:0]) [&_th:first-child]:([border-left:0]) [&_.q-table\\_\\_top]:([border-bottom:1px_solid_rgba(0,_0,_0,_0.12)])`
  ],

  [
    /^q-table--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-table--dense'] ??
      `[&_.q-table\\_\\_top]:(px-[16px] py-[6px]) [&_.q-table\\_\\_bottom]:(min-h-[33px]) [&_.q-table\\_\\_sort-icon]:(text-[110%]) [&_.q-table_th]:(px-[8px] py-[4px]) [&_.q-table_td]:(px-[8px] py-[4px]) [&_.q-table_thead_tr]:(h-[28px]) [&_.q-table_tbody_tr]:(h-[28px]) [&_.q-table_tbody_td]:(h-[28px]) [&_.q-table_th:first-child]:(pl-[16px]) [&_.q-table_td:first-child]:(pl-[16px]) [&_.q-table_th:last-child]:(pr-[16px]) [&_.q-table_td:last-child]:(pr-[16px]) [&_.q-table\\_\\_bottom-item]:(mr-[8px]) [&_.q-table\\_\\_select_.q-field\\_\\_control]:(min-h-[24px] p-0) [&_.q-table\\_\\_select_.q-field\\_\\_native]:(min-h-[24px] p-0) [&_.q-table\\_\\_select_.q-field\\_\\_marginal]:(h-[24px])`
  ]
]

export { preflights, shortcuts }
