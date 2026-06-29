import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentClass,
  staticClass,
  componentCtxClass,
  qe
} from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-btn$/,
    componentCtxClass(
      'q-btn',
      ({ theme }) =>
        `layer-components:bg-$light-primary layer-components:dark:bg-$dark-primary layer-components:text-$light-on-primary layer-components:dark:text-$dark-on-primary inline-flex flex-col font-medium items-stretch relative outline-0 border-0 align-middle text-[14px] leading-[1.715em] no-underline font-medium text-center w-auto min-h-40px cursor-default px-[16px] py-[4px] min-h-[2.572em] [&_.q-icon]:(text-[1.715em]) [&_.q-spinner]:(text-[1.715em]) [&.disabled]:(!opacity-70) [&:before]:(content-empty block absolute left-[0] right-[0] top-[0] bottom-[0] [border-radius:inherit])`
    )
  ],
  [
    /^q-btn--actionable$/,
    componentCtxClass(
      'q-btn--actionable',
      ({ theme }) =>
        `cursor-pointer [&.q-btn--standard:before]:([transition:box-shadow_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--standard:active:before]:([box-shadow:0_3px_5px_-1px_rgba(0,_0,_0,_0.2),_0_5px_8px_rgba(0,_0,_0,_0.14),_0_1px_14px_rgba(0,_0,_0,_0.12)]) [&.q-btn--standard.q-btn--active:before]:(shadow-lg shadow-gray/14)`
    )
  ],

  [
    /^q-btn--standard$/,
    componentCtxClass(
      'q-btn--standard',
      ({ theme }) =>
        `rounded-[28px] layer-components:bg-$light-primary layer-components:dark:bg-$dark-primary layer-components:text-$light-on-primary layer-components:dark:text-$dark-on-primary
       [&:before]:([border-radius:inherit] shadow-md shadow-gray/14)`
    )
  ],

  [/^q-btn--no-uppercase$/, staticClass(`normal-case`)],

  [/^q-btn--rectangle$/, staticClass(`rounded-[3px]`)],

  [
    /^q-btn--outline$/,
    componentCtxClass(
      'q-btn--outline',
      ({
        theme
      }) => qe`!bg-transparent layer-components:text-$light-primary layer-components:dark:text-$dark-primary
       [&:before]:(shadow-none border-[1px] border-solid border-[currentColor]) 
       [&_.q-btn__progress-indicator]:(opacity-20 bg-current)`
    )
  ],

  [
    /^q-btn--push$/,
    componentCtxClass(
      'q-btn--push',
      ({ theme }) =>
        `rounded-[7px] [&:before]:([border-bottom:3px_solid_rgba(0,_0,_0,_0.15)]) [&.q-btn--actionable]:([transition:transform_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--actionable:before]:([transition:border-width_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--actionable:active]:(translate-y-[2px]) [&.q-btn--actionable.q-btn--active]:(translate-y-[2px]) [&.q-btn--actionable:active:before]:(border-b-[0]) [&.q-btn--actionable.q-btn--active:before]:(border-b-[0])`
    )
  ],

  [/^q-btn--rounded$/, staticClass(`rounded-[28px]`)],

  [
    /^q-btn--round$/,
    componentCtxClass(
      'q-btn--round',
      ({ theme }) => `rounded-[50%] p-0 min-w-[3em] min-h-[3em]`
    )
  ],

  [/^q-btn--square$/, staticClass(`rounded-none`)],

  [
    /^q-btn--flat$/,
    componentCtxClass(
      'q-btn--flat',
      ({
        theme
      }) => qe`!bg-transparent layer-components:text-$light-primary layer-components:dark:text-$dark-primary
      [&:before]:([box-shadow:none]) 
      [&_.q-btn__progress-indicator]:(opacity-20 bg-current)`
    )
  ],

  [
    /^q-btn--unelevated$/,
    componentCtxClass(
      'q-btn--unelevated',
      ({ theme }) => `[&:before]:([box-shadow:none])`
    )
  ],

  [
    /^q-btn--dense$/,
    componentCtxClass(
      'q-btn--dense',
      ({ theme }) => `p-[0.175em] min-h-[2em] 
      [&.q-btn--round]:(p-0 min-h-[2.4em] min-w-[2.4em]) [&_.on-left]:(mr-[6px]) [&_.on-right]:(ml-[6px])`
    )
  ],

  [
    /^q-btn--fab$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn--fab'] ??
      `layer-components:bg-$light-primary-container layer-components:dark:bg-$dark-primary-container layer-components:text-$light-on-surface layer-components:dark:text-$dark-on-surface
       w-56px h-56px !rounded-$shape-corner-large
       z-${theme.quasar.z.fab}
       [&_.q-icon]:(text-[24px]) [&_.q-icon]:(m-auto)`
  ],

  [
    /^q-btn--fab-mini$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn--fab-mini'] ??
      `layer-components:bg-$light-primary-container layer-components:dark:bg-$dark-primary-container layer-components:text-$light-on-surface layer-components:dark:text-$dark-on-surface
      w-40px h-40px !rounded-$shape-corner-medium
      [&_.q-icon]:(text-[24px]) [&_.q-icon]:(m-auto)`
  ],

  [/^q-btn__content$/, staticClass(`[transition:opacity_0.3s] z-0`)],

  [
    /^q-btn__content--hidden$/,
    componentCtxClass(
      'q-btn__content--hidden',
      ({ theme }) => `opacity-0 pointer-events-none`
    )
  ],

  [/^q-btn__progress$/, staticClass(`[border-radius:inherit] z-0`)],

  [
    /^q-btn__progress-indicator$/,
    componentCtxClass(
      'q-btn__progress-indicator',
      ({ theme }) => `-translate-x-full bg-[rgba(255,_255,_255,_0.25)]`
    )
  ],

  [
    /^q-btn__progress--dark$/,
    componentCtxClass(
      'q-btn__progress--dark',
      ({ theme }) =>
        qe`[&_.q-btn__progress-indicator]:(bg-[rgba(0,_0,_0,_0.2)])`
    )
  ]
]

export { shortcuts }
