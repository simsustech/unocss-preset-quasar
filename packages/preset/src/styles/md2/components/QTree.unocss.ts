import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => qe`
[dir=rtl] .q-tree__arrow {
  transform: rotate3d(0, 0, 1, 180deg) /* rtl:ignore */;
}
[dir=rtl] .q-tree__arrow--rotate {
  transform: rotate3d(0, 0, 1, 90deg) /* rtl:ignore */;
}
`
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-tree$/,
    componentClass(
      'q-tree',
      qe`relative text-[#9e9e9e] [&_>_.q-tree__node]:(p-0) [&_>_.q-tree__node:after]:(hidden) [&_>_.q-tree__node>_.q-tree__node-header:before]:(hidden) [&_>_.q-tree__node--child>_.q-tree__node-header]:(pl-[24px])`
    )
  ],

  [
    /^q-tree__node$/,
    componentClass(
      'q-tree__node',
      `pt-[0] pr-[0] pb-[3px] pl-[22px] [&:after]:(content-empty absolute -top-[3px] bottom-[0] w-[2px] right-auto -left-[13px] border-l-current) [&:last-child:after]:(hidden)`
    )
  ],

  [
    /^q-tree__node--disabled$/,
    componentClass(
      'q-tree__node--disabled',
      qe`pointer-events-none [&_.disabled]:(!opacity-100) [&>div]:(!opacity-60) [&>i]:(!opacity-60) [&>_.disabled]:(!opacity-60) [&>div_.q-tree__node--disabled>div]:(!opacity-100) [&>div_.q-tree__node--disabled>i]:(!opacity-100) [&>div_.q-tree__node--disabled>_.disabled]:(!opacity-100) [&>i_.q-tree__node--disabled>div]:(!opacity-100) [&>i_.q-tree__node--disabled>i]:(!opacity-100) [&>i_.q-tree__node--disabled>_.disabled]:(!opacity-100) [&>_.disabled_.q-tree__node--disabled>div]:(!opacity-100) [&>_.disabled_.q-tree__node--disabled>i]:(!opacity-100) [&>_.disabled_.q-tree__node--disabled>_.disabled]:(!opacity-100)`
    )
  ],

  [
    /^q-tree__node-header$/,
    componentClass(
      'q-tree__node-header',
      `[&:before]:(content-empty absolute -top-[3px] bottom-2/4 w-[31px] -left-[35px] border-l-current border-b-current) p-[4px] mt-[3px] rounded-[4px] outline-[0]`
    )
  ],

  [/^q-tree__children$/, componentClass('q-tree__children', `pl-[25px]`)],

  [
    /^q-tree__node-body$/,
    componentClass('q-tree__node-body', `pt-[5px] pr-[0] pb-[8px] pl-[5px]`)
  ],

  [
    /^q-tree__node--parent$/,
    componentClass(
      'q-tree__node--parent',
      qe`pl-[2px] [&>_.q-tree__node-header:before]:(w-[15px] -left-[15px]) [&>_.q-tree__node-collapsible>_.q-tree__node-body]:(pt-[5px] pr-[0] pb-[8px] pl-[27px]) [&>_.q-tree__node-collapsible>_.q-tree__node-body:after]:(content-empty absolute top-[0] w-[2px] h-full right-auto left-[12px] border-l-current bottom-[50px])`
    )
  ],

  [
    /^q-tree__node--link$/,
    componentClass('q-tree__node--link', `cursor-pointer`)
  ],

  [
    /^q-tree__node-header-content$/,
    componentClass(
      'q-tree__node-header-content',
      `text-[#000] [transition:color_0.3s] [&_.q-icon]:(text-21px) [&_.q-avatar]:(text-[28px] rounded-[50%] w-[28px] h-[28px])`
    )
  ],

  [
    /^q-tree__node--selected$/,
    componentClass(
      'q-tree__node--selected',
      qe`[&_.q-tree__node--selected_.q-tree__node-header-content]:(text-[#9e9e9e])`
    )
  ],

  [/^q-tree__icon$/, componentClass('q-tree__icon', `text-21px`)],

  [/^q-tree__img$/, componentClass('q-tree__img', `h-[42px] rounded-[2px]`)],

  [
    /^q-tree__avatar$/,
    componentClass(
      'q-tree__avatar',
      `text-[28px] rounded-[50%] w-[28px] h-[28px]`
    )
  ],

  [
    /^q-tree__arrow$/,
    componentClass(
      'q-tree__arrow',
      `text-[16px] mr-[4px] [transition:transform_0.3s]`
    )
  ],

  [
    /^q-tree__spinner$/,
    componentClass('q-tree__spinner', `text-[16px] mr-[4px]`)
  ],

  [
    /^q-tree__arrow--rotate$/,
    componentClass('q-tree__arrow--rotate', `[transform:rotate3d(0_0_1_90deg)]`)
  ],

  [/^q-tree__tickbox$/, componentClass('q-tree__tickbox', `mr-[4px]`)],

  [
    /^q-tree--dark$/,
    componentClass(
      'q-tree--dark',
      qe`[&_.q-tree__node-header-content]:(text-[#fff])`
    )
  ],

  [
    /^q-tree--no-connectors$/,
    componentClass(
      'q-tree--no-connectors',
      qe`[&_.q-tree__node:after]:(!hidden) [&_.q-tree__node-header:before]:(!hidden) [&_.q-tree__node-body:after]:(!hidden)`
    )
  ],

  [
    /^q-tree--dense$/,
    componentClass(
      'q-tree--dense',
      qe`&>_.q-tree__node--child>_.q-tree__node-header:(pl-px) [&_.q-tree__arrow]:(mr-px) [&_.q-tree__spinner]:(mr-px) [&_.q-tree__img]:(h-[32px]) [&_.q-tree__tickbox]:(mr-[3px]) [&_.q-tree__node]:(p-0) [&_.q-tree__node:after]:(top-[0] -left-[8px]) [&_.q-tree__node-header]:(mt-0 p-px) [&_.q-tree__node-header:before]:(top-[0] -left-[8px] w-[8px]) &>_.q-tree__node--child>_.q-tree__node-header:(pl-[17px]) &>_.q-tree__node--child>_.q-tree__node-header:before:(-left-[25px] w-[21px]) [&_.q-tree__node-body]:(pt-[0] pr-[0] pb-[2px]) [&_.q-tree__children]:(pl-[16px])`
    )
  ],

  [
    /^q-tree--dense$/,
    componentClass(
      'q-tree--dense',
      qe`[&_.q-tree__node--parent>_.q-tree__node-collapsible>_.q-tree__node-body]:(pt-[0] pr-[0] pb-[2px] pl-[20px]) [&_.q-tree__node--parent>_.q-tree__node-collapsible>_.q-tree__node-body:after]:(left-[8px])`
    )
  ]
]

export { preflights, shortcuts }
