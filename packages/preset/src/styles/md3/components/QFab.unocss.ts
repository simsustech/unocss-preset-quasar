import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^z-fab$/, staticClass(``)],

  [
    /^q-fab$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-fab'] ?? `relative align-middle`
    // [&_>_.q-btn]:(w-full)
  ],

  [/^q-fab--form-rounded$/, staticClass(`rounded-[28px]`)],

  [/^q-fab--form-square$/, staticClass(`rounded-[4px]`)],

  [
    /^q-fab__icon$/,
    componentClass(
      'q-fab__icon',
      `[transition:opacity_0.4s,_transform_0.4s] opacity-100 rotate-0 relative!`
    )
  ],

  [
    /^q-fab__active-icon$/,
    componentClass(
      'q-fab__active-icon',
      `[transition:opacity_0.4s,_transform_0.4s] opacity-0 -rotate-180 relative! !left--20px !mr--20px`
    )
  ],

  [
    /^q-fab__label--external$/,
    componentClass(
      'q-fab__label--external',
      `absolute bg-transparent px-[8px] py-[0] [transition:opacity_0.18s_cubic-bezier(0.65,_0.815,_0.735,_0.395)]`
    )
  ],

  [
    /^q-fab__label--external-hidden$/,
    componentClass(
      'q-fab__label--external-hidden',
      `opacity-0 pointer-events-none`
    )
  ],

  [
    /^q-fab__label--external-left$/,
    componentClass(
      'q-fab__label--external-left',
      `top-2/4 -left-[12px] [transform:translateX(-100%)] [transform:translateY(-50%)]`
    )
  ],

  [
    /^q-fab__label--external-right$/,
    componentClass(
      'q-fab__label--external-right',
      `top-2/4 -right-[12px] [transform:translateX(100%)] [transform:translateY(-50%)]`
    )
  ],

  [
    /^q-fab__label--external-bottom$/,
    componentClass(
      'q-fab__label--external-bottom',
      `-bottom-[12px] left-2/4 [transform:translateX(-50%)] translate-y-full`
    )
  ],

  [
    /^q-fab__label--external-top$/,
    componentClass(
      'q-fab__label--external-top',
      `-top-[12px] left-2/4 [transform:translateX(-50%)] -translate-y-full`
    )
  ],

  [
    /^q-fab__label--internal$/,
    componentClass(
      'q-fab__label--internal',
      `p-0 [transition:font-size_0.12s_cubic-bezier(0.65,_0.815,_0.735,_0.395),_max-height_0.12s_cubic-bezier(0.65,_0.815,_0.735,_0.395),_opacity_0.07s_cubic-bezier(0.65,_0.815,_0.735,_0.395)] max-h-[30px]`
    )
  ],

  [
    /^q-fab__label--internal-hidden$/,
    componentClass('q-fab__label--internal-hidden', `text-[0] opacity-0`)
  ],

  [/^q-fab__label--internal-top$/, staticClass(`pb-[0.12em]`)],

  [/^q-fab__label--internal-bottom$/, staticClass(`pt-[0.12em]`)],

  [
    /^q-fab__label--internal-left$/,
    componentClass('q-fab__label--internal-left', `pl-[0.285em] pr-[0.571em]`)
  ],

  [
    /^q-fab__label--internal-right$/,
    componentClass('q-fab__label--internal-right', `pr-[0.285em] pl-[0.571em]`)
  ],

  [
    /^q-fab__icon-holder$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-fab__icon-holder'] ??
      `[&:before]:(content-empty)`
    // min-w-[24px] min-h-[24px] relative
  ],

  [
    /^q-fab__icon-holder--opened$/,
    componentClass(
      'q-fab__icon-holder--opened',
      qe`[&_.q-fab__icon]:(rotate-180 opacity-0) [&_.q-fab__active-icon]:(rotate-0 opacity-100)`
    )
  ],

  [
    /^q-fab__actions$/,
    componentClass(
      'q-fab__actions',
      `absolute opacity-0 [transition:transform_0.18s_ease-in,_opacity_0.18s_ease-in] pointer-events-none items-center justify-center self-center p-[3px] [&_.q-btn]:(m-[5px])`
    )
  ],

  [
    /^q-fab__actions--right$/,
    componentClass(
      'q-fab__actions--right',
      `origin-[0_50%] scale-[0.4] -translate-x-[62px] h-[56px] left-full ml-[9px]`
    )
  ],

  [
    /^q-fab__actions--left$/,
    componentClass(
      'q-fab__actions--left',
      `origin-[100%_50%] scale-[0.4] translate-x-[62px] h-[56px] right-full mr-[9px] flex-row-reverse`
    )
  ],

  [
    /^q-fab__actions--up$/,
    componentClass(
      'q-fab__actions--up',
      `origin-[50%_100%] scale-[0.4] [transform:translateY(62px)] w-[56px] bottom-full mb-[9px] flex-col-reverse left-2/4 -ml-[28px]`
    )
  ],

  [
    /^q-fab__actions--down$/,
    componentClass(
      'q-fab__actions--down',
      `origin-[50%_0] scale-[0.4] [transform:translateY(-62px)] w-[56px] top-full mt-[9px] flex-col left-2/4 -ml-[28px]`
    )
  ],

  [
    /^q-fab__actions--opened$/,
    componentClass(
      'q-fab__actions--opened',
      `opacity-100 scale-100 [transform:translateX(0.1px)] [transform:translateY(0)] pointer-events-all`
    )
  ],

  [
    /^q-fab--align-left$/,
    componentClass(
      'q-fab--align-left',
      qe`[&_>_.q-fab__actions--up]:(items-start left-[28px]) [&_>_.q-fab__actions--down]:(items-start left-[28px])`
    )
  ],

  [
    /^q-fab--align-right$/,
    componentClass(
      'q-fab--align-right',
      qe`[&_>_.q-fab__actions--up]:(items-end left-auto right-0) [&_>_.q-fab__actions--down]:(items-end left-auto right-0)`
    )
  ]
]

export { shortcuts }
