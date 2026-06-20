import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => qe`
body.desktop .q-checkbox:not(.disabled) .q-checkbox__inner:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.12;
  transform: scale3d(0, 0, 1);
  transition: transform 0.22s cubic-bezier(0, 0, 0.2, 1);
}
body.desktop .q-checkbox:not(.disabled):focus .q-checkbox__inner:before, body.desktop .q-checkbox:not(.disabled):hover .q-checkbox__inner:before {
  transform: scale3d(1, 1, 1);
}
body.desktop .q-checkbox--dense:not(.disabled):focus .q-checkbox__inner:before, body.desktop .q-checkbox--dense:not(.disabled):hover .q-checkbox__inner:before {
  transform: scale3d(1.4, 1.4, 1);
}
`
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-checkbox$/,
    componentClass('q-checkbox', `align-middle [&.disabled]:(!opacity-75)`)
  ],

  [/^q-checkbox__native$/, staticClass(`w-px h-px`)],

  [
    /^q-checkbox__bg$/,
    componentClass(
      'q-checkbox__bg',
      `select-none top-1/4 left-1/4 w-1/2 h-1/2 border-[2px] border-solid border-[currentColor] rounded-[2px] [transition:background_0.22s_cubic-bezier(0,_0,_0.2,_1)_0ms]`
    )
  ],

  [/^q-checkbox__icon-container$/, staticClass(`select-none`)],

  [/^q-checkbox__icon$/, staticClass(`text-current text-[0.5em]`)],

  [/^q-checkbox__svg$/, staticClass(`text-[#fff]`)],

  [
    /^q-checkbox__truthy$/,
    componentClass(
      'q-checkbox__truthy',
      `stroke-current stroke-[3.12px] stroke-offset-[29.78334] stroke-dash-[29.78334]`
    )
  ],

  [
    /^q-checkbox__indet$/,
    componentClass(
      'q-checkbox__indet',
      `fill-current origin-[50%_50%] -rotate-[280deg] scale-0`
    )
  ],

  [
    /^q-checkbox__inner$/,
    componentClass(
      'q-checkbox__inner',
      `mr-2px text-[40px] w-[1em] min-w-[1em] h-[1em] outline-[0] rounded-[50%] layer-components:text-[rgba(0,_0,_0,_0.54)]`
    )
  ],

  [
    /^q-checkbox__inner--truthy$/,
    componentClass(
      'q-checkbox__inner--truthy',
      qe`text-primary
      [&_.q-checkbox__bg]:(bg-current)
      [&_path]:(stroke-offset-none [transition:stroke-dashoffset_0.18s_cubic-bezier(0.4,_0,_0.6,_1)_0ms])`
    )
  ],

  [
    /^q-checkbox__inner--indet$/,
    componentClass(
      'q-checkbox__inner--indet',
      qe`text-primary [&_.q-checkbox__bg]:(bg-current) [&_.q-checkbox__indet]:(rotate-[0] scale-100 [transition:transform_0.22s_cubic-bezier(0,_0,_0.2,_1)_0ms])`
    )
  ],

  [
    /^q-checkbox--dark$/,
    componentClass(
      'q-checkbox--dark',
      qe`[&_.q-checkbox__inner]:(layer-components:text-[rgba(255,_255,_255,_0.7)])
       [&_.q-checkbox__inner:before]:(!opacity-[0.32])
       [&_.q-checkbox__inner--truthy]:(layer-components:text-primary)
       [&_.q-checkbox__inner--indet]:(layer-components:text-primary)`
    )
  ],

  [
    /^q-checkbox--dense$/,
    componentClass(
      'q-checkbox--dense',
      qe`[&_.q-checkbox__inner]:(w-[0.5em] min-w-[0.5em] h-[0.5em])
       [&_.q-checkbox__bg]:(left-[5%] top-[5%] w-[90%] h-[90%])
       [&_.q-checkbox__label]:(pl-[0.5em])
       [&.reverse_.q-checkbox__label]:(pl-0 pr-[0.5em])`
    )
  ]
]

export { preflights, shortcuts }
