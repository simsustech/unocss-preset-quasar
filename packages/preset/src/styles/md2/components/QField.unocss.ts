import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
@keyframes q-field-label {
  40% {
    margin-left: 2px;
  }
  60%, 80% {
    margin-left: -2px;
  }
  70%, 90% {
    margin-left: 2px;
  }
}
@keyframes q-autofill {
  to {
    background: transparent;
    color: inherit;
  }
}
`
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-field$/,
    componentClass(
      'q-field',
      `text-[14px] 
	[&_::-ms-clear]:(hidden) 
	[&_::-ms-reveal]:(hidden)`
    )
  ],

  [/^q-field--with-bottom$/, staticClass(`pb-[20px]`)],

  [
    /^q-field__marginal$/,
    componentClass(
      'q-field__marginal',
      `text-black/54 dark:text-white/70 text-[24px] 
	[&_>_*_+_*]:(ml-[2px]) 
	[&_.q-avatar]:(text-[32px])`
    )
  ],

  [/^q-field__before$/, staticClass(`flex-initial pr-[12px]`)],

  [/^q-field__prepend$/, staticClass(`flex-initial pr-[12px]`)],

  [
    /^q-field__after$/,
    staticClass(`flex-initial pl-[12px] 
	[&:empty]:(hidden)`)
  ],

  [
    /^q-field__append$/,
    componentClass(
      'q-field__append',
      qe`flex-initial pl-[12px] 
	[&:empty]:(hidden) 
	[&_+_.q-field__append]:(pl-[2px])`
    )
  ],

  [/^q-field__inner$/, staticClass(`text-left`)],

  [
    /^q-field__bottom$/,
    componentClass(
      'q-field__bottom',
      `text-[12px] min-h-[20px] leading-none text-black/54 dark:text-white/70 mt--12px px-[12px] pb-[0] [backface-visibility:hidden]`
    )
  ],

  [
    /^q-field__bottom--animated$/,
    componentClass(
      'q-field__bottom--animated',
      `[transform:translateY(100%)] left-[0] right-[0] bottom-[0]`
    )
  ],

  [
    /^q-field__messages$/,
    componentClass(
      'q-field__messages',
      `leading-none 
	[&_>_div]:([word-wrap:break-word] break-words) 
	[&_>_div_+_div]:(mt-[4px])`
    )
  ],

  [/^q-field__counter$/, staticClass(`pl-[8px] leading-none`)],

  [
    /^q-field--item-aligned$/,
    componentClass(
      'q-field--item-aligned',
      qe`px-[16px] py-[8px] 
	[&_.q-field__before]:(min-w-[56px])`
    )
  ],

  [/^q-field__control-container$/, staticClass(`h-inherit items-center`)],

  [
    /^q-field__control$/,
    componentClass(
      'q-field__control',
      `h-[56px] max-w-full outline-none text-primary
	[&:before]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute border-rd-inherit) 
	[&:after]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute)`
    )
  ],

  [
    /^q-field__shadow$/,
    componentClass(
      'q-field__shadow',
      qe`top-[8px] opacity-0 overflow-hidden whitespace-pre-wrap [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] 
	[&_+_.q-field__native::placeholder]:([transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_+_.q-field__native:focus::placeholder]:(opacity-0)`
    )
  ],

  [
    /^q-field__native$/,
    componentClass(
      'q-field__native',
      qe`font-normal leading-[28px] tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] border-none rounded-none bg-transparent text-black/87 dark:text-white outline-none px-[0] w-full min-w-[0] !outline-none select-auto 
	[&:-webkit-autofill]:() 
	[&:-webkit-autofill_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='color']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='date']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='datetime-local']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='month']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='time']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='week']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&:invalid]:([box-shadow:none]) 
	[&[type='file']]:(leading-[1em])`
    )
  ],

  [
    /^q-field__prefix$/,
    componentClass(
      'q-field__prefix',
      `font-normal leading-[28px] tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] border-none rounded-none bg-transparent text-black/87 dark:text-white outline-none px-[0] py-[6px] [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] whitespace-nowrap pr-[4px]`
    )
  ],

  [
    /^q-field__suffix$/,
    componentClass(
      'q-field__suffix',
      `font-normal leading-[28px] tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] border-none rounded-none bg-transparent text-black/87 dark:text-white outline-none px-[0] py-[6px] [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] whitespace-nowrap pl-[4px]`
    )
  ],

  [
    /^q-field__input$/,
    componentClass(
      'q-field__input',
      qe`font-normal leading-[28px] tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] border-none rounded-none bg-transparent text-black/87 dark:text-white outline-none px-[0] py-[6px] w-full min-w-[0] !outline-none select-auto 
	[&:-webkit-autofill]:() 
	[&:-webkit-autofill_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='color']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='date']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='datetime-local']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='month']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='time']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='week']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&:invalid]:([box-shadow:none]) p-0 h-[0] min-h-[24px] leading-[24px]`
    )
  ],

  [
    /^q-field--readonly$/,
    componentClass(
      'q-field--readonly',
      qe`[&_.q-placeholder]:(!opacity-100) 
	[&.q-field--labeled_.q-field__native]:(cursor-default) 
	[&.q-field--labeled_.q-field__input]:(cursor-default) 
	[&.q-field--float_.q-field__native]:(cursor-text) 
	[&.q-field--float_.q-field__input]:(cursor-text)`
    )
  ],

  [
    /^q-field--disabled$/,
    componentClass(
      'q-field--disabled',
      qe`[&_.q-placeholder]:(!opacity-100) 
	[&_.q-field__inner]:(cursor-not-allowed) 
	[&_.q-field__control]:(pointer-events-none) 
	[&_.q-field__control_>_div]:(!opacity-60) 
	[&_.q-field__control_>_div]:(!outline-none) 
	[&_.q-field__control_>_div_*]:(!outline-none)`
    )
  ],

  [
    /^q-field__label$/,
    componentClass(
      'q-field__label',
      `left-[0] top-[18px] max-w-full text-black/60 dark:text-white/70 text-[16px] leading-tight font-normal tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] origin-[left_top] [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_max-width_0.324s_cubic-bezier(0.4,_0,_0.2,_1)] [backface-visibility:hidden]`
    )
  ],

  [
    /^q-field--float$/,
    componentClass(
      'q-field--float',
      qe`[&_.q-field__label]:(max-w-[133%] -translate-y-[40%] scale-[0.75] [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_max-width_0.396s_cubic-bezier(0.4,_0,_0.2,_1)])`
    )
  ],

  [
    /^q-field--highlighted$/,
    componentClass(
      'q-field--highlighted',
      qe`[&_.q-field__label]:(text-current) 
	[&_.q-field__shadow]:(opacity-50)`
    )
  ],

  [
    /^q-field--filled$/,
    componentClass(
      'q-field--filled',
      qe`[&_.q-field__control]:(px-[12px] py-[0] bg-black/5 rounded-tl-[4px] rounded-br-[0] rounded-tr-[4px] rounded-bl-[0]) 
	[&_.q-field__control:before]:(bg-black/5 [border-bottom:1px_solid_rgba(0,_0,_0,_0.42)] opacity-0 [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_background_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field__control:hover:before]:(opacity-100) 
	[&_.q-field__control:after]:(h-[2px] top-auto origin-[center_bottom] [transform:scale3d(0,_1,_1)] bg-current [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&.q-field--rounded_.q-field__control]:(rounded-tl-[28px] rounded-br-[0] rounded-tr-[28px] rounded-bl-[0]) 
	[&.q-field--highlighted_.q-field__control:before]:(opacity-100 bg-black/12) 
	[&.q-field--highlighted_.q-field__control:after]:([transform:scale3d(1,_1,_1)]) 
	[&.q-field--dark_.q-field__control]:(bg-white/7) 
	[&.q-field--dark_.q-field__control:before]:(bg-white/7) 
	[&.q-field--dark.q-field--highlighted_.q-field__control:before]:(bg-white/1) 
	[&.q-field--readonly_.q-field__control:before]:(opacity-100 bg-transparent [border-bottom-style:dashed])`
    )
  ],

  [
    /^q-field--outlined$/,
    componentClass(
      'q-field--outlined',
      qe`[&_.q-field__control]:(rounded-[4px] px-[12px] py-[0]) 
	[&_.q-field__control:before]:([border-width:1px] border-solid border-black/24 [transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field__control:hover:before]:(border-black) 
	[&_.q-field__control:after]:([height:inherit] [border-radius:inherit] [border-width:2px] border-solid border-transparent [transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field__native:-webkit-autofill]:(mt-px mb-px) 
	[&_.q-field__input:-webkit-autofill]:(mt-px mb-px) 
	[&.q-field--rounded_.q-field__control]:(rounded-[28px]) 
	[&.q-field--highlighted_.q-field__control:hover:before]:(border-transparent) 
	[&.q-field--highlighted_.q-field__control:after]:(border-current border-2 [transform:scale3d(1,_1,_1)]) 
	[&.q-field--readonly_.q-field__control:before]:(border-dashed)`
    )
  ],

  [
    /^q-field--standard$/,
    componentClass(
      'q-field--standard',
      qe`[&_.q-field__control:before]:([border-bottom:1px_solid_rgba(0,_0,_0,_0.24)] [transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field__control:hover:before]:(border-black) 
	[&_.q-field__control:after]:(h-[2px] top-auto [border-bottom-left-radius:inherit] [border-bottom-right-radius:inherit] origin-[center_bottom] [transform:scale3d(0,_1,_1)] bg-current [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&.q-field--highlighted_.q-field__control:after]:([transform:scale3d(1,_1,_1)]) 
	[&.q-field--readonly_.q-field__control:before]:([border-bottom-style:dashed]) 
	[&_.q-field__bottom]:(pl-0 pr-0) 
	[&.q-field--dense_.q-field__control]:(pl-0 pr-0)`
    )
  ],

  [
    /^q-field--dark$/,
    componentClass(
      'q-field--dark',
      qe`[&_.q-field__control:before]:(border-white/60) 
	[&_.q-field__control:hover:before]:(border-white) 
	[&_.q-field__native]:(text-white) 
	[&_.q-field__prefix]:(text-white) 
	[&_.q-field__suffix]:(text-white) 
	[&_.q-field__input]:(text-white) 
	[&:not(.q-field--highlighted)_.q-field__label]:(text-white/70) 
	[&_.q-field__marginal]:(text-white/70) 
	[&_.q-field__bottom]:(text-white/70)`
    )
  ],

  [
    /^q-field--standout$/,
    componentClass(
      'q-field--standout',
      qe`[&_.q-field__control]:(px-[12px] py-[0] bg-black/5 rounded-[4px] [transition:box-shadow_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_background-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field__control:before]:(bg-black/7 opacity-0 [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_background_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field__control:hover:before]:(opacity-100) 
	[&.q-field--rounded_.q-field__control]:(rounded-[28px]) 
	[&.q-field--highlighted_.q-field__control]:([box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] bg-white) 
	[&.q-field--highlighted_.q-field__native]:(text-white) 
	[&.q-field--highlighted_.q-field__prefix]:(text-white) 
	[&.q-field--highlighted_.q-field__suffix]:(text-white) 
	[&.q-field--highlighted_.q-field__prepend]:(text-white) 
	[&.q-field--highlighted_.q-field__append]:(text-white) 
	[&.q-field--highlighted_.q-field__input]:(text-white) 
	[&.q-field--readonly_.q-field__control:before]:(opacity-100 bg-transparent [border-width:1px] border-dashed border-black/24) 
	[&.q-field--dark_.q-field__control]:(bg-[rgba(255,_255,_255,_0.07)]) 
	[&.q-field--dark_.q-field__control:before]:(bg-white/7) 
	[&.q-field--dark.q-field--highlighted_.q-field__control]:(bg-white) 
	[&.q-field--dark.q-field--highlighted_.q-field__native]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field__prefix]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field__suffix]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field__prepend]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field__append]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field__input]:(text-black) 
	[&.q-field--dark.q-field--readonly_.q-field__control:before]:(border-white/24)`
    )
  ],

  [
    /^q-field--labeled$/,
    componentClass(
      'q-field--labeled',
      qe`[&_.q-field__native]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field__prefix]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field__suffix]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field__shadow]:(top-[0]) 
	[&:not(.q-field--float)_.q-field__prefix]:(opacity-0) 
	[&:not(.q-field--float)_.q-field__suffix]:(opacity-0) 
	[&:not(.q-field--float)_.q-field__native::placeholder]:(text-transparent) 
	[&:not(.q-field--float)_.q-field__input::placeholder]:(text-transparent) 
	[&.q-field--dense_.q-field__native]:() 
	[&.q-field--dense_.q-field__prefix]:() 
	[&.q-field--dense_.q-field__suffix]:()`
    )
  ],

  [
    /^q-field--dense$/,
    componentClass(
      'q-field--dense',
      qe`[&_.q-field--with-bottom]:(pb-[19px]) 
	[&_.q-field__shadow]:(top-[0]) 
	[&_.q-field__control]:(h-[40px]) 
	[&_.q-field__marginal]:(h-[40px]) 
	[&_.q-field__bottom]:(text-[11px]) 
	[&_.q-field__label]:(text-[14px] top-[10px]) 
	[&_.q-field__before]:() 
	[&_.q-field__prepend]:() 
	[&_.q-field__after]:() 
	[&_.q-field__append]:() 
	[&_.q-field__append_+_.q-field__append]:(pl-[2px]) 
	[&_.q-field__marginal_.q-avatar]:(text-[24px]) 
	[&.q-field--float_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__native:-webkit-autofill_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__input:-webkit-autofill_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__native[type='color']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__native[type='date']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__native[type='datetime-local']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__native[type='month']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__native[type='time']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__native[type='week']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__input[type='color']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__input[type='date']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__input[type='datetime-local']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__input[type='month']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__input[type='time']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field__input[type='week']_+_.q-field__label]:([transform:translateY(-40%)] scale-[0.75])`
    )
  ],

  [
    /^q-field--borderless$/,
    componentClass(
      'q-field--borderless',
      qe`[&_.q-field__bottom]:(pl-0 pr-0) 
	[&.q-field--dense_.q-field__control]:(pl-0 pr-0)`
    )
  ],

  [
    /^q-field--error$/,
    componentClass(
      'q-field--error',
      qe`[&_.q-field__label]:(animate-[q-field-label_0.36s]) 
	[&_.q-field__bottom]:(text-color-negative)`
    )
  ],

  [
    /^q-field__focusable-action$/,
    componentClass(
      'q-field__focusable-action',
      `opacity-60 cursor-pointer !outline-none border-[0] [color:inherit] bg-transparent p-0 
	[&:hover]:(opacity-100) 
	[&:focus]:(opacity-100)`
    )
  ],

  [
    /^q-field--auto-height$/,
    staticClass(qe`
	[&_.q-field__control]:(h-auto)
	[&_.q-field__control]:(min-h-[56px])
	[&_.q-field__native]:(min-h-[56px])
	[&_.q-field__native]:(items-center)
	[&_.q-field__control-container]:(pt-0)
	[&_.q-field__native]:(leading-[18px])
	[&_.q-field__prefix]:(leading-[18px])
	[&_.q-field__suffix]:(leading-[18px])
	[&.q-field--labeled_.q-field__control-container]:(pt-[24px])
	[&.q-field--labeled_.q-field__shadow]:(top-[24px])
	[&.q-field--labeled_.q-field__native]:(pt-0)
	[&.q-field--labeled_.q-field__prefix]:(pt-0)
	[&.q-field--labeled_.q-field__suffix]:(pt-0)
	[&.q-field--labeled_.q-field__native]:(min-h-[24px])
	[&.q-field--dense_.q-field__control]:(min-h-[40px])
	[&.q-field--dense_.q-field__native]:(min-h-[40px])
	[&.q-field--dense.q-field--labeled_.q-field__control-container]:(pt-10px)
	[&.q-field--dense.q-field--labeled_.q-field__shadow]:(top-[14px])    
	[&.q-field--dense.q-field--labeled_.q-field__native]:(min-h-[24px])`)
  ],

  [
    /^q-field--square$/,
    staticClass(qe`
	[&_.q-field__control]:(!rounded-none)`)
  ]
]

export { preflights, shortcuts }
