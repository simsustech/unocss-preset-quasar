import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
@keyframes q-skeleton--fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
@keyframes q-skeleton--pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes q-skeleton--pulse-x {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0.75);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes q-skeleton--pulse-y {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.75);
  }
  100% {
    transform: scaleY(1);
  }
}
@keyframes q-skeleton--wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-skeleton$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton'] ??
      `bg-[rgba(0,_0,_0,_0.12)] rounded-[4px] box-border [&:before]:(content-['_'])`
  ],

  [
    /^q-skeleton--anim$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim'] ?? `cursor-wait`
  ],

  [
    /^q-skeleton--type-text$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-text'] ??
      `scale-x-100 scale-y-[0.5]`
  ],

  [
    /^q-skeleton--type-circle$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-circle'] ??
      `h-[48px] w-[48px] rounded-[50%]`
  ],

  [
    /^q-skeleton--type-QAvatar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QAvatar'] ??
      `h-[48px] w-[48px] rounded-[50%]`
  ],

  [
    /^q-skeleton--type-QBtn$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QBtn'] ?? `w-[90px] h-[36px]`
  ],

  [
    /^q-skeleton--type-QBadge$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QBadge'] ??
      `w-[70px] h-[16px]`
  ],

  [
    /^q-skeleton--type-QChip$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QChip'] ??
      `w-[90px] h-[28px] rounded-[16px]`
  ],

  [
    /^q-skeleton--type-QToolbar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QToolbar'] ?? `h-[50px]`
  ],

  [
    /^q-skeleton--type-QCheckbox$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QCheckbox'] ??
      `w-[40px] h-[40px] rounded-[50%]`
  ],

  [
    /^q-skeleton--type-QRadio$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QRadio'] ??
      `w-[40px] h-[40px] rounded-[50%]`
  ],

  [
    /^q-skeleton--type-QToggle$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QToggle'] ??
      `w-[56px] h-[40px] rounded-[7px]`
  ],

  [
    /^q-skeleton--type-QSlider$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QSlider'] ?? `h-[40px]`
  ],

  [
    /^q-skeleton--type-QRange$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QRange'] ?? `h-[40px]`
  ],

  [
    /^q-skeleton--type-QInput$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--type-QInput'] ?? `h-[56px]`
  ],

  [
    /^q-skeleton--bordered$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--bordered'] ??
      `border-[1px] border-solid border-[rgba(0,0,0,0.05)]`
  ],

  [
    /^q-skeleton--square$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--square'] ?? `rounded-none`
  ],

  [
    /^q-skeleton--anim-fade$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-fade'] ??
      `animate-[q-skeleton--fade_var(--q-skeleton-speed)_linear_0.5s_infinite]`
  ],

  [
    /^q-skeleton--anim-pulse$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-pulse'] ??
      `animate-[q-skeleton--pulse_var(--q-skeleton-speed)_ease-in-out_0.5s_infinite]`
  ],

  [
    /^q-skeleton--anim-pulse-x$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-pulse-x'] ??
      `animate-[q-skeleton--pulse-x_var(--q-skeleton-speed)_ease-in-out_0.5s_infinite]`
  ],

  [
    /^q-skeleton--anim-pulse-y$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-pulse-y'] ??
      `animate-[q-skeleton--pulse-y_var(--q-skeleton-speed)_ease-in-out_0.5s_infinite]`
  ],

  [
    /^q-skeleton--anim-wave$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-wave'] ??
      `relative overflow-hidden [&:after]:(content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] z-0) [&:after]:(bg-[linear-gradient(_90deg,_rgba(255,_255,_255,_0),_rgba(255,_255,_255,_0.5),_rgba(255,_255,_255,_0)_)] animate-[q-skeleton--wave_var(--q-skeleton-speed)_linear_0.5s_infinite])`
  ],

  [
    /^q-skeleton--anim-blink$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-blink'] ??
      `relative overflow-hidden [&:after]:(content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] z-0) [&:after]:(bg-[rgba(255,_255,_255,_0.7)] animate-[q-skeleton--fade_var(--q-skeleton-speed)_linear_0.5s_infinite])`
  ],

  [
    /^q-skeleton--anim-pop$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--anim-pop'] ??
      `relative overflow-hidden [&:after]:(content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] z-0)`
  ],

  [
    /^q-skeleton--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-skeleton--dark'] ??
      `bg-[rgba(255,_255,_255,_0.05)] [&.q-skeleton--bordered]:(border-[1px] border-solid border-[rgba(255,255,255,0.25)]) [&.q-skeleton--anim-wave:after]:(bg-[linear-gradient(_90deg,_rgba(255,_255,_255,_0),_rgba(255,_255,_255,_0.1),_rgba(255,_255,_255,_0)_)]) [&.q-skeleton--anim-blink:after]:(bg-[rgba(255,_255,_255,_0.2)])`
  ]
]

export { preflights, shortcuts }
