import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-separator$/,
    componentClass(
      'q-separator',
      `border-0 bg-[rgba(0,_0,_0,_0.12)] m-0 [transition:background_0.3s,_opacity_0.3s] flex-shrink-0`
    )
  ],

  [
    /^q-separator--dark$/,
    componentClass('q-separator--dark', `bg-[rgba(255,_255,_255,_0.28)]`)
  ],

  [/^q-separator--horizontal$/, staticClass(`block h-px`)],

  [
    /^q-separator--horizontal-inset$/,
    componentClass('q-separator--horizontal-inset', `ml-[16px] mr-[16px]`)
  ],

  [
    /^q-separator--horizontal-item-inset$/,
    componentClass('q-separator--horizontal-item-inset', `ml-[72px] mr-0`)
  ],

  [
    /^q-separator--horizontal-item-thumbnail-inset$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.[
        'q-separator--horizontal-item-thumbnail-inset'
      ] ?? `ml-[116px] mr-0`
  ],

  [/^q-separator--vertical$/, staticClass(`w-px h-auto self-stretch`)],

  [/^q-separator--vertical-inset$/, staticClass(`mt-[8px] mb-[8px]`)]
]

export { shortcuts }
