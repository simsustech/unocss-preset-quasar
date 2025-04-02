import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

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

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-field$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field'] ??
      `text-[14px]
	[&_::-ms-clear]:(hidden) 
	[&_::-ms-reveal]:(hidden)`
  ],

  [/^q-field--with-bottom$/, ([, c], { theme }) => `pb-[20px]`],

  [
    /^q-field__marginal$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__marginal'] ??
      `h-[56px] text-black/54 text-[24px] 
	[&_>_*_+_*]:(ml-[2px]) 
	[&_.q-avatar]:(text-[32px])`
  ],

  [/^q-field__before$/, ([, c], { theme }) => `flex-initial pr-[12px]`],

  [/^q-field__prepend$/, ([, c], { theme }) => `flex-initial pr-[12px]`],

  [
    /^q-field__after$/,
    ([, c], { theme }) => `flex-initial pl-[12px] 
	[&:empty]:(hidden)`
  ],

  [
    /^q-field__append$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__append'] ??
      `flex-initial pl-[12px] 
	[&:empty]:(hidden) 
	[&_+_.q-field\\_\\_append]:(pl-[2px])`
  ],

  [/^q-field__inner$/, ([, c], { theme }) => `text-left`],

  [
    /^q-field__bottom$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__bottom'] ??
      `text-[12px] min-h-[20px] leading-none text-black/54 mt--12px px-[12px] pb-[0] [backface-visibility:hidden]`
  ],

  [
    /^q-field__bottom--animated$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__bottom--animated'] ??
      `translate-y-full left-[0] right-[0] bottom-[0]`
  ],

  [
    /^q-field__messages$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__messages'] ??
      `leading-none 
	[&_>_div]:([word-wrap:break-word] break-words) 
	[&_>_div_+_div]:(mt-[4px])`
  ],

  [/^q-field__counter$/, ([, c], { theme }) => `pl-[8px] leading-none`],

  [
    /^q-field--item-aligned$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--item-aligned'] ??
      `px-[16px] py-[8px] 
	[&_.q-field\\_\\_before]:(min-w-[56px])`
  ],

  [
    /^q-field__control-container$/,
    ([, c], { theme }) => `h-inherit items-center`
  ],

  [
    /^q-field__control$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__control'] ??
      `h-[56px] max-w-full outline-none text-light-primary dark:text-dark-primary
	[&:before]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute border-rd-inherit) 
	[&:after]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute)`
  ],

  [
    /^q-field__shadow$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__shadow'] ??
      `top-[8px] opacity-0 overflow-hidden whitespace-pre-wrap [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] 
	[&_+_.q-field\\_\\_native::placeholder]:([transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_+_.q-field\\_\\_native:focus::placeholder]:(opacity-0)`
  ],

  [
    /^q-field__native$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__native'] ??
      `font-normal leading-[28px] tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] border-none rounded-none bg-transparent text-black/87 px-0 w-full min-w-0 !outline-none select-auto 
  [&:focus-visible]:(!outline-none)
  [&textarea:focus]:(outline-none)
  [&input:focus]:(outline-none)
	[&:-webkit-autofill]:() 
	[&:-webkit-autofill_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='color']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='date']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='datetime-local']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='month']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='time']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='week']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&:invalid]:([box-shadow:none]) 
	[&[type='file']]:(leading-[1em])`
  ],

  [
    /^q-field__prefix$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__prefix'] ??
      `font-normal leading-[28px] tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] border-none rounded-none bg-transparent text-black/87 outline-none px-[0] py-[6px] [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] whitespace-nowrap pr-[4px]`
  ],

  [
    /^q-field__suffix$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__suffix'] ??
      `font-normal leading-[28px] tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] border-none rounded-none bg-transparent text-black/87 outline-none px-[0] py-[6px] [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] whitespace-nowrap pl-[4px]`
  ],

  [
    /^q-field__input$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__input'] ??
      `font-normal leading-[28px] tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] border-none rounded-none bg-transparent text-black/87 outline-none px-[0] py-[6px] w-full min-w-[0] !outline-none select-auto 
	[&:-webkit-autofill]:() 
	[&:-webkit-autofill_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='color']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='date']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='datetime-local']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='month']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='time']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&[type='week']_+_.q-field\\_\\_label]:(-translate-y-[40%] scale-[0.75]) 
	[&:invalid]:([box-shadow:none]) p-0 h-[0] min-h-[24px] leading-[24px]`
  ],

  [
    /^q-field--readonly$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--readonly'] ??
      `[&_.q-placeholder]:(!opacity-100) 
	[&.q-field--labeled_.q-field\\_\\_native]:(cursor-default) 
	[&.q-field--labeled_.q-field\\_\\_input]:(cursor-default) 
	[&.q-field--float_.q-field\\_\\_native]:(cursor-text) 
	[&.q-field--float_.q-field\\_\\_input]:(cursor-text)`
  ],

  [
    /^q-field--disabled$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--disabled'] ??
      `[&_.q-placeholder]:(!opacity-100) 
	[&_.q-field\\_\\_inner]:(cursor-not-allowed) 
	[&_.q-field\\_\\_control]:(pointer-events-none) 
	[&_.q-field\\_\\_control_>_div]:(!opacity-60) 
	[&_.q-field\\_\\_control_>_div]:(!outline-[0]) 
	[&_.q-field\\_\\_control_>_div_*]:(!outline-[0])`
  ],

  [
    /^q-field__label$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__label'] ??
      `left-[0] top-[18px] max-w-full text-black/60 text-[16px] leading-tight font-normal tracking-[0.00937em] [text-decoration:inherit] [text-transform:inherit] origin-[left_top] [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_max-width_0.324s_cubic-bezier(0.4,_0,_0.2,_1)] [backface-visibility:hidden]`
  ],

  [
    /^q-field--float$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--float'] ??
      `[&_.q-field\\_\\_label]:(max-w-[133%] -translate-y-[40%] scale-[0.75] [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_max-width_0.396s_cubic-bezier(0.4,_0,_0.2,_1)])`
  ],

  [
    /^q-field--highlighted$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--highlighted'] ??
      `[&_.q-field\\_\\_label]:(text-current) 
	[&_.q-field\\_\\_shadow]:(opacity-50)`
  ],

  [
    /^q-field--filled$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--filled'] ??
      `bg-light-surface-container text-light-on-surface-variant
       dark:bg-dark-surface-container dark:text-dark-on-surface-variant
      [&_.q-field\\_\\_control]:(px-[16px] py-[0] layer-components:bg-black/5 rounded-tl-[4px] rounded-br-[0] rounded-tr-[4px] rounded-bl-[0]) 
	[&_.q-field\\_\\_control:before]:(layer-components:bg-black/5 [border-bottom:1px_solid_rgba(0,_0,_0,_0.42)] opacity-0 [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_background_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:hover:before]:(opacity-100) 
	[&_.q-field\\_\\_control:after]:(h-[2px] top-auto origin-[center_bottom] [transform:scale3d(0,_1,_1)] bg-current [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&.q-field--rounded_.q-field\\_\\_control]:(rounded-tl-[28px] rounded-br-[0] rounded-tr-[28px] rounded-bl-[0]) 
	[&.q-field--highlighted_.q-field\\_\\_control:before]:(opacity-100 layer-components:bg-black/12) 
	[&.q-field--highlighted_.q-field\\_\\_control:after]:([transform:scale3d(1,_1,_1)]) 
	[&.q-field--dark_.q-field\\_\\_control]:(layer-components:bg-white/7) 
	[&.q-field--dark_.q-field\\_\\_control:before]:(layer-components:bg-white/7) 
	[&.q-field--dark.q-field--highlighted_.q-field\\_\\_control:before]:(layer-components:bg-white/1) 
	[&.q-field--readonly_.q-field\\_\\_control:before]:(opacity-100 bg-transparent [border-bottom-style:dashed])`
  ],

  [
    /^q-field--outlined$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--outlined'] ??
      `[&_.q-field\\_\\_control]:(rounded-[4px] px-[12px] py-[0]) 
	[&_.q-field\\_\\_control:before]:(border-[1px] border-solid border-black/24 [transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:hover:before]:(layer-components:border-black) 
	[&_.q-field\\_\\_control:after]:([height:inherit] [border-radius:inherit] border-[2px] border-solid border-transparent [transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_native:-webkit-autofill]:(mt-px mb-px) 
	[&_.q-field\\_\\_input:-webkit-autofill]:(mt-px mb-px) 
	[&.q-field--rounded_.q-field\\_\\_control]:(rounded-[28px]) 
	[&.q-field--highlighted_.q-field\\_\\_control:hover:before]:(border-transparent) 
	[&.q-field--highlighted_.q-field\\_\\_control:after]:(border-current border-2 [transform:scale3d(1,_1,_1)]) 
	[&.q-field--readonly_.q-field\\_\\_control:before]:(border-dashed)`
  ],

  [
    /^q-field--standard$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--standard'] ??
      `[&_.q-field\\_\\_control:before]:([border-bottom:1px_solid_rgba(0,_0,_0,_0.24)] [transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:hover:before]:(layer-components:border-black) 
	[&_.q-field\\_\\_control:after]:(h-[2px] top-auto [border-bottom-left-radius:inherit] [border-bottom-right-radius:inherit] origin-[center_bottom] [transform:scale3d(0,_1,_1)] bg-current [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&.q-field--highlighted_.q-field\\_\\_control:after]:([transform:scale3d(1,_1,_1)]) 
	[&.q-field--readonly_.q-field\\_\\_control:before]:([border-bottom-style:dashed]) 
	[&_.q-field\\_\\_bottom]:(pl-0 pr-0) 
	[&.q-field--dense_.q-field\\_\\_control]:(pl-0 pr-0)`
  ],

  [
    /^q-field--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--dark'] ??
      `[&_.q-field\\_\\_control:before]:(border-white/60) 
	[&_.q-field\\_\\_control:hover:before]:(border-white) 
	[&_.q-field\\_\\_native]:(text-white) 
	[&_.q-field\\_\\_prefix]:(text-white) 
	[&_.q-field\\_\\_suffix]:(text-white) 
	[&_.q-field\\_\\_input]:(text-white) 
	[&:not(.q-field--highlighted)_.q-field\\_\\_label]:(text-white/70) 
	[&_.q-field\\_\\_marginal]:(text-white/70) 
	[&_.q-field\\_\\_bottom]:(text-white/70)`
  ],

  [
    /^q-field--standout$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--standout'] ??
      `[&_.q-field\\_\\_control]:(px-[12px] py-[0] layer-components:bg-black/5 rounded-[4px] [transition:box-shadow_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_background-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:before]:(layer-components:bg-black/7 opacity-0 [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_background_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:hover:before]:(opacity-100) 
	[&.q-field--rounded_.q-field\\_\\_control]:(rounded-[28px]) 
	[&.q-field--highlighted_.q-field\\_\\_control]:([box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] layer-components:bg-white) 
	[&.q-field--highlighted_.q-field\\_\\_native]:(text-white) 
	[&.q-field--highlighted_.q-field\\_\\_prefix]:(text-white) 
	[&.q-field--highlighted_.q-field\\_\\_suffix]:(text-white) 
	[&.q-field--highlighted_.q-field\\_\\_prepend]:(text-white) 
	[&.q-field--highlighted_.q-field\\_\\_append]:(text-white) 
	[&.q-field--highlighted_.q-field\\_\\_input]:(text-white) 
	[&.q-field--readonly_.q-field\\_\\_control:before]:(opacity-100 bg-transparent border-[1px] border-dashed border-black/24) 
	[&.q-field--dark_.q-field\\_\\_control]:(bg-[rgba(255,_255,_255,_0.07)]) 
	[&.q-field--dark_.q-field\\_\\_control:before]:(layer-components:bg-white/7) 
	[&.q-field--dark.q-field--highlighted_.q-field\\_\\_control]:(layer-components:bg-white) 
	[&.q-field--dark.q-field--highlighted_.q-field\\_\\_native]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field\\_\\_prefix]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field\\_\\_suffix]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field\\_\\_prepend]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field\\_\\_append]:(text-black) 
	[&.q-field--dark.q-field--highlighted_.q-field\\_\\_input]:(text-black) 
	[&.q-field--dark.q-field--readonly_.q-field\\_\\_control:before]:(border-white/24)`
  ],

  [
    /^q-field--labeled$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--labeled'] ??
      `[&_.q-field\\_\\_native]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field\\_\\_prefix]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field\\_\\_suffix]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field\\_\\_shadow]:(top-[0]) 
	[&:not(.q-field--float)_.q-field\\_\\_prefix]:(opacity-0) 
	[&:not(.q-field--float)_.q-field\\_\\_suffix]:(opacity-0) 
	[&:not(.q-field--float)_.q-field\\_\\_native::placeholder]:(text-transparent) 
	[&:not(.q-field--float)_.q-field\\_\\_input::placeholder]:(text-transparent) 
	[&.q-field--dense_.q-field\\_\\_native]:() 
	[&.q-field--dense_.q-field\\_\\_prefix]:() 
	[&.q-field--dense_.q-field\\_\\_suffix]:()`
  ],

  [
    /^q-field--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--dense'] ??
      `[&_.q-field--with-bottom]:(pb-[19px]) 
	[&_.q-field\\_\\_shadow]:(top-[0]) 
	[&_.q-field\\_\\_control]:(h-[40px]) 
	[&_.q-field\\_\\_marginal]:(h-[40px]) 
	[&_.q-field\\_\\_bottom]:(text-[11px]) 
	[&_.q-field\\_\\_label]:(text-[14px] top-[10px]) 
	[&_.q-field\\_\\_before]:() 
	[&_.q-field\\_\\_prepend]:() 
	[&_.q-field\\_\\_after]:() 
	[&_.q-field\\_\\_append]:() 
	[&_.q-field\\_\\_append_+_.q-field\\_\\_append]:(pl-[2px]) 
	[&_.q-field\\_\\_marginal_.q-avatar]:(text-[24px]) 
	[&.q-field--float_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_native:-webkit-autofill_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_input:-webkit-autofill_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='color']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='date']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='datetime-local']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='month']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='time']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='week']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='color']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='date']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='datetime-local']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='month']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='time']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='week']_+_.q-field\\_\\_label]:(-translate-y-[30%] scale-[0.75])`
  ],

  [
    /^q-field--borderless$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--borderless'] ??
      `[&_.q-field\\_\\_bottom]:(pl-0 pr-0) 
	[&.q-field--dense_.q-field\\_\\_control]:(pl-0 pr-0)`
  ],

  [
    /^q-field--error$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field--error'] ??
      `[&_.q-field\\_\\_label]:(animate-[q-field-label_0.36s]) 
	[&_.q-field\\_\\_bottom]:(text-color-negative)`
  ],

  [
    /^q-field__focusable-action$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-field__focusable-action'] ??
      `opacity-60 cursor-pointer !outline-[0] border-[0] [color:inherit] bg-transparent p-0 
	[&:hover]:(opacity-100) 
	[&:focus]:(opacity-100)`
  ],

  [
    /^q-field--auto-height$/,
    ([, c], { theme }) => `
	[&_.q-field\\_\\_control]:(h-auto)
	[&_.q-field\\_\\_control]:(min-h-[56px])
	[&_.q-field\\_\\_native]:(min-h-[56px])
	[&_.q-field\\_\\_native]:(items-center)
	[&_.q-field\\_\\_control-container]:(pt-0)
	[&_.q-field\\_\\_native]:(leading-[18px])
	[&_.q-field\\_\\_prefix]:(leading-[18px])
	[&_.q-field\\_\\_suffix]:(leading-[18px])
	[&.q-field--labeled_.q-field\\_\\_control-container]:(pt-[24px])
	[&.q-field--labeled_.q-field\\_\\_shadow]:(top-[24px])
	[&.q-field--labeled_.q-field\\_\\_native]:(pt-0)
	[&.q-field--labeled_.q-field\\_\\_prefix]:(pt-0)
	[&.q-field--labeled_.q-field\\_\\_suffix]:(pt-0)
	[&.q-field--labeled_.q-field\\_\\_native]:(min-h-[24px])
	[&.q-field--dense_.q-field\\_\\_control]:(min-h-[40px])
	[&.q-field--dense_.q-field\\_\\_native]:(min-h-[40px])
	[&.q-field--dense.q-field--labeled_.q-field\\_\\_control-container]:(pt-10px)
	[&.q-field--dense.q-field--labeled_.q-field\\_\\_shadow]:(top-[14px])    
	[&.q-field--dense.q-field--labeled_.q-field\\_\\_native]:(min-h-[24px])`
  ],

  [
    /^q-field--square$/,
    ([, c], { theme }) => `
	[&_.q-field\\_\\_control]:(!rounded-none)`
  ]
]

export { preflights, shortcuts }
