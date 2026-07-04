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
        `[background-color:var(--q-primary)] dark:[background-color:var(--q-primary)] [color:var(--q-on-primary)] dark:[color:var(--q-on-primary)] inline-flex flex-col font-medium items-stretch relative outline-0 border-0 align-middle [font-size:var(--q-font-md)] leading-[1.715em] no-underline font-medium text-center w-auto overflow-visible min-h-40px cursor-default [padding-inline:var(--q-space-xl)] [padding-block:var(--q-space-xs)] min-h-[2.572em] [&_.q-icon]:(text-[1.715em]) [&_.q-spinner]:(text-[1.715em]) [&.disabled]:(!opacity-70) [&:before]:(content-empty block absolute left-[0] right-[0] top-[0] bottom-[0] [border-radius:inherit])`
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
        `[background-color:var(--q-primary)] [&.q-btn--standard.q-btn--rectangle]:([border-radius:var(--q-radius-xl)]) dark:[background-color:var(--q-primary)] [color:var(--q-on-primary)] dark:[color:var(--q-on-primary)]
       [&:before]:([border-radius:inherit] shadow-md shadow-gray/14)`
    )
  ],

  [/^q-btn--no-uppercase$/, staticClass(`normal-case`)],

  [
    /^q-btn--outline$/,
    componentCtxClass(
      'q-btn--outline',
      ({
        theme
      }) => qe`[border-radius:var(--q-radius-xl)] !bg-transparent [color:var(--q-primary)] dark:[color:var(--q-primary)]
        [&:before]:(shadow-none [border-width:1px] border-solid [border-color:var(--q-outline)] dark:[border-color:var(--q-outline)])
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

  [/^q-btn--rounded$/, staticClass(`[border-radius:var(--q-radius-xl)]`)],

  [
    /^q-btn--round$/,
    componentCtxClass(
      'q-btn--round',
      ({ theme }) =>
        `[border-radius:var(--q-radius-circle)] p-0 min-w-[3em] min-h-[3em]`
    )
  ],

  [/^q-btn--square$/, staticClass(`rounded-none`)],

  [
    /^q-btn--flat$/,
    componentCtxClass(
      'q-btn--flat',
      ({
        theme
      }) => qe`[border-radius:var(--q-radius-xl)] !bg-transparent [color:var(--q-primary)] dark:[color:var(--q-primary)] [padding-inline:var(--q-space-md)]
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
      `[background-color:var(--q-primary-container)] dark:[background-color:var(--q-primary-container)] [color:var(--q-on-surface)] dark:[color:var(--q-on-surface)]
        flex-row items-center justify-center min-w-[56px] h-56px p-0 !rounded-$shape-corner-large
       z-${theme.quasar.z.fab}
       [&_.q-icon]:(text-[24px]) `
  ],

  [
    /^q-btn--fab-mini$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn--fab-mini'] ??
      `[background-color:var(--q-primary-container)] dark:[background-color:var(--q-primary-container)] [color:var(--q-on-surface)] dark:[color:var(--q-on-surface)]
       flex-row items-center justify-center min-w-[40px] h-40px p-0 !rounded-$shape-corner-medium
      [&_.q-icon]:(text-[24px]) `
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
      ({ theme }) =>
        `[transform:translateX(-100%)] bg-[rgba(255,_255,_255,_0.25)]`
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
