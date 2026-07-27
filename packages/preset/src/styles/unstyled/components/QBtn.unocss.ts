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
        `inline-flex flex-col items-stretch relative outline-0 align-middle text-center w-auto min-h-40px cursor-default px-[16px] py-[4px] min-h-[2.572em] [&.disabled]:(!opacity-70) [&_.q-btn__overlay]:( block absolute left-[0] right-[0] top-[0] bottom-[0])`
    )
  ],
  [
    /^q-btn--actionable$/,
    componentCtxClass('q-btn--actionable', ({ theme }) => `cursor-pointer`)
  ],

  [/^q-btn--no-uppercase$/, staticClass(``)],

  [/^q-btn--rectangle$/, staticClass(``)],

  [/^q-btn--outline$/, componentCtxClass('q-btn--outline', ({ theme }) => ``)],

  [
    /^q-btn--push$/,
    componentCtxClass(
      'q-btn--push',
      ({ theme }) =>
        `[&.q-btn--actionable]:([transition:transform_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&.q-btn--actionable:active]:(translate-y-[2px]) [&.q-btn--actionable.q-btn--active]:(translate-y-[2px])`
    )
  ],

  [/^q-btn--rounded$/, staticClass(``)],

  [
    /^q-btn--round$/,
    componentCtxClass(
      'q-btn--round',
      ({ theme }) => `p-0 min-w-[3em] min-h-[3em]`
    )
  ],

  [/^q-btn--square$/, staticClass(``)],

  [/^q-btn--flat$/, componentCtxClass('q-btn--flat', ({ theme }) => ``)],

  [
    /^q-btn--unelevated$/,
    componentCtxClass('q-btn--unelevated', ({ theme }) => ``)
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
      `w-56px h-56px z-${theme.quasar.z.fab} [&_.q-icon]:(m-auto)`
  ],

  [
    /^q-btn--fab-mini$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn--fab-mini'] ??
      `w-40px h-40px [&_.q-icon]:(m-auto)`
  ],

  [/^q-btn__content$/, staticClass(`[transition:opacity_0.3s] z-0`)],

  [
    /^q-btn__content--hidden$/,
    componentCtxClass(
      'q-btn__content--hidden',
      ({ theme }) => `opacity-0 pointer-events-none`
    )
  ],

  [/^q-btn__progress$/, staticClass(`z-0`)],

  [
    /^q-btn__progress-indicator$/,
    componentCtxClass(
      'q-btn__progress-indicator',
      ({ theme }) => `[transform:translateX(-100%)]`
    )
  ],

  [
    /^q-btn__progress--dark$/,
    componentCtxClass('q-btn__progress--dark', ({ theme }) => ``)
  ]
]

export { shortcuts }
