import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
:root {
  --q-transition-duration: ${theme.quasar.transition.duration};
  --q-transition-easing: ${theme.quasar.transition.easing};
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-transition--slide-right-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--slide-right-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--slide-left-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--slide-left-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--slide-up-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--slide-up-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--slide-down-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--slide-down-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--jump-right-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)]`
  ],

  [
    /^q-transition--jump-right-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)]`
  ],

  [
    /^q-transition--jump-left-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)]`
  ],

  [
    /^q-transition--jump-left-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)]`
  ],

  [
    /^q-transition--jump-up-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)]`
  ],

  [
    /^q-transition--jump-up-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)]`
  ],

  [
    /^q-transition--jump-down-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)]`
  ],

  [
    /^q-transition--jump-down-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)]`
  ],

  [
    /^q-transition--fade-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_opacity\_var(--q-transition-duration)\_ease-out]`
  ],

  [
    /^q-transition--fade-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_opacity\_var(--q-transition-duration)\_ease-out]`
  ],

  [
    /^q-transition--scale-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--scale-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)]`
  ],

  [
    /^q-transition--rotate-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)] [transform-style:preserve-3d]`
  ],

  [
    /^q-transition--rotate-leave-active$/,
    ([, c], { theme }) =>
      `absolute [transition:\_opacity\_var(--q-transition-duration),\_transform\_var(--q-transition-duration)\_var(--q-transition-easing)] [transform-style:preserve-3d]`
  ],

  [/^q-transition--flip-enter-active$/, ([, c], { theme }) => ``],

  [/^q-transition--flip-leave-active$/, ([, c], { theme }) => `absolute`],

  [
    /^q-transition--slide-right-enter-from$/,
    ([, c], { theme }) => `[transform:translate3d(-100%,\_0,\_0)]`
  ],

  [
    /^q-transition--slide-right-leave-to$/,
    ([, c], { theme }) => `[transform:translate3d(100%,\_0,\_0)]`
  ],

  [
    /^q-transition--slide-left-enter-from$/,
    ([, c], { theme }) => `[transform:translate3d(100%,\_0,\_0)]`
  ],

  [
    /^q-transition--slide-left-leave-to$/,
    ([, c], { theme }) => `[transform:translate3d(-100%,\_0,\_0)]`
  ],

  [
    /^q-transition--slide-up-enter-from$/,
    ([, c], { theme }) => `[transform:translate3d(0,\_100%,\_0)]`
  ],

  [
    /^q-transition--slide-up-leave-to$/,
    ([, c], { theme }) => `[transform:translate3d(0,\_-100%,\_0)]`
  ],

  [
    /^q-transition--slide-down-enter-from$/,
    ([, c], { theme }) => `[transform:translate3d(0,\_-100%,\_0)]`
  ],

  [
    /^q-transition--slide-down-leave-to$/,
    ([, c], { theme }) => `[transform:translate3d(0,\_100%,\_0)]`
  ],

  [
    /^q-transition--jump-right-enter-from$/,
    ([, c], { theme }) => `opacity-0 [transform:translate3d(-15px,\_0,\_0)]`
  ],

  [
    /^q-transition--jump-right-leave-to$/,
    ([, c], { theme }) => `opacity-0 [transform:translate3d(15px,\_0,\_0)]`
  ],

  [
    /^q-transition--jump-left-enter-from$/,
    ([, c], { theme }) => `opacity-0 [transform:translate3d(15px,\_0,\_0)]`
  ],

  [
    /^q-transition--jump-left-leave-to$/,
    ([, c], { theme }) => `opacity-0 -translate-x-[15px]`
  ],

  [
    /^q-transition--jump-up-enter-from$/,
    ([, c], { theme }) => `opacity-0 [transform:translate3d(0,\_15px,\_0)]`
  ],

  [
    /^q-transition--jump-up-leave-to$/,
    ([, c], { theme }) => `opacity-0 [transform:translate3d(0,\_-15px,\_0)]`
  ],

  [
    /^q-transition--jump-down-enter-from$/,
    ([, c], { theme }) => `opacity-0 [transform:translate3d(0,\_-15px,\_0)]`
  ],

  [
    /^q-transition--jump-down-leave-to$/,
    ([, c], { theme }) => `opacity-0 [transform:translate3d(0,\_15px,\_0)]`
  ],

  [/^q-transition--fade-enter-from$/, ([, c], { theme }) => `opacity-0`],

  [/^q-transition--fade-leave-to$/, ([, c], { theme }) => `opacity-0`],

  [
    /^q-transition--scale-enter-from$/,
    ([, c], { theme }) => `opacity-0 [transform:scale3d(0,\_0,\_1)]`
  ],

  [
    /^q-transition--scale-leave-to$/,
    ([, c], { theme }) => `opacity-0 [transform:scale3d(0,\_0,\_1)]`
  ],

  [
    /^q-transition--rotate-enter-from$/,
    ([, c], { theme }) =>
      `opacity-0 [transform:scale3d(0,\_0,\_1)\_rotate3d(0,\_0,\_1,\_90deg)]`
  ],

  [
    /^q-transition--rotate-leave-to$/,
    ([, c], { theme }) =>
      `opacity-0 [transform:scale3d(0,\_0,\_1)\_rotate3d(0,\_0,\_1,\_90deg)]`
  ],

  [
    /^q-transition--flip-right-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)] [backface-visibility:hidden]`
  ],

  [
    /^q-transition--flip-right-leave-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)] [backface-visibility:hidden]`
  ],

  [
    /^q-transition--flip-left-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)] [backface-visibility:hidden]`
  ],

  [
    /^q-transition--flip-left-leave-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)] [backface-visibility:hidden]`
  ],

  [
    /^q-transition--flip-up-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)] [backface-visibility:hidden]`
  ],

  [
    /^q-transition--flip-up-leave-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)] [backface-visibility:hidden]`
  ],

  [
    /^q-transition--flip-down-enter-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)] [backface-visibility:hidden]`
  ],

  [
    /^q-transition--flip-down-leave-active$/,
    ([, c], { theme }) =>
      `[transition:\_transform\_var(--q-transition-duration)] [backface-visibility:hidden]`
  ],

  [
    /^q-transition--flip-right-enter-to$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_1,\_0,\_0deg)]`
  ],

  [
    /^q-transition--flip-right-leave-from$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_1,\_0,\_0deg)]`
  ],

  [
    /^q-transition--flip-left-enter-to$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_1,\_0,\_0deg)]`
  ],

  [
    /^q-transition--flip-left-leave-from$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_1,\_0,\_0deg)]`
  ],

  [
    /^q-transition--flip-up-enter-to$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_1,\_0,\_0deg)]`
  ],

  [
    /^q-transition--flip-up-leave-from$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_1,\_0,\_0deg)]`
  ],

  [
    /^q-transition--flip-down-enter-to$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_1,\_0,\_0deg)]`
  ],

  [
    /^q-transition--flip-down-leave-from$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_1,\_0,\_0deg)]`
  ],

  [
    /^q-transition--flip-right-enter-from$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(0,\_1,\_0,\_-180deg)]`
  ],

  [
    /^q-transition--flip-right-leave-to$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(0,\_1,\_0,\_180deg)]`
  ],

  [
    /^q-transition--flip-left-enter-from$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(0,\_1,\_0,\_180deg)]`
  ],

  [
    /^q-transition--flip-left-leave-to$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(0,\_1,\_0,\_-180deg)]`
  ],

  [
    /^q-transition--flip-up-enter-from$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_0,\_0,\_-180deg)]`
  ],

  [
    /^q-transition--flip-up-leave-to$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_0,\_0,\_180deg)]`
  ],

  [
    /^q-transition--flip-down-enter-from$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_0,\_0,\_180deg)]`
  ],

  [
    /^q-transition--flip-down-leave-to$/,
    ([, c], { theme }) =>
      `[transform:perspective(400px)\_rotate3d(1,\_0,\_0,\_-180deg)]`
  ]
]

export { preflights, shortcuts }
