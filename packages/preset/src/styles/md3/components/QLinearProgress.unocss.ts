import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
@keyframes q-linear-progress--indeterminate {
  0% {
    transform: translate3d(-35%, 0, 0) scale3d(0.35, 1, 1);
  }
  60% {
    transform: translate3d(100%, 0, 0) scale3d(0.9, 1, 1);
  }
  100% {
    transform: translate3d(100%, 0, 0) scale3d(0.9, 1, 1);
  }
}
@keyframes q-linear-progress--indeterminate-short {
  0% {
    transform: translate3d(-101%, 0, 0) scale3d(1, 1, 1);
  }
  60% {
    transform: translate3d(107%, 0, 0) scale3d(0.01, 1, 1);
  }
  100% {
    transform: translate3d(107%, 0, 0) scale3d(0.01, 1, 1);
  }
}
  `
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-linear-progress$/,
    componentClass(
      'q-linear-progress',
      `relative w-full overflow-hidden text-[4px] h-[1em] [transform:scale3d(1,_1,_1)] text-primary`
    )
  ],

  [/^q-linear-progress__model$/, staticClass(`origin-[0_0]`)],

  [
    /^q-linear-progress__track$/,
    componentClass(
      'q-linear-progress__track',
      `origin-[0_0] [background-color:var(--q-surface-container-highest)] dark:[background-color:var(--q-surface-container-highest)]`
    )
  ],

  [
    /^q-linear-progress__model--with-transition$/,
    componentClass(
      'q-linear-progress__model--with-transition',
      `[transition:transform_var(--q-linear-progress-speed)]`
    )
  ],

  [
    /^q-linear-progress__track--with-transition$/,
    componentClass(
      'q-linear-progress__track--with-transition',
      `[transition:transform_var(--q-linear-progress-speed)]`
    )
  ],

  [
    /^q-linear-progress--reverse$/,
    componentClass(
      'q-linear-progress--reverse',
      qe`[&_.q-linear-progress__model]:(origin-[0_100%]) [&_.q-linear-progress__track]:(origin-[0_100%])`
    )
  ],

  [
    /^q-linear-progress__model--determinate$/,
    componentClass('q-linear-progress__model--determinate', `bg-current`)
  ],

  [
    /^q-linear-progress__model--indeterminate$/,
    componentClass(
      'q-linear-progress__model--indeterminate',
      `transition-none [&:before]:(bg-current content-empty absolute top-0 right-0 bottom-0 left-0 origin-[0_0]) [&:after]:(bg-current content-empty absolute top-0 right-0 bottom-0 left-0 origin-[0_0]) [&:before]:(animate-[q-linear-progress--indeterminate_2.1s_cubic-bezier(0.65,_0.815,_0.735,_0.395)_infinite]) [&:after]:([transform:translate3d(-101%,_0,_0)_scale3d(1,_1,_1)] animate-[q-linear-progress--indeterminate-short_2.1s_cubic-bezier(0.165,_0.84,_0.44,_1)_infinite] [animation-delay:1.15s])`
    )
  ],

  [
    /^q-linear-progress__model--query$/,
    componentClass(
      'q-linear-progress__model--query',
      `transition-none [&:before]:(bg-current content-empty absolute top-0 right-0 bottom-0 left-0 origin-[0_0]) [&:after]:(bg-current content-empty absolute top-0 right-0 bottom-0 left-0 origin-[0_0]) [&:before]:(animate-[q-linear-progress--indeterminate_2.1s_cubic-bezier(0.65,_0.815,_0.735,_0.395)_infinite]) [&:after]:([transform:translate3d(-101%,_0,_0)_scale3d(1,_1,_1)] animate-[q-linear-progress--indeterminate-short_2.1s_cubic-bezier(0.165,_0.84,_0.44,_1)_infinite] [animation-delay:1.15s])`
    )
  ],

  [
    /^q-linear-progress__track--light$/,
    componentClass(
      'q-linear-progress__track--light',
      `[background-color:var(--q-surface-container-highest)]`
    )
  ],

  [
    /^q-linear-progress__track--dark$/,
    componentClass(
      'q-linear-progress__track--dark',
      `[background-color:var(--q-surface-container-highest)]`
    )
  ],

  [
    /^q-linear-progress__stripe$/,
    componentClass(
      'q-linear-progress__stripe',
      `!bg-[linear-gradient(_45deg,_rgba(255,_255,_255,_0.15)_25%,_rgba(255,_255,_255,_0)_25%,_rgba(255,_255,_255,_0)_50%,_rgba(255,_255,_255,_0.15)_50%,_rgba(255,_255,_255,_0.15)_75%,_rgba(255,_255,_255,_0)_75%,_rgba(255,_255,_255,_0)_)] [background-size:40px_40px!important]`
    )
  ],

  [
    /^q-linear-progress__stripe--with-transition$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.[
        'q-linear-progress__stripe--with-transition'
      ] ?? `[transition:width_var(--q-linear-progress-speed)]`
  ]
]

export { preflights, shortcuts }
