import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-slider$/, staticClass(`relative`)],

  [/^q-slider--h$/, staticClass(`w-full`)],

  [/^q-slider--v$/, staticClass(`h-[200px]`)],

  [
    /^q-slider--editable$/,
    componentClass(
      'q-slider--editable',
      qe`[&_.q-slider__track-container]:(cursor-grab)`
    )
  ],

  [/^q-slider__track-container$/, staticClass(`outline-0`)],

  [
    /^q-slider__track-container--h$/,
    componentClass(
      'q-slider__track-container--h',
      qe`w-full px-[0] [padding-block:var(--q-space-md)] [&_.q-slider__selection]:(will-change-width will-change-left)`
    )
  ],

  [
    /^q-slider__track-container--v$/,
    componentClass(
      'q-slider__track-container--v',
      qe`h-full [padding-inline:var(--q-space-md)] py-[0] [&_.q-slider__selection]:(will-change-height will-change-top)`
    )
  ],

  [
    /^q-slider__track$/,
    componentClass(
      'q-slider__track',
      `[background-color:var(--q-secondary-container)]/30 dark:[background-color:var(--q-secondary-container)]/30 [border-radius:var(--q-radius-xs)] [width:inherit] [height:inherit] [color:var(--q-primary)] dark:[color:var(--q-primary)]`
    )
  ],

  [
    /^q-slider__inner$/,
    componentClass(
      'q-slider__inner',
      `[background-color:var(--q-secondary-container)]/30 dark:[background-color:var(--q-secondary-container)]/30 [border-radius:inherit] w-full h-full`
    )
  ],

  [
    /^q-slider__selection$/,
    componentClass(
      'q-slider__selection',
      `bg-current [border-radius:inherit] w-full h-full`
    )
  ],

  [
    /^q-slider__markers$/,
    componentClass(
      'q-slider__markers',
      `text-[rgba(0,_0,_0,_0.3)] [border-radius:inherit] w-full h-full [&:after]:(content-empty absolute bg-current)`
    )
  ],

  [
    /^q-slider__markers--h$/,
    componentClass(
      'q-slider__markers--h',
      `bg-[repeating-linear-gradient(_to_right,_currentColor,_currentColor_2px,_rgba(255,_255,_255,_0)_0,_rgba(255,_255,_255,_0)_)] [&:after]:(h-full w-[2px] top-0 right-0)`
    )
  ],

  [
    /^q-slider__markers--v$/,
    componentClass(
      'q-slider__markers--v',
      `bg-[repeating-linear-gradient(_to_bottom,_currentColor,_currentColor_2px,_rgba(255,_255,_255,_0)_0,_rgba(255,_255,_255,_0)_)] [&:after]:(w-full h-[2px] left-0 bottom-0)`
    )
  ],

  [
    /^q-slider__marker-labels-container$/,
    componentClass(
      'q-slider__marker-labels-container',
      `relative w-full h-full min-h-[24px] min-w-[24px]`
    )
  ],

  [/^q-slider__marker-labels$/, staticClass(`absolute`)],

  [/^q-slider__marker-labels--h-standard$/, staticClass(`top-0`)],

  [/^q-slider__marker-labels--h-switched$/, staticClass(`bottom-0`)],

  [
    /^q-slider__marker-labels--h-ltr$/,
    componentClass('q-slider__marker-labels--h-ltr', `-translate-x-1/2`)
  ],

  [/^q-slider__marker-labels--h-rtl$/, staticClass(`translate-x-1/2`)],

  [/^q-slider__marker-labels--v-standard$/, staticClass(`left-[4px]`)],

  [
    /^q-slider__marker-labels--v-switched$/,
    componentClass('q-slider__marker-labels--v-switched', `right-[4px]`)
  ],

  [
    /^q-slider__marker-labels--v-ltr$/,
    componentClass('q-slider__marker-labels--v-ltr', `-translate-y-1/2`)
  ],

  [/^q-slider__marker-labels--v-rtl$/, staticClass(`translate-y-1/2`)],

  [
    /^q-slider__thumb$/,
    componentClass(
      'q-slider__thumb',
      `outline-0 [transition:transform_0.18s_ease-out,_fill_0.18s_ease-out,_stroke_0.18s_ease-out] text-primary`
    )
  ],

  [/^q-slider__thumb--h$/, staticClass(`top-2/4`)],

  [
    /^q-slider__thumb--h-ltr$/,
    componentClass(
      'q-slider__thumb--h-ltr',
      `scale-100 -translate-x-1/2 -translate-y-1/2`
    )
  ],

  [
    /^q-slider__thumb--h-rtl$/,
    componentClass(
      'q-slider__thumb--h-rtl',
      `scale-100 translate-x-1/2 -translate-y-1/2`
    )
  ],

  [/^q-slider__thumb--v$/, staticClass(`left-2/4`)],

  [
    /^q-slider__thumb--v-ltr$/,
    componentClass(
      'q-slider__thumb--v-ltr',
      `scale-100 -translate-x-1/2 -translate-y-1/2`
    )
  ],

  [
    /^q-slider__thumb--v-rtl$/,
    componentClass(
      'q-slider__thumb--v-rtl',
      `scale-100 -translate-x-1/2 translate-y-1/2`
    )
  ],

  [
    /^q-slider__thumb-shape$/,
    componentClass(
      'q-slider__thumb-shape',
      `top-0 left-0 stroke-[3.5] stroke-current [transition:transform_0.28s] [&_path]:(stroke-current fill-current)`
    )
  ],

  [
    /^q-slider__focus-ring$/,
    componentClass(
      'q-slider__focus-ring',
      `[border-radius:var(--q-radius-circle)] opacity-0 [transition:transform_266.67ms_ease-out,_opacity_266.67ms_ease-out,_background-color_266.67ms_ease-out] delay-[140ms]`
    )
  ],

  [
    /^q-slider__pin$/,
    componentClass(
      'q-slider__pin',
      `opacity-0 whitespace-nowrap [transition:opacity_0.28s_ease-out] delay-[140ms] [&:before]:(content-empty w-[0] h-[0] absolute)`
    )
  ],

  [
    /^q-slider__pin--h$/,
    componentClass(
      'q-slider__pin--h',
      `[&:before]:([border-left:6px_solid_transparent] [border-right:6px_solid_transparent] left-2/4 -translate-x-1/2)`
    )
  ],

  [
    /^q-slider__pin--h-standard$/,
    componentClass(
      'q-slider__pin--h-standard',
      `bottom-full [&:before]:(bottom-[2px] [border-top:6px_solid_currentColor])`
    )
  ],

  [
    /^q-slider__pin--h-switched$/,
    componentClass(
      'q-slider__pin--h-switched',
      `top-full [&:before]:(top-[2px] [border-bottom:6px_solid_currentColor])`
    )
  ],

  [
    /^q-slider__pin--v$/,
    componentClass(
      'q-slider__pin--v',
      `top-0 [&:before]:(top-2/4 -translate-y-1/2 [border-top:6px_solid_transparent] [border-bottom:6px_solid_transparent])`
    )
  ],

  [
    /^q-slider__pin--v-standard$/,
    componentClass(
      'q-slider__pin--v-standard',
      `left-full [&:before]:(left-[2px] [border-right:6px_solid_currentColor])`
    )
  ],

  [
    /^q-slider__pin--v-switched$/,
    componentClass(
      'q-slider__pin--v-switched',
      `right-full [&:before]:(right-[2px] [border-left:6px_solid_currentColor])`
    )
  ],

  [/^q-slider__label$/, staticClass(`whitespace-nowrap absolute`)],

  [/^q-slider__label--h$/, staticClass(`left-2/4 -translate-x-1/2`)],

  [/^q-slider__label--h-standard$/, staticClass(`bottom-[7px]`)],

  [/^q-slider__label--h-switched$/, staticClass(`top-[7px]`)],

  [/^q-slider__label--v$/, staticClass(`top-2/4 -translate-y-1/2`)],

  [/^q-slider__label--v-standard$/, staticClass(`left-[7px]`)],

  [/^q-slider__label--v-switched$/, staticClass(`right-[7px]`)],

  [
    /^q-slider__text-container$/,
    componentClass(
      'q-slider__text-container',
      `min-h-[25px] [padding-inline:var(--q-space-sm)] py-[2px] [border-radius:var(--q-radius-xs)] bg-current relative text-center`
    )
  ],

  [/^q-slider__text$/, staticClass(`text-[#fff] [font-size:var(--q-font-sm)]`)],

  [
    /^q-slider--no-value$/,
    componentClass(
      'q-slider--no-value',
      qe`[&_.q-slider__thumb]:(opacity-0) [&_.q-slider__inner]:(opacity-0) [&_.q-slider__selection]:(opacity-0)`
    )
  ],

  [
    /^q-slider--focus$/,
    componentClass(
      'q-slider--focus',
      qe`[&_.q-slider__focus-ring]:(bg-current [transform:scale3d(1.55,_1.55,_1)] opacity-25) [&_.q-slider__thumb]:(opacity-100) [&_.q-slider__inner]:(opacity-100) [&_.q-slider__selection]:(opacity-100)`
    )
  ],

  [
    /^q-slider--inactive$/,
    componentClass(
      'q-slider--inactive',
      qe`[&_.q-slider__thumb--h]:([transition:left_0.28s,_right_0.28s]) [&_.q-slider__thumb--v]:([transition:top_0.28s,_bottom_0.28s]) [&_.q-slider__selection]:([transition:width_0.28s,_left_0.28s,_right_0.28s,_height_0.28s,_top_0.28s,_bottom_0.28s]) [&_.q-slider__text-container]:([transition:transform_0.28s])`
    )
  ],

  [
    /^q-slider--active$/,
    componentClass(
      'q-slider--active',
      qe` [&_.q-slider__thumb-shape]:(scale-150) [&_.q-slider__focus-ring]:(!scale-0)`
    )
  ],

  [
    /^q-slider--label$/,
    componentClass(
      'q-slider--label',
      qe`[&_.q-slider--focus_.q-slider__pin]:(opacity-100)`
    )
  ],

  [
    /^q-slider--dark$/,
    componentClass(
      'q-slider--dark',
      qe`[&_.q-slider__track]:(bg-[rgba(255,_255,_255,_0.1)]) [&_.q-slider__inner]:(bg-[rgba(255,_255,_255,_0.1)]) [&_.q-slider__markers]:(text-[rgba(255,_255,_255,_0.3)])`
    )
  ],

  [
    /^q-slider--dense$/,
    componentClass(
      'q-slider--dense',
      qe`[&_.q-slider__track-container--h]:(px-[0] py-[6px]) [&_.q-slider__track-container--v]:(px-[6px] py-[0])`
    )
  ]
]

export { shortcuts }
