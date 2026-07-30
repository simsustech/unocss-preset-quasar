/**
 * QBtn.unocss.ts — Unified QBtn style template
 *
 * Spec-driven version: uses the bound spec resolver `s()` to
 * interpolate token values at shortcut-build time.
 *
 * Each style module calls `makeQBtnShortcuts(bindSpec(spec))` and
 * merges the result into its own shortcut list.
 *
 * @module Styles
 */

import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentCtxClass,
  componentClass,
  qe,
  staticClass
} from '../../_helpers.js'
import type { SpecResolver } from '../../_spec.js'

/**
 * Generate QBtn shortcuts bound to a specific style's spec.
 *
 * @param s - The bound spec resolver from `bindSpec(spec)`.
 * @returns An array of UnoCSS shortcuts.
 */
export function makeQBtnShortcuts(s: SpecResolver): Shortcut<QuasarTheme>[] {
  return [
    [
      /^q-btn$/,
      componentCtxClass(
        'q-btn',
        ({ theme }) =>
          `bg-${s('color.primary')} text-${s('color.onPrimary')} inline-flex flex-col font-medium items-stretch relative outline-0 border-0 align-middle text-[14px] leading-[1.715em] no-underline font-medium text-center w-auto overflow-visible min-h-40px cursor-default px-[24px] py-[4px] min-h-[2.572em] [&_.q-icon]:(text-[1.715em]) [&_.q-spinner]:(text-[1.715em]) [&.disabled]:(!opacity-70) [&:before]:(content-empty block absolute left-[0] right-[0] top-[0] bottom-[0] [border-radius:${s('shape.cornerExtraLarge')}])`
      )
    ],

    [
      /^q-btn--actionable$/,
      componentCtxClass(
        'q-btn--actionable',
        ({ theme }) =>
          `cursor-pointer [&.q-btn--standard:before]:([transition:box-shadow_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--standard:active:before]:([box-shadow:${s('elevation.level2')}]) [&.q-btn--standard.q-btn--active:before]:(shadow-lg shadow-gray/14)`
      )
    ],

    [
      /^q-btn--standard$/,
      componentCtxClass(
        'q-btn--standard',
        ({ theme }) =>
          `bg-${s('color.primary')} [&.q-btn--standard.q-btn--rectangle]:(rounded-[${s('shape.cornerExtraLarge')}]) dark:bg-${s('darkTokens.color.primary')} text-${s('color.onPrimary')} dark:text-${s('darkTokens.color.onPrimary')}
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
        }) => qe`rounded-[${s('shape.cornerExtraLarge')}] !bg-transparent text-${s('color.primary')} dark:text-${s('darkTokens.color.primary')}
        [&:before]:(shadow-none [border-width:1px] border-solid border-${s('color.outline')} dark:border-${s('darkTokens.color.outline')})
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

    [
      /^q-btn--rounded$/,
      staticClass(`rounded-[${s('shape.cornerExtraLarge')}]`)
    ],

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
        }) => qe`rounded-[${s('shape.cornerExtraLarge')}] !bg-transparent text-${s('color.primary')} dark:text-${s('darkTokens.color.primary')} px-[12px]
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
        `bg-${s('color.primaryContainer')} dark:bg-${s('darkTokens.color.primaryContainer')} text-${s('color.onSurface')} dark:text-${s('darkTokens.color.onSurface')}
        flex-row items-center justify-center min-w-[56px] h-56px p-0 !rounded-${s('shape.cornerLarge')}
       z-${theme.quasar.z.fab}
       [&_.q-icon]:(text-[24px]) `
    ],

    [
      /^q-btn--fab-mini$/,
      ([, c], { theme }) =>
        theme.quasar?.components?.['q-btn--fab-mini'] ??
        `bg-${s('color.primaryContainer')} dark:bg-${s('darkTokens.color.primaryContainer')} text-${s('color.onSurface')} dark:text-${s('darkTokens.color.onSurface')}
         flex-row items-center justify-center min-w-[40px] h-40px p-0 !rounded-${s('shape.cornerMedium')}
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
}
