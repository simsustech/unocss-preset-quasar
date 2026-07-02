import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentClass as mdComponent,
  staticClass as mdStatic
} from '../../_helpers.js'

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
    mdComponent(
      'q-field',
      `[&_::-ms-clear]:(hidden) 
	[&_::-ms-reveal]:(hidden)`
    )
  ],

  [/^q-field--with-bottom$/, mdStatic(``)],

  [
    /^q-field__marginal$/,
    mdComponent(
      'q-field__marginal',
      `text-[24px] 
	[&_>_*_+_*]:(ml-[2px]) 
	[&_.q-avatar]:(text-[32px])`
    )
  ],

  [/^q-field__before$/, mdStatic(`flex-initial pr-[12px]`)],

  [/^q-field__prepend$/, mdStatic(`flex-initial pr-[12px]`)],

  [
    /^q-field__after$/,
    mdStatic(`flex-initial pl-[12px] 
	[&:empty]:(hidden)`)
  ],

  [
    /^q-field__append$/,
    mdComponent(
      'q-field__append',
      `flex-initial pl-[12px] 
	[&:empty]:(hidden) 
	[&_+_.q-field\\_\\_append]:(pl-[2px])
  [&_>_.q-icon]:(cursor-pointer)`
    )
  ],

  [/^q-field__inner$/, mdStatic(`text-left`)],

  [
    /^q-field__bottom$/,
    mdComponent(
      'q-field__bottom',
      `text-[12px] min-h-[20px] mt-4px px-[12px] pb-[0] [backface-visibility:hidden]`
    )
  ],

  [
    /^q-field__bottom--animated$/,
    mdComponent('q-field__bottom--animated', `left-[0] right-[0] bottom-[0]`)
  ],

  [
    /^q-field__messages$/,
    mdComponent(
      'q-field__messages',
      `[&_>_div]:([word-wrap:break-word] break-words) 
	[&_>_div_+_div]:(mt-[4px])`
    )
  ],

  [/^q-field__counter$/, mdStatic(`pl-[8px]`)],

  [
    /^q-field--item-aligned$/,
    mdComponent(
      'q-field--item-aligned',
      `px-[16px] py-[8px] 
	[&_.q-field\\_\\_before]:(min-w-[56px])`
    )
  ],

  [/^q-field__control-container$/, mdStatic(`h-inherit items-center`)],

  [
    /^q-field__control$/,
    mdComponent(
      'q-field__control',
      `h-[56px] max-w-full outline-none
	[&:before]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute) 
	[&:after]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute)`
    )
  ],

  [
    /^q-field__shadow$/,
    mdComponent(
      'q-field__shadow',
      `top-[8px] opacity-0 overflow-hidden whitespace-pre-wrap [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] 
	[&_+_.q-field\\_\\_native::placeholder]:([transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_+_.q-field\\_\\_native:focus::placeholder]:(opacity-0)`
    )
  ],

  [
    /^q-field__native$/,
    mdComponent(
      'q-field__native',
      `border-none outline-none px-0 w-full min-w-0 !outline-none select-auto 
  [&:focus-visible]:(!outline-none)
  [&textarea:focus]:(outline-none)
  [&input:focus]:(outline-none)
	[&:-webkit-autofill_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='color']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='date']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='datetime-local']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='month']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='time']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='week']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&:invalid]:([box-shadow:none]) 
	[&[type='file']]:(leading-[1em])`
    )
  ],

  [
    /^q-field__prefix$/,
    mdComponent(
      'q-field__prefix',
      `border-none outline-none px-[0] py-[6px] [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] whitespace-nowrap pr-[4px]`
    )
  ],

  [
    /^q-field__suffix$/,
    mdComponent(
      'q-field__suffix',
      `border-none outline-none px-[0] py-[6px] [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)] whitespace-nowrap pl-[4px]`
    )
  ],

  [
    /^q-field__input$/,
    mdComponent(
      'q-field__input',
      `border-none outline-none px-[0] py-[6px] w-full min-w-[0] !outline-none select-auto 
	[&:-webkit-autofill_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='color']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='date']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='datetime-local']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='month']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='time']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&[type='week']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&:invalid]:([box-shadow:none]) p-0 h-[0] min-h-[24px] leading-[24px]`
    )
  ],

  [
    /^q-field--readonly$/,
    mdComponent(
      'q-field--readonly',
      `[&_.q-placeholder]:(!opacity-100) 
	[&.q-field--labeled_.q-field\\_\\_native]:(cursor-default) 
	[&.q-field--labeled_.q-field\\_\\_input]:(cursor-default) 
	[&.q-field--float_.q-field\\_\\_native]:(cursor-text) 
	[&.q-field--float_.q-field\\_\\_input]:(cursor-text)`
    )
  ],

  [
    /^q-field--disabled$/,
    mdComponent(
      'q-field--disabled',
      `[&_.q-placeholder]:(!opacity-100) 
	[&_.q-field\\_\\_inner]:(cursor-not-allowed) 
	[&_.q-field\\_\\_control]:(pointer-events-none) 
	[&_.q-field\\_\\_control_>_div]:(!opacity-60) 
	[&_.q-field\\_\\_control_>_div]:(!outline-[0]) 
	[&_.q-field\\_\\_control_>_div_*]:(!outline-[0])`
    )
  ],

  [
    /^q-field__label$/,
    mdComponent(
      'q-field__label',
      `left-[0] top-[18px] max-w-full text-[16px] leading-tight [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_max-width_0.324s_cubic-bezier(0.4,_0,_0.2,_1)] [backface-visibility:hidden]`
    )
  ],

  [
    /^q-field--float$/,
    mdComponent(
      'q-field--float',
      `[&_.q-field\\_\\_label]:(max-w-[133%] -translate-y-[40%] scale-[0.75] [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_max-width_0.396s_cubic-bezier(0.4,_0,_0.2,_1)])`
    )
  ],

  [
    /^q-field--highlighted$/,
    mdComponent('q-field--highlighted', `[&_.q-field\\_\\_shadow]:(opacity-50)`)
  ],

  [
    /^q-field(--filled)?$/,
    mdComponent(
      'q-field--filled',
      `
      [&_>_.q-field\\_\\_inner_>_.q-field\\_\\_control]:(px-[16px] py-[0]) 
      [&_.q-field\\_\\_control:before]:(opacity-0 [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
      [&_.q-field\\_\\_control:hover:before]:(opacity-100) 
      [&_.q-field\\_\\_control:after]:(h-[2px] top-auto origin-[center_bottom] [transform:scale3d(0,_1,_1)] bg-current [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
      [&_>_*_>_.q-field--highlighted_.q-field\\_\\_control:before]:(opacity-100) 
      [&_>_*_>_.q-field--highlighted_.q-field\\_\\_control:after]:([transform:scale3d(1,_1,_1)]) 
      [&.q-field--readonly_.q-field\\_\\_control:before]:(opacity-100)`
    )
  ],

  [
    /^q-field--outlined$/,
    mdComponent(
      'q-field--outlined',
      `[&_.q-field\\_\\_control]:(px-[12px] py-[0])
	[&_.q-field\\_\\_control:before]:([transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:after]:([height:inherit] border-[2px] border-solid border-transparent [transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_native:-webkit-autofill]:(mt-px mb-px) 
	[&_.q-field\\_\\_input:-webkit-autofill]:(mt-px mb-px) 
	[&.q-field--highlighted_.q-field\\_\\_control:after]:(border-current border-2 [transform:scale3d(1,_1,_1)])`
    )
  ],

  [
    /^q-field--standard$/,
    mdComponent(
      'q-field--standard',
      `[&_.q-field\\_\\_control:before]:([transition:border-color_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:after]:(h-[2px] top-auto origin-[center_bottom] [transform:scale3d(0,_1,_1)] bg-current [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&.q-field--highlighted_.q-field\\_\\_control:after]:([transform:scale3d(1,_1,_1)]) 
	[&_.q-field\\_\\_bottom]:(pl-0 pr-0) 
	[&.q-field--dense_.q-field\\_\\_control]:(pl-0 pr-0)`
    )
  ],

  [/^q-field--dark$/, mdComponent('q-field--dark', ``)],

  [
    /^q-field--standout$/,
    mdComponent(
      'q-field--standout',
      `[&_.q-field\\_\\_control]:(px-[12px] py-[0] [transition:box-shadow_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:before]:(opacity-0 [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]) 
	[&_.q-field\\_\\_control:hover:before]:(opacity-100) 
	[&.q-field--readonly_.q-field\\_\\_control:before]:(opacity-100)`
    )
  ],

  [
    /^q-field--labeled$/,
    mdComponent(
      'q-field--labeled',
      `[&_.q-field\\_\\_native]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field\\_\\_prefix]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field\\_\\_suffix]:(leading-[24px] pt-[24px] pb-[8px]) 
	[&_.q-field\\_\\_shadow]:(top-[0]) 
	[&:not(.q-field--float)_.q-field\\_\\_prefix]:(opacity-0) 
	[&:not(.q-field--float)_.q-field\\_\\_suffix]:(opacity-0) 
	[&:not(.q-field--float)_.q-field\\_\\_native::placeholder]:(opacity-0)
	[&:not(.q-field--float)_.q-field\\_\\_input::placeholder]:(opacity-0)`
    )
  ],

  [
    /^q-field--dense$/,
    mdComponent(
      'q-field--dense',
      `[&_.q-field--with-bottom]:(pb-[19px]) 
	[&_.q-field\\_\\_shadow]:(top-[0]) 
	[&_.q-field\\_\\_control]:(h-[40px]) 
	[&_.q-field\\_\\_label]:(text-[14px] top-[10px]) 
	[&_.q-field\\_\\_append_+_.q-field\\_\\_append]:(pl-[2px]) 
	[&_.q-field\\_\\_marginal_.q-avatar]:(text-[24px]) 
	[&.q-field--float_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_native:-webkit-autofill_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_input:-webkit-autofill_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='color']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='date']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='datetime-local']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='month']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='time']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_native[type='week']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='color']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='date']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='datetime-local']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='month']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='time']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75]) 
	[&_.q-field\\_\\_input[type='week']_+_.q-field\\_\\_label]:([transform:translateY(-40%)] scale-[0.75])`
    )
  ],

  [
    /^q-field--borderless$/,
    mdComponent(
      'q-field--borderless',
      `[&_.q-field\\_\\_bottom]:(pl-0 pr-0) 
	[&.q-field--dense_.q-field\\_\\_control]:(pl-0 pr-0)`
    )
  ],

  [
    /^q-field--error$/,
    mdComponent(
      'q-field--error',
      `[&_.q-field\\_\\_label]:(animate-[q-field-label_0.36s])`
    )
  ],

  [
    /^q-field__focusable-action$/,
    mdComponent(
      'q-field__focusable-action',
      `opacity-60 cursor-pointer !outline-[0] border-[0] p-0 
	[&:hover]:(opacity-100) 
	[&:focus]:(opacity-100)`
    )
  ],

  [
    /^q-field--auto-height$/,
    mdStatic(`
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
	[&.q-field--dense.q-field--labeled_.q-field\\_\\_native]:(min-h-[24px])`)
  ],

  [
    /^q-field--square$/,
    mdStatic(`
	[&_.q-field\\_\\_control]:(!rounded-none)`)
  ]
]

export { preflights, shortcuts }
