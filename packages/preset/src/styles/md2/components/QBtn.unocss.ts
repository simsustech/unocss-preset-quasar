import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-btn$/,
    componentClass(
      'q-btn',
      `inline-flex flex-col font-medium items-stretch relative outline-0 border-0 align-middle text-[14px] leading-[1.715em] no-underline uppercase [color:inherit] bg-transparent font-medium text-center w-auto overflow-visible min-h-[36px] min-w-[64px] !!rounded-[4px] cursor-default px-[16px] py-[4px] min-h-[2.572em] [&_.q-icon]:(text-[1.715em]) [&_.q-spinner]:(text-[1.715em]) [&.disabled]:(!opacity-70) [&:before]:(content-empty block absolute left-[0] right-[0] top-[0] bottom-[0] [border-radius:inherit])`
    )
  ],
  [
    /^q-btn--actionable$/,
    componentClass(
      'q-btn--actionable',
      `cursor-pointer [&.q-btn--standard:before]:([transition:box-shadow_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--standard:active:before]:([box-shadow:0_3px_5px_-1px_rgba(0,_0,_0,_0.2),_0_5px_8px_rgba(0,_0,_0,_0.14),_0_1px_14px_rgba(0,_0,_0,_0.12)]) [&.q-btn--standard.q-btn--active:before]:([shadow-lg shadow-gray/14)`
    )
  ],

  [
    /^q-btn--standard$/,
    componentClass(
      'q-btn--standard',
      `[&:before]:([border-radius:inherit] shadow-[0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)])`
    )
  ],

  [/^q-btn--no-uppercase$/, staticClass(`normal-case`)],

  [
    /^q-btn--outline$/,
    componentClass(
      'q-btn--outline',
      qe`!bg-transparent [&:before]:(border-[1px] border-solid border-[currentColor]) [&:before]:([box-shadow:none]) [&_.q-btn__progress-indicator]:(opacity-20 bg-current)`
    )
  ],

  [
    /^q-btn--push$/,
    componentClass(
      'q-btn--push',
      `rounded-[7px] [&:before]:([border-bottom:3px_solid_rgba(0,_0,_0,_0.15)]) [&.q-btn--actionable]:([transition:transform_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--actionable:before]:([transition:border-width_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--actionable:active]:(translate-y-[2px]) [&.q-btn--actionable.q-btn--active]:(translate-y-[2px]) [&.q-btn--actionable:active:before]:(border-b-[0]) [&.q-btn--actionable.q-btn--active:before]:(border-b-[0])`
    )
  ],

  [/^q-btn--rounded$/, staticClass(`rounded-[28px]`)],

  [
    /^q-btn--round$/,
    componentClass('q-btn--round', `rounded-[50%] p-0 min-w-[3em] min-h-[3em]`)
  ],

  [/^q-btn--square$/, staticClass(`rounded-none`)],

  [
    /^q-btn--flat$/,
    componentClass(
      'q-btn--flat',
      qe`px-[8px] [&:before]:([box-shadow:none]) [&_.q-btn__progress-indicator]:(opacity-20 bg-current)`
    )
  ],

  [
    /^q-btn--unelevated$/,
    componentClass('q-btn--unelevated', `[&:before]:([box-shadow:none])`)
  ],

  [
    /^q-btn--dense$/,
    componentClass(
      'q-btn--dense',
      `p-[0.285em] min-h-[2em] [&.q-btn--round]:(p-0 min-h-[2.4em] min-w-[2.4em]) [&_.on-left]:(mr-[6px]) [&_.on-right]:(ml-[6px])`
    )
  ],

  [
    /^q-btn--fab$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn--fab'] ??
      `[&_.q-icon]:(text-[24px])  min-h-[56px] min-w-[56px] p-0 rounded-[50%]`
    // min-h-[56px] min-w-[56px] p-[16px] pb-0
  ],

  [
    /^q-btn--fab-mini$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn--fab-mini'] ??
      `[&_.q-icon]:(text-[24px]) p-[8px] pb-0 min-h-[40px] min-w-[40px] p-0 rounded-[50%]`
    // min-h-[40px] min-w-[40px]
  ],

  [/^q-btn__content$/, staticClass(`[transition:opacity_0.3s] z-0`)],

  [
    /^q-btn__content--hidden$/,
    componentClass('q-btn__content--hidden', `opacity-0 pointer-events-none`)
  ],

  [/^q-btn__progress$/, staticClass(`[border-radius:inherit] z-0`)],

  [
    /^q-btn__progress-indicator$/,
    componentClass(
      'q-btn__progress-indicator',
      `[transform:translateX(-100%)] bg-[rgba(255,_255,_255,_0.25)]`
    )
  ],

  [
    /^q-btn__progress--dark$/,
    componentClass(
      'q-btn__progress--dark',
      qe`[&_.q-btn__progress-indicator]:(bg-[rgba(0,_0,_0,_0.2)])`
    )
  ]
]

export { shortcuts }
