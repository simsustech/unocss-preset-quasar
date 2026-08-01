/**
 * QBtn.unocss.ts — Shared var-driven QBtn shortcuts
 *
 * ONE set of QBtn shortcuts shared by all styles. All style-dependent
 * values are CSS custom properties (`--q-btn-*`) emitted by the token
 * preflight per body class (`body.quasar-style-md3`, `md2`, `unstyled`).
 * Switching the body class swaps values at runtime.
 *
 * @module Styles
 */

import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-btn$/,
    componentClass(
      'q-btn',
      `bg-$q-btn-bg text-$q-btn-color inline-flex flex-col font-medium items-stretch relative outline-0 border-0 align-middle [font-size:var(--q-btn-font-size)] leading-$q-btn-line-height no-underline [text-transform:var(--q-btn-text-transform)] font-medium text-center w-auto overflow-visible cursor-default px-$q-btn-padding-x py-[4px] min-h-[2.572em] min-w-$q-btn-min-width rounded-$q-btn-radius [&_.q-icon]:(text-[1.715em]) [&_.q-spinner]:(text-[1.715em]) [&.disabled]:(!opacity-70) [&:before]:(content-empty block absolute left-[0] right-[0] top-[0] bottom-[0] [border-radius:inherit])`
    )
  ],
  [
    /^q-btn--actionable$/,
    componentClass(
      'q-btn--actionable',
      `cursor-pointer [&.q-btn--standard:before]:([transition:box-shadow_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--standard:active:before]:([box-shadow:var(--q-btn-pressed-shadow)]) [&.q-btn--standard.q-btn--active:before]:([box-shadow:var(--q-btn-pressed-shadow-lg)])`
    )
  ],
  [
    /^q-btn--standard$/,
    componentClass(
      'q-btn--standard',
      `[&:before]:([border-radius:inherit] [box-shadow:var(--q-btn-shadow)])`
    )
  ],
  [/^q-btn--no-uppercase$/, staticClass(`normal-case`)],
  [
    /^q-btn--outline$/,
    componentClass(
      'q-btn--outline',
      qe`rounded-$q-btn-radius !bg-transparent text-$q-btn-outline-color
        [&:before]:([box-shadow:none] [border-width:1px] border-solid border-$q-btn-outline-border)
        [&_.q-btn__progress-indicator]:(opacity-20 bg-current)`
    )
  ],
  [
    /^q-btn--push$/,
    componentClass(
      'q-btn--push',
      `rounded-$q-btn-push-radius [&:before]:([border-bottom:var(--q-btn-push-border-bottom)]) [&.q-btn--actionable]:([transition:transform_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--actionable:before]:([transition:border-width_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--actionable:active]:(translate-y-[2px]) [&.q-btn--actionable.q-btn--active]:(translate-y-[2px]) [&.q-btn--actionable:active:before]:(border-b-[0]) [&.q-btn--actionable.q-btn--active:before]:(border-b-[0])`
    )
  ],
  [/^q-btn--rounded$/, staticClass(`rounded-$q-btn-rounded-radius`)],
  [
    /^q-btn--round$/,
    componentClass(
      'q-btn--round',
      `rounded-$q-btn-round-radius p-0 min-w-[3em] min-h-[3em]`
    )
  ],
  [/^q-btn--square$/, staticClass(`rounded-$q-btn-square-radius`)],
  [
    /^q-btn--flat$/,
    componentClass(
      'q-btn--flat',
      qe`rounded-$q-btn-radius !bg-transparent text-$q-btn-flat-color px-$q-btn-flat-padding-x
        [&:before]:([box-shadow:none])
      [&_.q-btn__progress-indicator]:(opacity-20 bg-current)`
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
      `p-$q-btn-dense-padding min-h-[2em]
      [&.q-btn--round]:(p-0 min-h-[2.4em] min-w-[2.4em]) [&_.on-left]:(mr-[6px]) [&_.on-right]:(ml-[6px])`
    )
  ],
  [
    /^q-btn--fab$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn--fab'] ??
      `bg-$q-fab-bg text-$q-fab-color
        flex-row items-center justify-center min-w-$q-fab-size h-$q-fab-size p-0 rounded-$q-fab-radius
       z-${theme.quasar.z.fab}
       [&_.q-icon]:(text-[24px]) `
  ],
  [
    /^q-btn--fab-mini$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn--fab-mini'] ??
      `bg-$q-fab-bg text-$q-fab-color
        flex-row items-center justify-center min-w-$q-fab-mini-size h-$q-fab-mini-size p-0 rounded-$q-fab-radius
       [&_.q-icon]:(text-[24px]) `
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
