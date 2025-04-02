import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
[dir=rtl] .q-tree__arrow {
  transform: rotate3d(0, 0, 1, 180deg) /* rtl:ignore */;
}
[dir=rtl] .q-tree__arrow--rotate {
  transform: rotate3d(0, 0, 1, 90deg) /* rtl:ignore */;
}
`
  }
]
const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-tree$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree'] ??
      `relative text-[#9e9e9e] [&_>_.q-tree\\_\\_node]:(p-0) [&_>_.q-tree\\_\\_node:after]:(hidden) [&_>_.q-tree\\_\\_node_>_.q-tree\\_\\_node-header:before]:(hidden) [&_>_.q-tree\\_\\_node--child_>_.q-tree\\_\\_node-header]:(pl-[24px])`
  ],

  [
    /^q-tree__node$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__node'] ??
      `pt-[0] pr-[0] pb-[3px] pl-[22px] [&:after]:(content-empty absolute -top-[3px] bottom-[0] w-[2px] right-auto -left-[13px] [border-left:1px_solid_currentColor]) [&:last-child:after]:(hidden)`
  ],

  [
    /^q-tree__node--disabled$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__node--disabled'] ??
      `pointer-events-none [&_.disabled]:(!opacity-100) [&_>_div]:(!opacity-60) [&_>_i]:(!opacity-60) [&_>_.disabled]:(!opacity-60) [&_>_div_.q-tree\\_\\_node--disabled_>_div]:(!opacity-100) [&_>_div_.q-tree\\_\\_node--disabled_>_i]:(!opacity-100) [&_>_div_.q-tree\\_\\_node--disabled_>_.disabled]:(!opacity-100) [&_>_i_.q-tree\\_\\_node--disabled_>_div]:(!opacity-100) [&_>_i_.q-tree\\_\\_node--disabled_>_i]:(!opacity-100) [&_>_i_.q-tree\\_\\_node--disabled_>_.disabled]:(!opacity-100) [&_>_.disabled_.q-tree\\_\\_node--disabled_>_div]:(!opacity-100) [&_>_.disabled_.q-tree\\_\\_node--disabled_>_i]:(!opacity-100) [&_>_.disabled_.q-tree\\_\\_node--disabled_>_.disabled]:(!opacity-100)`
  ],

  [
    /^q-tree__node-header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__node-header'] ??
      `[&:before]:(content-empty absolute -top-[3px] bottom-2/4 w-[31px] -left-[35px] [border-left:1px_solid_currentColor] [border-bottom:1px_solid_currentColor]) p-[4px] mt-[3px] rounded-[4px] outline-[0]`
  ],

  [
    /^q-tree__children$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__children'] ?? `pl-[25px]`
  ],

  [
    /^q-tree__node-body$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__node-body'] ??
      `pt-[5px] pr-[0] pb-[8px] pl-[5px]`
  ],

  [
    /^q-tree__node--parent$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__node--parent'] ??
      `pl-[2px] [&_>_.q-tree\\_\\_node-header:before]:(w-[15px] -left-[15px]) [&_>_.q-tree\\_\\_node-collapsible_>_.q-tree\\_\\_node-body]:(pt-[5px] pr-[0] pb-[8px] pl-[27px]) [&_>_.q-tree\\_\\_node-collapsible_>_.q-tree\\_\\_node-body:after]:(content-empty absolute top-[0] w-[2px] h-full right-auto left-[12px] [border-left:1px_solid_currentColor] bottom-[50px])`
  ],

  [
    /^q-tree__node--link$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__node--link'] ?? `cursor-pointer`
  ],

  [
    /^q-tree__node-header-content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__node-header-content'] ??
      `text-[#000] [transition:color_0.3s] [&_.q-icon]:(text-[21px]) [&_.q-avatar]:(text-[28px] rounded-[50%] w-[28px] h-[28px])`
  ],

  [
    /^q-tree__node--selected$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__node--selected'] ??
      `[&_.q-tree\\_\\_node-header-content]:(text-[#9e9e9e])`
  ],

  [
    /^q-tree__icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__icon'] ?? `text-[21px]`
  ],

  [
    /^q-tree__img$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__img'] ?? `h-[42px] rounded-[2px]`
  ],

  [
    /^q-tree__avatar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__avatar'] ??
      `text-[28px] rounded-[50%] w-[28px] h-[28px]`
  ],

  [
    /^q-tree__arrow$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__arrow'] ??
      `text-[16px] mr-[4px] [transition:transform_0.3s]`
  ],

  [
    /^q-tree__spinner$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__spinner'] ?? `text-[16px] mr-[4px]`
  ],

  [
    /^q-tree__arrow--rotate$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__arrow--rotate'] ??
      `[transform:rotate3d(0,_0,_1,_90deg)]`
  ],

  [
    /^q-tree__tickbox$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree__tickbox'] ?? `mr-[4px]`
  ],

  [
    /^q-tree--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree--dark'] ??
      `[&_.q-tree\\_\\_node-header-content]:(text-[#fff])`
  ],

  [
    /^q-tree--no-connectors$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree--no-connectors'] ??
      `[&_.q-tree\\_\\_node:after]:(!hidden) [&_.q-tree\\_\\_node-header:before]:(!hidden) [&_.q-tree\\_\\_node-body:after]:(!hidden)`
  ],

  [
    /^q-tree--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree--dense'] ??
      `[&_>_.q-tree\\_\\_node--child_>_.q-tree\\_\\_node-header]:(pl-px) [&_.q-tree\\_\\_arrow]:(mr-px) [&_.q-tree\\_\\_spinner]:(mr-px) [&_.q-tree\\_\\_img]:(h-[32px]) [&_.q-tree\\_\\_tickbox]:(mr-[3px]) [&_.q-tree\\_\\_node]:(p-0) [&_.q-tree\\_\\_node:after]:(top-[0] -left-[8px]) [&_.q-tree\\_\\_node-header]:(mt-0 p-px) [&_.q-tree\\_\\_node-header:before]:(top-[0] -left-[8px] w-[8px]) [&_.q-tree\\_\\_node--child]:(pl-[17px]) [&_.q-tree\\_\\_node--child_>_.q-tree\\_\\_node-header:before]:(-left-[25px] w-[21px]) [&_.q-tree\\_\\_node-body]:(pt-[0] px-[0] pb-[2px]) [&_.q-tree\\_\\_children]:(pl-[16px])`
  ],

  [
    /^q-tree--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tree--dense'] ??
      `[&__.q-tree\\_\\_node--parent__>_.q-tree\\_\\_node-collapsible__>_.q-tree\\_\\_node-body]:(pt-[0] pr-[0] pb-[2px] pl-[20px]) [&__.q-tree\\_\\_node--parent__>_.q-tree\\_\\_node-collapsible__>_.q-tree\\_\\_node-body:after]:(left-[8px])`
  ]
]

export { preflights, shortcuts }
